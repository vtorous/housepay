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
  
  editedMonth;
  editedYear; 

  
    
  constructor(private datesService: DatesService,
              private paymentService: PaymentService,
              private usersettingService: UsersettingsService,
              private fb: FormBuilder) { }

  getPayments(year: number, month:number): void {
    this.paymentService.getPaymentsYearMonth(year, month).subscribe(payments => this.payments = payments);

  } 
 
  
  onYearMonthChange(): void {
    let temp = this.currentYearMonthString.split(" ")
    this.currentYearMonth.year = +temp[0];
    this.currentYearMonth.month = this.monthNames.indexOf(temp[1]);
    console.log(this.currentYearMonth);
    this.getPayments(this.currentYearMonth.year, this.currentYearMonth.month);
    
    // this.yearMonthList.forEach(function(element, index){
      for(let i=0; i<this.yearMonthList.length; i++){
      if (this.yearMonthList[i].year == this.currentYearMonth.year &&
          this.yearMonthList[i].month == this.currentYearMonth.month) {
            this.currentYearMonthIndex = i;
            break;
      }
    }
    // this.currentYearMonthIndex = this.yearMonthList.indexOf(this.currentYearMonth);
    console.log(this.currentYearMonthIndex);
  }
  

  goToPrevMonth(): void {
    if (this.currentYearMonthIndex < this.yearMonthList.length-1) {
      this.currentYearMonthIndex++
    }

    this.currentYear = this.yearMonthList[this.currentYearMonthIndex].year;
    this.currentMonth = this.yearMonthList[this.currentYearMonthIndex].month;
    this.getPayments(this.currentYear, this.currentMonth);
  }

  goToNextMonth(): void {
    if (this.currentYearMonthIndex > 0) {
      this.currentYearMonthIndex--
    }

    this.currentYear = this.yearMonthList[this.currentYearMonthIndex].year;
    this.currentMonth = this.yearMonthList[this.currentYearMonthIndex].month;
    this.getPayments(this.currentYear, this.currentMonth);
  }
  

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

  ngOnInit() {
    this.currentMonth = this.date.getMonth(); 
    this.currentYear = this.date.getFullYear();

    this.editedMonth = this.currentMonth;
    this.editedYear = this.currentYear;

    this.currentYearMonth.year = this.date.getFullYear();
    this.currentYearMonth.month = this.currentMonth = this.date.getMonth(); 

    
    this.getPayments(this.currentYear, this.currentMonth);
    this.usersettingService.getUserSettings().subscribe(userSettings => {this.userSettings = userSettings;
      console.log(this.userSettings);
      this.getYearMonthList()
    });
    
    this.curencyString = this.paymentService.getCurencyString();  
  }


  // onYearChange(): void {
  //   this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
  //     this.currentMonth = this.monthList[0];
  //     this.getPayments(this.currentYear, this.currentMonth);
  //   });
  // }

  // onMonthChange(): void {
  //   this.currentMonth = this.monthNames.indexOf(this.currentMonth);
  //   this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
  //     console.log(this.monthList);
  //     console.log('This is month list in the payment component');
  //   });
  //   this.getPayments(this.currentYear, this.currentMonth);
  //   console.log(this.currentYear + "---" + this.currentMonth);
  // }


}