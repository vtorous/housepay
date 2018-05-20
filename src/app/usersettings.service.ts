import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { USER_SETTINGS } from '../usersetting-mockupt';

@Injectable()
export class UsersettingsService {
  private userSettingUrl = 'api/userSettings';

  constructor(private http: HttpClient) { }


  getUserSettings(): Observable<any> {
    return this.http.get<any>(this.userSettingUrl)
      .pipe(
        catchError(this.handleError('getUserSetting', [])),
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
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}