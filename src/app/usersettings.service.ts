import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserSettingsClass} from '../data-models'

// import { USER_SETTINGS } from '../usersetting-mockupt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersettingsService {
  private userSettingUrl = 'api/userSettings';

  
  constructor(private http: HttpClient) { }

// --------------------------------------------------------------------------------------------
  getUserSettings(): Observable<UserSettingsClass[]> {
    return this.http.get<any>(this.userSettingUrl)
      .pipe(
        catchError(this.handleError('getUserSetting', [])),
    );
  }

  // --------------------------------------------------------------------------------------------
  updateUserSetting (setting: UserSettingsClass): Observable<any> {
        return this.http.post(this.userSettingUrl, setting, httpOptions).pipe(
      // tap(_ => console.log(`updated setting id=${setting.id}`)),
      catchError(this.handleError<any>('updateUserSetting'))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}