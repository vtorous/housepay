import { Injectable } from '@angular/core';
import { USER_SETTINGS } from '../usersetting-mockupt';

@Injectable()
export class UsersettingsService {

  
  constructor() { }
  
  getUserSettings() {
    return USER_SETTINGS;
  }

}