import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { Payment, PaymentByCounter, } from '../../month-payment';
import { PaymentService } from '../payment.service';
import { DatesService } from '../dates.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [ PaymentService, DatesService],
})

export class HistoryComponent implements OnInit {
    
  payments: (Payment|PaymentByCounter)[];

  curencyString: string;

  yearsList: number[] = [];
  monthList: number[] = [];
  
  date: Date = new Date();
  
  currentMonth: number;
  currentYear: number; 
 

  constructor(private paymentService: PaymentService,
              private datesService: DatesService){
  }
    
  //----------------------------------------------------------------------------------------------
  getPayments(year: number): void {
    this.paymentService.getPayments().subscribe(payments => this.payments = payments);
  } 
  
  //----------------------------------------------------------------------------------------------
  onChange(): void {
    this.getPayments(this.currentYear);
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList; });
  }


// ----------------------------------------------------------------------------  
  ngOnInit() {
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();

    this.getPayments(this.currentYear);
       
    this.paymentService.getPaymentsYear(2017).subscribe(payments => {this.payments = payments; console.log(this.payments)});

    this.datesService.getYearsList().subscribe(yearsList => { this.yearsList = yearsList; });
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => { this.monthList = monthList; });
    
    this.curencyString = this.paymentService.getCurencyString();  
  }

}
