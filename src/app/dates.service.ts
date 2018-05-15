import { Injectable } from '@angular/core';

import { Payment, PaymentByCounter, } from '../month-payment';
import { PaymentService } from './payment.service';

@Injectable()
export class DatesService {
  currnetYear: number;
  curentMonth: number;

  payments: (Payment|PaymentByCounter)[];

  yearsList:number[] = [];
  monthList:number[] = [];

  //------------------------------------------------------------------------
  // return list of years where exist data about payments
  getYearsList(): number[] {
    this.yearsList = [];
    for (let index = 0; index < this.payments.length; index++) {
      const element = this.payments[index];
      
      if (!this.yearsList.includes(element.year)) {
        this.yearsList.push(element.year);
      }
    }
    
    return this.yearsList.sort();
  }

  //------------------------------------------------------------------------
  // return ordered list of month where exist data about payments
  getMonthList(year: number): number[] {
   
    this.monthList = [];
    
    for (let index = 0; index < this.payments.length; index++) {
      const element = this.payments[index];
      if ( !this.monthList.includes(element.month) && element.year == year) {
        this.monthList.push(element.month);
      }
    }
    
    return this.monthList.sort();
  }
  
  //------------------------------------------------------------------------
  // return history of current month as array

  getMonthHistory(year: number, month: number) : { service: string, sum: number }[] {
    
    var monthHistory: { service: string, sum: number }[] = [];
    
    this.payments = this.paymentService.getPayments();

    for (let index = 0; index < this.payments.length; index++) {
      const element = this.payments[index];
      
      if (element.year == year && element.month == month) {
        let obj = {
          service: element.service,
          sum: element.sum,
        }
        monthHistory.push(obj);
      }

    }

    return monthHistory;
  }

  //------------------------------------------------------------------------
  // return history of current month as array

  //----------------------------------------------------------------------------------------------
  getMonthTotalSum (year: number, month: number): number {
    let sum = 0;
    
    for (let index = 0; index < this.payments.length; index++) {
      const element = this.payments[index];
      
      if (element.year == year && element.month == month) {
        sum += element.sum;
      }
    }    
    
    return sum;
  }

  



  constructor(private paymentService: PaymentService) {
    this.payments = this.paymentService.getPayments();
  }

}
