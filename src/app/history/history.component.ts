import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { Payment, PaymentByCounter, } from '../../data-models';
import { PaymentService } from '../payment.service';
import { DatesService } from '../dates.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [PaymentService, DatesService],
})

export class HistoryComponent implements OnInit {

  private payments: (Payment | PaymentByCounter)[];
  private curencyString: string = this.paymentService.currencyString;

  private yearsList: number[] = [];
  private monthList: number[] = [];

  private currentMonth: number;
  private currentYear: number;

  constructor(private paymentService: PaymentService,
              private datesService: DatesService) {
  }


  //----------------------------------------------------------------------------------------------
  private onChange(): void {
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => { this.monthList = monthList; });
  }


  // ----------------------------------------------------------------------------  
  ngOnInit() {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();

    this.paymentService.getPayments().subscribe(payments => this.payments = payments);

    this.paymentService.getPaymentsYear(2017).subscribe(payments => { this.payments = payments; });

    this.datesService.getYearsList().subscribe(yearsList => { this.yearsList = yearsList; });
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => { this.monthList = monthList; });
  }
}
