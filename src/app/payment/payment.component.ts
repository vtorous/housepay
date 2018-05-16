import { Component, OnInit } from '@angular/core';

import { DatesService } from '../dates.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ PaymentService,
    DatesService],
})

export class PaymentComponent implements OnInit {

  yearsList: number[];
  
  date: Date = new Date();
  currentYear = this.date.getFullYear();
  
  constructor(private datesService: DatesService) { }

  ngOnInit() {
    this.datesService.getYearsList().subscribe(yearsList => {this.yearsList = yearsList;
      console.log(this.yearsList);
      console.log("onInit paymentComponent is running");
    });
  }

}