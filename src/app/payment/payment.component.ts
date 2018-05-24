import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatesService } from '../dates.service';
import { PaymentService } from '../payment.service';
import { Payment, PaymentByCounter, } from '../../month-payment';
import { UsersettingsService } from '../usersettings.service';
import { UserSettingsClass } from '../../data-models';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ PaymentService, DatesService, UsersettingsService],
})

export class PaymentComponent implements OnInit {

  monthNames: string[] = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  payments: (Payment|PaymentByCounter)[];
  
  yearsList: number[];
  monthList: number[];
  
  currentMonth;
  currentYear;

  editedMonth;
  editedYear; 

  date: Date = new Date();
  
    
  constructor(private datesService: DatesService,
              private paymentService: PaymentService,
              private usersettingService: UsersettingsService,
              private fb: FormBuilder) { }

  getPayments(year: number, month:number): void {
    this.paymentService.getPaymentsYearMonth(year, month).subscribe(payments => this.payments = payments);

  } 


  onYearChange(): void {
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
      this.currentMonth = this.monthList[0];
      this.getPayments(this.currentYear, this.currentMonth);
    });
    
  }

  onMonthChange(): void {
    this.currentMonth = this.monthNames.indexOf(this.currentMonth);
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
      console.log(this.monthList);
      console.log('This is month list in the payment component');
    });
    this.getPayments(this.currentYear, this.currentMonth);
    console.log(this.currentYear + "---" + this.currentMonth);
  }


  goToPrevMonth(): void {
    this.currentYear = 2016;
    this.currentMonth = 10;
    this.getPayments(this.currentYear, this.currentMonth);
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
      console.log("onChange is running");
    });   
    
   
  }

  ngOnInit() {
    this.currentMonth = this.date.getMonth(); 
    this.currentYear = this.date.getFullYear();

    this.editedMonth = this.currentMonth;
    this.editedYear = this.currentYear;
    
    this.getPayments(this.currentYear, this.currentMonth);

    this.datesService.getYearsList().subscribe(yearsList => {this.yearsList = yearsList;
      // console.log(this.yearsList);
      // console.log("onInit paymentComponent is running");
    });

    this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
    });
    
    console.log("History onInit is runiing");
    // console.log(this.payments);
        
    this.datesService.getYearsList().subscribe(yearsList => {this.yearsList = yearsList;
      // console.log(this.yearsList);
    });
  }

}