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

  yearsList: number[];
  monthList: number[];

  yearMonthList: YearMonth[] = []; 
  
  currentMonth;
  currentYear;
  currentYearMonth: YearMonth = {year:0, month:0 };
  currentYearMonthIndex: number = 1; 
  currentYearMonthString: string;
  

  constructor(private datesService: DatesService,
              private paymentService: PaymentService,
              private usersettingService: UsersettingsService,
              private fb: FormBuilder) { }

  getPayments(year: number, month:number): void {
    this.paymentService.getPaymentsYearMonth(year, month).subscribe(payments => this.payments = payments);
  } 
 
  getUserSettings(): void {
    this.usersettingService.getUserSettings().subscribe(userSettings => {this.userSettings = userSettings;
      console.log(this.userSettings);
      this.getYearMonthList()
    });
  } 


  // -------------------------------------------------------------------------------------------
  onYearMonthChange(): void {
    let temp = this.currentYearMonthString.split(" ")
    this.currentYearMonth.year = +temp[0];
    this.currentYearMonth.month = this.monthNames.indexOf(temp[1]);
    console.log(this.currentYearMonth);
    this.getPayments(this.currentYearMonth.year, this.currentYearMonth.month);
    
      for(let i=0; i<this.yearMonthList.length; i++){
      if (this.yearMonthList[i].year == this.currentYearMonth.year &&
          this.yearMonthList[i].month == this.currentYearMonth.month) {
            this.currentYearMonthIndex = i;
            break;
      }
    }

    console.log(this.currentYearMonthIndex);
  }
  
// -------------------------------------------------------------------------------------------
  goToPrevMonth(): void {
    if (this.currentYearMonthIndex < this.yearMonthList.length-1) {
      this.currentYearMonthIndex++
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

    this.currentYear = this.yearMonthList[this.currentYearMonthIndex].year;
    this.currentMonth = this.yearMonthList[this.currentYearMonthIndex].month;
    this.getPayments(this.currentYear, this.currentMonth);
  }
  
  
  // -------------------------------------------------------------------------------------------
  getPaymentById (id:number, payments: (Payment|PaymentByCounter)[]): (Payment|PaymentByCounter)   {
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].id == id) {
        return payments[i];
      }
    }
    return null;
  }
  
    // -------------------------------------------------------------------------------------------
    getUserSettingByName (name: string): {}    {
      console.log(this.userSettings);
      for (let i = 0; i < this.userSettings[0].services.length; i++) {
        if (this.userSettings[0].services[i].name == name)
          console.log (this.userSettings[0].services[i]);
      }
      return null;
    }
  
    // -------------------------------------------------------------------------------------------------------
  calculateSum(id: number) {
    let payment: (Payment|PaymentByCounter) = this.getPaymentById(id, this.payments);
    console.log(payment);
    console.log(id);
    this.getUserSettingByName(payment.service);  
    this.payments[0].sum = 6789.01
  }


  // ------------------------------------------------------------------------------------------- 
  getYearMonthList(){
    let currentYear = this.currentYear;
    let currentMonth = this.currentMonth;
    let startMonth = this.userSettings[0].beginMonth;
    let startYear = this.userSettings[0].beginYear;
    if (currentMonth == 11) {
      currentMonth = 0;
      currentYear++;
    }  else {
      currentMonth++;
    }

    for (let year=startYear; year<=currentYear; year++) {
      console.log(year);
      let frMonth, toMonth;
      if (year == startYear){
        frMonth = startMonth;
        toMonth = 11
      } else if (year == currentYear) {
        frMonth = 0;
        toMonth = currentMonth;
      } else if (startYear == currentYear) {
        frMonth = startMonth;
        toMonth = currentMonth;
      } else {
        frMonth = 0;
        toMonth = 11;
      }
      for(let month = frMonth; month <= toMonth; month++) {
        let obj = {
          year: year,
          month: month
        }
        this.yearMonthList.push(obj);
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