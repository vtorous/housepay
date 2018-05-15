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
  
  settingYearList: number[] = [];

  date: Date = new Date();

  constructor(private usersettingService: UsersettingsService,
              private datesService: DatesService) { }

  ngOnInit() {
    this.userSettings = this.usersettingService.getUserSettings();

    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();

    this.settingYearList = this.getSettingYearList();

    console.log(this.currentYear, this.currentMonth);
  }
  
  getSettingYearList() {
    let tempArray: number[] = [];
    for (let i = 0; i < 5; i++ ) {
      tempArray[i] = this.currentYear - i;
      console.log(tempArray);
      console.log(this.currentYear)
    }
    
    return tempArray;
  }

}
