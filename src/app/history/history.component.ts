import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { Payment, PaymentByCounter, } from '../../month-payment';
import { PaymentService } from '../payment.service';
import { DatesService } from '../dates.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [ PaymentService, DatesService],
})

export class HistoryComponent implements OnInit {
  
  
  payments: (Payment|PaymentByCounter)[];
  curencyString: string;

  yearsList: number[];
  monthList: number[];
  
  date: Date = new Date();
  
  currentMonth: number;
  currentYear: number; 
 

  constructor(private paymentService: PaymentService,
              private datesService: DatesService){
  }
    
  //----------------------------------------------------------------------------------------------
  getPayments(): void {
    this.payments = this.paymentService.getPayments();
  } 
  
  //----------------------------------------------------------------------------------------------
  onChange(): void {
    this.monthList = this.datesService.getMonthList(this.currentYear);
  }

  ngOnInit() {
    console.log("ngOnInit is running....");

    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
  
    this.yearsList = this.datesService.getYearsList();
    this.monthList = this.datesService.getMonthList(this.currentYear);

    this.curencyString = this.paymentService.getCurencyString();  
  }

}
