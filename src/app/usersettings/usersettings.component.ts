import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersettingsService } from '../services/usersettings.service';
import { DatesService } from '../services/dates.service';
import { PaymentService } from '../services/payment.service';
import { UserSettingsClass } from '../data-models';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  providers: [ UsersettingsService, DatesService, PaymentService],
})

export class UsersettingsComponent implements OnInit  {
  
  userSettings: UserSettingsClass[];
  userSettingForm: FormGroup;

  previousYearsList: number[] = [];

  minServiceNameLenth: number = 2;
  maxServiceNameLenth: number = 20;
  pricePerUnitValidationPattern: string = '[0-9]+(\.[0-9][0-9]?)?';
  firstValueValidationPattern: string = '[0-9]+';

  constructor(private usersettingService: UsersettingsService,
              private datesService: DatesService,
              private fb: FormBuilder) {
    this.createForm();
  }
  
  // -------------------------------------------------------------------------
  createForm() {
    this.userSettingForm = this.fb.group({
      id: 0,
      beginMonth: 0,
      beginYear: 0,
      services: this.fb.array([  ]),
    });
  }

  // -------------------------------------------------------------------------
  rebuildForm() {
    this.userSettingForm.reset({
      id: 0,
      beginMonth: this.userSettings[0].beginMonth,
      beginYear: this.userSettings[0].beginYear,
    });
    this.setServices(this.userSettings[0].services);
  }

  // -------------------------------------------------------------------------
  setServices(services: {}[]) {
    for(let i = 0; i < services.length; i++) {
      services[i]["name"] = [this.userSettings[0].services[i].name,
                                            [ Validators.required,
                                              Validators.pattern('[a-zA-Z0-9\\s]+$'),
                                              Validators.maxLength(this.maxServiceNameLenth),
                                              Validators.minLength(this.minServiceNameLenth)]];

      if (this.userSettings[0].services[i].pricePerUnit) { 
        services[i]["pricePerUnit"] = [this.userSettings[0].services[i].pricePerUnit,
                                            [ Validators.required,
                                              Validators.pattern(this.pricePerUnitValidationPattern)]];
      }

      if (this.userSettings[0].services[i].firstValue) {
         services[i]["firstValue"] = [this.userSettings[0].services[i].firstValue,
                                            [ Validators.required,
                                              Validators.pattern(this.firstValueValidationPattern)]];
      }
    }

    const servicesFGs = services.map(services => this.fb.group(services));
    const servicesFormArray = this.fb.array(servicesFGs);
    this.userSettingForm.setControl('services', servicesFormArray);
  }

  // -------------------------------------------------------------------------
  ngOnInit() {
    this.usersettingService.getUserSettings().subscribe(userSettings => {this.userSettings = userSettings;
        this.rebuildForm();
      });

    this.previousYearsList = this.getPreviousYearsList(4);
  }

  // -------------------------------------------------------------------------
  onSubmit(): void {
    if (this.userSettingForm.valid) {
      this.usersettingService.updateUserSetting(
        this.userSettingForm.value
      ).subscribe();
    } else {
      alert("There are incorect fields in the form. Please check form carefully.")
    }
  }

  // -------------------------------------------------------------------------
  getPreviousYearsList(n: number) {
    return Array(n).fill(0).map((v, i) => new Date().getFullYear() - i);
  }

  // -------------------------------------------------------------------------
  trackByFn(index, item) {
    return item.id;
  }
}