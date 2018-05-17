import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { USER_SETTINGS } from '../usersetting-mockupt';

@Injectable()
export class UsersettingsService {

  
  constructor(private http: HttpClient) { }
  
  getUserSettings() {
    return of(USER_SETTINGS);
  }

}