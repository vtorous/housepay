import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Payment, PaymentByCounter, } from '../data-models';

@Injectable()
export class PaymentService {

  private paymentsUrl = 'api/payments';

  constructor(private http: HttpClient) { }

  getPayments(): Observable<(Payment | PaymentByCounter)[]> {
    return this.http.get<(Payment | PaymentByCounter)[]>(this.paymentsUrl)
      .pipe(
        // tap(payments => console.log(`payment data fetched...${payments}`)),
        catchError(this.handleError('getPayments', []))
      );
  }

  getPaymentsYear(year: number): Observable<(Payment | PaymentByCounter)[]> {
    const url = `${this.paymentsUrl}/?year=${year}`;
    return this.http.get<(Payment | PaymentByCounter)[]>(url)
      .pipe(
        // tap(payments => console.log(`payment data fetched...${payments}`)),
        catchError(this.handleError('getPaymentsYear', []))
      );
  }

  getPaymentsYearMonth(year: number, month: number): Observable<(Payment | PaymentByCounter)[]> {
    const url = `${this.paymentsUrl}/?year=${year}\&month=^${month}$`;
    console.log(url);
    return this.http.get<(Payment | PaymentByCounter)[]>(url)
      .pipe(
        // tap(payments => console.log(`payment data fetched...${payments}`)),
        catchError(this.handleError('getPaymentsYear', []))
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



  getCurencyString(): string {
    return '$';
  }

}
