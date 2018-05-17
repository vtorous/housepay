import { Component, OnInit } from '@angular/core';

import { UsersettingsService } from '../usersettings.service';
import { DatesService } from '../dates.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  providers: [ UsersettingsService, DatesService, PaymentService],
})

export class UsersettingsComponent implements OnInit {

  userSettings;

  currentMonth: number;
  currentYear: number; 
  
  previousYearsList: number[] = [];

  date: Date = new Date();

  constructor(private usersettingService: UsersettingsService,
              private datesService: DatesService) { }

  ngOnInit() {
    this.usersettingService.getUserSettings().subscribe(userSettings => this.userSettings = userSettings);

    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();

    this.previousYearsList = this.getPreviousYearsList(4);

    console.log(this.currentYear, this.currentMonth);
  }
  
  getPreviousYearsList(n: number) {
    let tempArray: number[] = [];
    for (let i = 0; i < n; i++ ) {
      tempArray[i] = this.currentYear - i;
    }
    return tempArray;
  }
}
