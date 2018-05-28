import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatesService } from '../dates.service';
import { PaymentService } from '../payment.service';
import { Payment, PaymentByCounter, UserSettingsClass, YearMonth } from '../../data-models';
import { UsersettingsService } from '../usersettings.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ PaymentService, DatesService, UsersettingsService],
})

export class PaymentComponent implements OnInit {

  monthNames: string[] = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  userSettings: UserSettingsClass[];
  payments: (Payment|PaymentByCounter)[];
  curencyString: string;

  date: Date = new Date();

  // yearsList: number[];
  // monthList: number[];

  yearMonthList: YearMonth[] = []; 
  
  currentMonth;
  currentYear;

  currentYearMonth: YearMonth = {year:0, month:0 };
  currentYearMonthIndex: number = 1; 
  currentYearMonthString: string;

  firstMonthInWiev: boolean;
  lastMonthInWiev: boolean;
  

  constructor(private datesService: DatesService,
              private paymentService: PaymentService,
              private usersettingService: UsersettingsService,
              private fb: FormBuilder) { }

  getPayments(year: number, month:number): void {
    this.paymentService.getPaymentsYearMonth(year, month).subscribe(payments => this.payments = payments);
  } 
 
  // -------------------------------------------------------------------------------------------
  //TODO  asd fasdfj afkj asfj afklj asldfkj asdlfkj

  getUserSettings(): void {
    this.usersettingService.getUserSettings().subscribe(userSettings => {this.userSettings = userSettings;
      console.log(this.userSettings);
      this.getYearMonthList();
    });
  } 


  // -------------------------------------------------------------------------------------------
  onYearMonthChange(): void {
    let temp = this.currentYearMonthString.split(" ")
    this.currentYearMonth.year = +temp[0];
    this.currentYearMonth.month = this.monthNames.indexOf(temp[1]);

    this.getPayments(this.currentYearMonth.year, this.currentYearMonth.month);
    
      for(let i=0; i<this.yearMonthList.length; i++){
       if (this.yearMonthList[i].year == this.currentYearMonth.year &&
          this.yearMonthList[i].month == this.currentYearMonth.month) {
            this.currentYearMonthIndex = i;

            this.firstMonthInWiev = false;
            this.lastMonthInWiev = false;

            if (i == 0) {
              this.firstMonthInWiev = true;
            } else if (i == this.yearMonthList.length - 1) {
              this.lastMonthInWiev = true;
            }
        return;
      }
    }

    // console.log(this.currentYearMonthIndex);
  }
  
// -------------------------------------------------------------------------------------------
  goToPrevMonth(): void {
    if (this.currentYearMonthIndex < this.yearMonthList.length-1) {
      this.currentYearMonthIndex++
    }

    this.firstMonthInWiev = false;
    this.lastMonthInWiev = false;

    if (this.currentYearMonthIndex == this.yearMonthList.length - 1) {
      this.lastMonthInWiev = true;
    }
 
    this.currentYear = this.yearMonthList[this.currentYearMonthIndex].year;
    this.currentMonth = this.yearMonthList[this.currentYearMonthIndex].month;
    this.getPayments(this.currentYear, this.currentMonth);
  }

// -------------------------------------------------------------------------------------------  
  goToNextMonth(): void {
    if (this.currentYearMonthIndex > 0) {
      this.currentYearMonthIndex--
    }

    this.firstMonthInWiev = false;
    this.lastMonthInWiev = false;

    if (this.currentYearMonthIndex == 0) {
      this.firstMonthInWiev = true;
    }    

    this.currentYear = this.yearMonthList[this.currentYearMonthIndex].year;
    this.currentMonth = this.yearMonthList[this.currentYearMonthIndex].month;
    this.getPayments(this.currentYear, this.currentMonth);
  }
  
  
  // -------------------------------------------------------------------------------------------
  getPaymentById (id:number, payments: (Payment|PaymentByCounter)[]): (Payment|PaymentByCounter)   {
    //TODO rewrite as foreach
    for (let i = 0; i < payments.length; i++) { 
      if (payments[i].id == id) {
        console.log (payments[i]);
        return payments[i];
      }
    }
    return null;
  }
  
    // -------------------------------------------------------------------------------------------
    getUserSettingByName (name: string): {id: number, name: string, pricePerUnit: number, firstValue: number}    {
      console.log(this.userSettings);
      for (let i = 0; i < this.userSettings[0].services.length; i++) {
        if (this.userSettings[0].services[i].name == name)
          console.log (this.userSettings[0].services[i]);
          return this.userSettings[0].services[i];
      }
      return null;
    }
  
    // -------------------------------------------------------------------------------------------------------
  calculateSum(id: number) {
    let payment: any  = this.getPaymentById(id, this.payments);

    const setting = this.getUserSettingByName(payment.service);  
    this.payments[0].sum = (payment.counterEndMonth - payment.counterBeginMonth)*setting.pricePerUnit;
    
  }


  // ------------------------------------------------------------------------------------------- 
  getYearMonthList(){
    let currentYear = this.currentYear;
    let currentMonth = this.currentMonth;
    let startMonth = this.userSettings[0].beginMonth;
    let startYear = this.userSettings[0].beginYear;
    let frMonth, toMonth;
    
    if (currentMonth == 11) {
      currentMonth = 0;
      currentYear++;
    }  else {
      currentMonth++;
    }

    for (let year=startYear; year<=currentYear; year++) {
      frMonth = 0;
      toMonth = 11;
      if (year == startYear){
        frMonth = startMonth;
      } else if (year == currentYear) {
        toMonth = currentMonth;
      } else if (startYear == currentYear) {
        frMonth = startMonth;
        toMonth = currentMonth;
      }

      for(let month = frMonth; month <= toMonth; month++) {
        this.yearMonthList.push( {year: year, month: month} );
      }
    }
    this.yearMonthList.reverse();
    console.log(this.yearMonthList);

  }


  // -------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.currentMonth = this.date.getMonth(); 
    this.currentYear = this.date.getFullYear();

    this.currentYearMonth.year = this.date.getFullYear();
    this.currentYearMonth.month = this.currentMonth = this.date.getMonth(); 
    
    this.getPayments(this.currentYear, this.currentMonth);
    this.getUserSettings();
    
    this.curencyString = this.paymentService.getCurencyString();  
  }
}