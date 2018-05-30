import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Payment, PaymentByCounter, } from '../data-models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PaymentService {

  public currencyString = '$';
  private paymentsUrl = 'api/payments';

  constructor(private http: HttpClient) { }

  // --------------------------------------------------------------------------------------------
  getPayments(): Observable<(Payment | PaymentByCounter)[]> {
    return this.http.get<(Payment | PaymentByCounter)[]>(this.paymentsUrl)
      .pipe(
        // tap(payments => console.log(`payment data fetched...${payments}`)),
        catchError(this.handleError('getPayments', []))
      );
  }

  // --------------------------------------------------------------------------------------------
  getPaymentsYear(year: number): Observable<(Payment | PaymentByCounter)[]> {
    const url = `${this.paymentsUrl}/?year=${year}`;
    return this.http.get<(Payment | PaymentByCounter)[]>(url)
      .pipe(
        // tap(payments => console.log(`payment data fetched...${payments}`)),
        catchError(this.handleError('getPaymentsYear', []))
      );
  }

  // --------------------------------------------------------------------------------------------
  getPaymentsYearMonth(year: number, month: number): Observable<(Payment | PaymentByCounter)[]> {
    const url = `${this.paymentsUrl}/?year=${year}\&month=^${month}$`;
    return this.http.get<(Payment | PaymentByCounter)[]>(url)
      .pipe(
        // tap(payments => console.log(`payment data fetched...${payments}`)),
        catchError(this.handleError('getPaymentsYear', []))
      );
  }

  // --------------------------------------------------------------------------------------------
  updatePayment(payment: (Payment | PaymentByCounter)): Observable<any> {
    const url = `${this.paymentsUrl}/?id=${payment.id}`;
    console.log(url);
    return this.http.post(url, payment, httpOptions).pipe(
      tap(_ => console.log(`updated setting id=${payment.id}`)),
      catchError(this.handleError<any>('updatePayment'))
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
