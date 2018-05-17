import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Payment, PaymentByCounter, } from '../../month-payment';
import { PaymentService } from '../payment.service';
import { DatesService } from '../dates.service';

@Component({
  selector: 'app-month-history-detail',
  templateUrl: './month-history-detail.component.html',
  styleUrls: ['./month-history-detail.component.css'],
  providers: [ PaymentService, DatesService],
})
export class MonthHistoryDetailComponent implements OnInit {
  
  @Input() year: number;
  @Input() month: number;
  @Input() curencyString: string;
  payments: (Payment|PaymentByCounter)[];
  
  monthHistory;
  totalMonthSum = 0;
  sum = 0;
 
  constructor(private paymentService: PaymentService,
    private datesService: DatesService){
  }

  getPayments(): void {
    this.paymentService.getPayments().subscribe(payments => this.payments = payments);
  } 
  
  getMonthTotalSum (year: number, month: number) {
    this.paymentService.getPayments().subscribe(payments => {
      this.payments = payments;
      for (let index = 0; index < this.payments.length; index++) {
        const element = this.payments[index];
        // console.log(this.totalMonthSum);

        if (element.year == year && element.month == month && !isNaN(element.sum)) {
          this.totalMonthSum += element.sum;
        }
      }
    });
  }

  ngOnInit() {
    this.getPayments();
    this.getMonthTotalSum(this.year, this.month);

    this.monthHistory = this.datesService.getMonthHistory(this.year, this.month);
  }
}
