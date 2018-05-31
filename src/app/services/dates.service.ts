import { Injectable } from '@angular/core';

import { PaymentService } from './payment.service';

import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { element } from 'protractor';

import { Payment, PaymentByCounter, YearMonth, UserSettingsClass} from '../data-models';
import { UsersettingsService } from './usersettings.service';

@Injectable()
export class DatesService {
  currnetYear: number;
  curentMonth: number;

  payments: (Payment|PaymentByCounter)[];
  userSettings: UserSettingsClass[];

  yearsList: number[] = [];
  monthList: number[] = [];
  yearMonthList: YearMonth[] = [];
  sum;

 
//------------------------------------------------------------------------
  // return list of years where exist data about payments
  getYearsList(): Observable<number[]> {
    this.paymentService.getPayments().subscribe(payments => {
      this.payments = payments;

      this.payments.forEach(function (element) {
        if (!this.yearsList.includes(element.year)) {
          this.yearsList.push(element.year);
        }
      }, this);

    });
    return of(this.yearsList);
  }



  //------------------------------------------------------------------------
  // return ordered list of month where exist data about payments
  getMonthList(year: number): Observable<number[]> {
    this.monthList = [];
    this.paymentService.getPayments().subscribe(payments => {
      this.payments = payments;

      this.payments.forEach(function (element) {
        if (element.year == year && !this.monthList.includes(element.month)) {
          this.monthList.push(element.month);
        }
      }, this);

    });
    return of(this.monthList);
  }


  //------------------------------------------------------------------------
  // return history of current month as array

  getMonthHistory(year: number, month: number): { service: string, sum: number }[] {
    var monthHistory: { service: string, sum: number }[] = [];
    this.paymentService.getPayments().subscribe(payments => {
      this.payments = payments;
    
      this.payments.forEach(function (element) {
        if (element.year == year && element.month == month) {
          monthHistory.push({service: element.service, sum: element.sum});
        }
      });

    });
    return monthHistory;
  }

  constructor(private paymentService: PaymentService) { }
}
