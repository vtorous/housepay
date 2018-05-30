import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatesService } from '../dates.service';
import { PaymentService } from '../payment.service';
import { Payment, PaymentByCounter, UserSettingsClass,  UserSettingSerivice, YearMonth, } from '../../data-models';
import { UsersettingsService } from '../usersettings.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ PaymentService, DatesService, UsersettingsService],
})

export class PaymentComponent implements OnInit {

  private userSettings: UserSettingsClass[];
  private payments: (PaymentByCounter)[];
  private nextMonthPayment: (PaymentByCounter)[];
  private curencyString: string = this.paymentService.currencyString;

  private yearMonthList: YearMonth[] = []; 
  private currentYearMonth: YearMonth = {year:0, month:0 };
  private currentYearMonthIndex: number = 1; 
  private currentYearMonthString: string;
  
  private currentMonth;
  private currentYear;

  private isFirstPage: boolean;
  private isLastPage: boolean;
  

  constructor(private datesService: DatesService,
              private paymentService: PaymentService,
              private usersettingService: UsersettingsService,
              private fb: FormBuilder) { }

  private getPayments(year: number, month: number): void {
    this.paymentService.getPaymentsYearMonth(year, month).subscribe(payments => {
      this.payments = payments;
      payments.sort(
        function (p1, p2) {
          if (p1.paid) return 1;
          else return -1;
        }
      )
    });

    if (month ==  11) {
      year++;
       month = 1;
    } else 
      month++;

    this.paymentService.getPaymentsYearMonth(year, month).subscribe(nextMonthPayment => {
      this.nextMonthPayment = nextMonthPayment;
      console.log(this.nextMonthPayment);
    });

  } 

  // -------------------------------------------------------------------------------------------
  private getUserSettings(): void {
    this.usersettingService.getUserSettings().subscribe(userSettings => {
    this.userSettings = userSettings;
      this.yearMonthList = this.getYearMonthList();
    });
  } 


  // -------------------------------------------------------------------------------------------
  private onYearMonthChange(): void {
    let temp = this.currentYearMonthString.split(" ");
    this.currentYearMonth.year = +temp[0];
    this.currentYearMonth.month = new Date(temp[1] + '-1-01').getMonth();

    this.getPayments(this.currentYearMonth.year, this.currentYearMonth.month);

    for (let i = 0; i < this.yearMonthList.length; i++) {
      if (this.yearMonthList[i].year == this.currentYearMonth.year &&
        this.yearMonthList[i].month == this.currentYearMonth.month) {
        this.currentYearMonthIndex = i;

        this.isFirstPage = false;
        this.isLastPage = false;

        if (i == 0) {
          this.isFirstPage = true;
        } else if (i == this.yearMonthList.length - 1) {
          this.isLastPage = true;
        }
        return;
      }
    }
  }
  
// -------------------------------------------------------------------------------------------
  private goToPrevMonth(): void {
    this.isFirstPage = false;
    this.isLastPage = false;

    (this.currentYearMonthIndex < this.yearMonthList.length - 1) ? this.currentYearMonthIndex++ : void(0);
    (this.currentYearMonthIndex == this.yearMonthList.length - 1) ? this.isLastPage = true : void(0);

    this.currentYear = this.yearMonthList[this.currentYearMonthIndex].year;
    this.currentMonth = this.yearMonthList[this.currentYearMonthIndex].month;
    this.getPayments(this.currentYear, this.currentMonth);

  }

// -------------------------------------------------------------------------------------------  
  private goToNextMonth(): void {

    this.isFirstPage = false;
    this.isLastPage = false;

    (this.currentYearMonthIndex > 0) ? this.currentYearMonthIndex-- : void(0);
    (this.currentYearMonthIndex == 0) ? this.isFirstPage = true : void(0);

    this.currentYear = this.yearMonthList[this.currentYearMonthIndex].year;
    this.currentMonth = this.yearMonthList[this.currentYearMonthIndex].month;
    this.getPayments(this.currentYear, this.currentMonth);

  }
  
  
  // -------------------------------------------------------------------------------------------
  private getPaymentById(id: number, payments: (PaymentByCounter)[]): (PaymentByCounter) {
    //TODO rewrite as foreach
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].id == id) {
        return payments[i];
      }
    }
  }

    // -------------------------------------------------------------------------------------------
    private getPaymentByName(name: string, payments: (PaymentByCounter)[]): (PaymentByCounter) {
      //TODO rewrite as foreach
      for (let i = 0; i < payments.length; i++) {
        if (payments[i].service == name) {
          return payments[i];
        }
      }
    }


  // -------------------------------------------------------------------------------------------
  private updatePayment(id: number) {
    const payment: (PaymentByCounter) = this.getPaymentById(id, this.payments);
    const nextMonthPayment: (PaymentByCounter) = this.getPaymentByName(payment.service, this.nextMonthPayment);
    console.log (nextMonthPayment);
    payment.paid = true;
    nextMonthPayment.counterBeginMonth = payment.counterEndMonth;

    this.paymentService.updatePayment(payment).subscribe();
    this.paymentService.updatePayment(nextMonthPayment).subscribe();
  }


  // -------------------------------------------------------------------------------------------
  private getUserSettingByName(name: string): UserSettingSerivice {
    console.log(this.userSettings);
    for (let i = 0; i < this.userSettings[0].services.length; i++) {
      if (this.userSettings[0].services[i].name == name)
        return this.userSettings[0].services[i];
    }
  }
  
  // -------------------------------------------------------------------------------------------------------
  private calculateSum(id: number) {
    let payment: any = this.getPaymentById(id, this.payments);

    const setting = this.getUserSettingByName(payment.service);
    this.payments[0].sum = (payment.counterEndMonth - payment.counterBeginMonth) * setting.pricePerUnit;
  }
  
  // -------------------------------------------------------------------------------------------------------
  private resetCounter(id: number) {
    let payment: any = this.getPaymentById(id, this.payments);
    payment.counterEndMonth = null;
    payment.sum = 0;

  }


  // ------------------------------------------------------------------------------------------- 
  private getYearMonthList(): YearMonth[] {
    let currentYear = this.currentYear;
    let currentMonth = this.currentMonth;

    let yearMonthList: YearMonth[] = [];
    let frMonth, toMonth;

    if (currentMonth == 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }

    for (let year = this.userSettings[0].beginYear; year <= currentYear; year++) {
      frMonth = 0;
      toMonth = 11;
      if (year == this.userSettings[0].beginYear) {
        frMonth = this.userSettings[0].beginMonth;
      } else if (year == currentYear) {
        toMonth = currentMonth;
      } else if (this.userSettings[0].beginYear == currentYear) {
        frMonth = this.userSettings[0].beginMonth;
        toMonth = currentMonth;
      }

      for (let month = frMonth; month <= toMonth; month++) {
        yearMonthList.push({ year: year, month: month });
      }
    }
    return yearMonthList.reverse();
  }

  // -------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.currentYear = this.currentYearMonth.year = new Date().getFullYear();
    this.currentMonth = this.currentYearMonth.month = new Date().getMonth();

    this.getUserSettings();
    this.getPayments(this.currentYear, this.currentMonth);
  }
}