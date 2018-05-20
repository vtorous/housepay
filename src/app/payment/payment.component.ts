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
  monthList: number[]
  currentMonth;
  currentYear;
  date: Date = new Date();
  
    
  constructor(private datesService: DatesService) { }

  onChange(): void {
    this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
      console.log("onChange is running");
    });
  }


  ngOnInit() {
    this.currentMonth = this.date.getMonth(); 
    this.currentYear = this.date.getFullYear();
  
    this.datesService.getYearsList().subscribe(yearsList => {this.yearsList = yearsList;
      // console.log(this.yearsList);
      // console.log("onInit paymentComponent is running");
    });

    this.datesService.getMonthList(this.currentYear).subscribe(monthList => {this.monthList = monthList;
      console.log(this.monthList);
      console.log('This is month list in the payment component');
    });
    
    console.log("History onInit is runiing");
    // console.log(this.payments);
        
    this.datesService.getYearsList().subscribe(yearsList => {this.yearsList = yearsList;
      // console.log(this.yearsList);
    });
  }

}