import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { USER_SETTINGS } from '../usersetting-mockupt';

@Injectable()
export class UsersettingsService {

  
  constructor() { }
  
  getUserSettings() {
    return of(USER_SETTINGS);
  }

}