import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Payment, PaymentByCounter, } from '../../data-models';
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
  
  private monthHistory;
  private totalMonthSum: number = 0;
 
  constructor(private paymentService: PaymentService,
    private datesService: DatesService){
  }
  
  //--------------------------------------------------------------------------------------
  private getMonthTotalSum (year: number, month: number) {
    let sum = 0;
    this.paymentService.getPaymentsYearMonth(year, month).subscribe(payments => {
      this.payments = payments;
      for (let index = 0; index < this.payments.length; index++) {
        this.totalMonthSum += this.payments[index].sum;
      }
    });
  }

  //--------------------------------------------------------------------------------------  
  ngOnInit() {
    this.paymentService.getPayments().subscribe(payments => this.payments = payments);
    this.monthHistory = this.datesService.getMonthHistory(this.year, this.month);
    this.getMonthTotalSum(this.year, this.month);
  }
}
