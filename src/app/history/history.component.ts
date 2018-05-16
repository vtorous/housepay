import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { Payment, PaymentByCounter, } from '../../month-payment';
import { PaymentService } from '../payment.service';
import { DatesService } from '../dates.service';
import { Observable, timer } from 'rxjs';
import { timeout } from 'rxjs/operators';


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
    this.paymentService.getPayments().subscribe(
        payments => {this.payments = payments; console.log(" adkjsf asdkfj ffklj"+ this.payments);
    });
  } 
  
  //----------------------------------------------------------------------------------------------
  onChange(): void {
    this.monthList = this.datesService.getMonthList(this.currentYear);
  }

  ngOnInit() {
   
    console.log("History onInit is runiing");
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
  
    this.datesService.getYearsList().subscribe(yearsList => {this.yearsList = yearsList;
      console.log(this.yearsList);
    });
    
    
    // this.datesService.getYearsList();
    // this.datesService.getYearsList();
    // this.monthList = this.datesService.getMonthList(this.currentYear);

    // this.curencyString = this.paymentService.getCurencyString();  
  }

}
