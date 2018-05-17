import { Injectable } from '@angular/core';

import { Payment, PaymentByCounter, } from '../month-payment';
import { PaymentService } from './payment.service';

import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class DatesService {
  currnetYear: number;
  curentMonth: number;

  payments: (Payment|PaymentByCounter)[];

  yearsList: number[] = [];
  monthList: number[] = [];
  sum;

 
//------------------------------------------------------------------------
  // return list of years where exist data about payments
  getYearsList(): Observable<number[]> {
    this.paymentService.getPayments().subscribe(payments => {
    this.payments = payments;
      for (let index = 0; index < this.payments.length; index++) {
        let element = this.payments[index];
        if (!this.yearsList.includes(element.year)) {
          this.yearsList.push(element.year);
        }
      }
    });
    return of(this.yearsList);
  }


  //------------------------------------------------------------------------
  // return ordered list of month where exist data about payments
  getMonthList(year: number): Observable<number[]> {
    this.monthList = [];
    this.paymentService.getPayments().subscribe(payments => {
    this.payments = payments;
      for (let index = 0; index < this.payments.length; index++) {
        const element = this.payments[index];
        if ( !this.monthList.includes(element.month) && element.year == year) {
            this.monthList.push(element.month);
        }
      }
    });
    return of (this.monthList);
  }


  //------------------------------------------------------------------------
  // return history of current month as array

  getMonthHistory(year: number, month: number): { service: string, sum: number }[] {
    var monthHistory: { service: string, sum: number }[] = [];
    this.paymentService.getPayments().subscribe(payments => {
      this.payments = payments;
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
    });
    return monthHistory;
  }

  constructor(private paymentService: PaymentService) { }
}
