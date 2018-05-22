import { Component, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersettingsService } from '../usersettings.service';
import { DatesService } from '../dates.service';
import { PaymentService } from '../payment.service';
import { UserSettingsClass } from '../../data-models';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  providers: [ UsersettingsService, DatesService, PaymentService],
})

export class UsersettingsComponent implements OnInit, OnChanges  {
  userSettings: UserSettingsClass[];
  userSettingForm: FormGroup;
  currentMonth: number;
  currentYear: number;
  previousYearsList: number[] = [];
  date: Date = new Date();

  constructor(private usersettingService: UsersettingsService,
              private datesService: DatesService,
              private fb: FormBuilder) {

    this.createForm();
    // console.log(this.userSettingForm);
  }

  createForm() {
    this.userSettingForm = this.fb.group({
      id: 0,
      beginMonth: 0,
      beginYear: 0,
      services: this.fb.array([  ]),
    });
  }

  // -------------------------------------------------------------------------
  ngOnChanges() {
    console.log("ngOnChange is running");
    // this.rebuildForm();
  }

  // -------------------------------------------------------------------------
  rebuildForm() {
    this.userSettingForm.reset({
      id: 0,
      beginMonth: this.userSettings[0].beginMonth,
      beginYear: this.userSettings[0].beginYear,
    });
    this.setServices(this.userSettings[0].services);
    console.log(this.userSettingForm);
  }

  // //--------------------------------------------------------------------------
  
  // get services(): FormArray {
  //   return this.userSettingForm.get('services') as FormArray;
  // };
  
  // -------------------------------------------------------------------------
  setServices(services: {}[]) {
    for(let i = 0; i < services.length; i++) {
      services[i]["name"] = [this.userSettings[0].services[i].name, [Validators.required, Validators.pattern('[a-zA-Z0-9\\s]+$'), Validators.maxLength(25), Validators.minLength(2)]];
      services[i]["pricePerUnit"] = [this.userSettings[0].services[i].pricePerUnit, [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]];
      services[i]["firstValue"] = [this.userSettings[0].services[i].firstValue, [Validators.required, Validators.pattern('[0-9]+')]];
    }

    const servicesFGs = services.map(services => this.fb.group(services));
    const servicesFormArray = this.fb.array(servicesFGs);
    this.userSettingForm.setControl('services', servicesFormArray);
  }

  // -------------------------------------------------------------------------
  ngOnInit() {

    this.usersettingService.getUserSettings().subscribe(userSettings => {this.userSettings = userSettings;
        this.rebuildForm();
        console.log(this.userSettings);
      });

    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.previousYearsList = this.getPreviousYearsList(4);


  }

  // -------------------------------------------------------------------------
  update(): void {

    this.usersettingService.updateUserSetting(
      this.userSettingForm.value
    ).subscribe();
  }

  // -------------------------------------------------------------------------
  getPreviousYearsList(n: number) {
    let tempArray: number[] = [];
    for (let i = 0; i < n; i++ ) {
      tempArray[i] = this.currentYear - i;
    }
    // console.log(tempArray);
    return tempArray;
  }

  trackByFn(index, item) {
    return item.id;
  }
}