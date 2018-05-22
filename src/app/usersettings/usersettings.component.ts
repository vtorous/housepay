import { Component, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersettingsService } from '../usersettings.service';
import { DatesService } from '../dates.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  providers: [ UsersettingsService, DatesService, PaymentService],
})

export class UsersettingsComponent implements OnInit, OnChanges  {
  userSettings;
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
      beginMonth: 0,
      beginYear: 0,
      services: this.fb.array([
        this.fb.group({
        name: ['', [
          Validators.required,
          Validators.pattern(/[A-z]/),
          Validators.maxLength(55),
         ]
        ],
          pricePerUnit: 0,
          firstValue: 0
        })
      ]
    ),
    });
    console.log(this.userSettingForm);
  }

  // -------------------------------------------------------------------------
  ngOnChanges() {
    console.log("ngOnChange is running");
    // this.rebuildForm();
  }

  // -------------------------------------------------------------------------
  rebuildForm() {
    this.userSettingForm.reset({
      beginMonth: this.userSettings.beginMonth,
      beginYear: this.userSettings.beginYear,
    });
    this.setServices(this.userSettings.services);

    // console.log("this is rebuildForm function");
  }

  // //--------------------------------------------------------------------------
  
  // get services(): FormArray {
  //   return this.userSettingForm.get('services') as FormArray;
  // };
  
  // -------------------------------------------------------------------------
  setServices(services: {}[]) {
    const servicesFGs = services.map(services => this.fb.group(services));
    const servicesFormArray = this.fb.array(servicesFGs);
    this.userSettingForm.setControl('services', servicesFormArray);
    // console.log(servicesFormArray);
  }

  // -------------------------------------------------------------------------
  ngOnInit() {
    this.usersettingService.getUserSettings()
      .subscribe(userSettings => {this.userSettings = userSettings;
        this.rebuildForm();
      });

    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.previousYearsList = this.getPreviousYearsList(4);
  }

  // -------------------------------------------------------------------------
  save(): void {
    console.log(this.userSettings);
  }

  // // -------------------------------------------------------------------------
  // reset(): void {
  //     this.usersettingService.getUserSettings()
  //       .subscribe(userSettings => {this.userSettings = userSettings;
  //         console.log(this.userSettings);
  //       });
  // }

  // -------------------------------------------------------------------------
  getPreviousYearsList(n: number) {
    let tempArray: number[] = [];
    for (let i = 0; i < n; i++ ) {
      tempArray[i] = this.currentYear - i;
    }
    // console.log(tempArray);
    return tempArray;
  }

  // -------------------------------------------------------------------------
//   trackByFn(index: any, item: any) {
//     return index;
//  }

  trackByFn(index, item) {
    return item.id;
  }
}
