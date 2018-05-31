import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Payment, PaymentByCounter, } from '../data-models';
import { PaymentService } from '../services/payment.service';
import { DatesService } from '../services/dates.service';

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

      payments.forEach(element => {
        if (element.sum)
          this.totalMonthSum += element.sum;
      });

    });
  }

  //--------------------------------------------------------------------------------------  
  ngOnInit() {
    this.paymentService.getPayments().subscribe(payments => this.payments = payments);
    this.monthHistory = this.datesService.getMonthHistory(this.year, this.month);
    this.getMonthTotalSum(this.year, this.month);
  }
}
