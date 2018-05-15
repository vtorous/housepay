import { Injectable } from '@angular/core';
import { PAYMENTS } from '../month-payment-mockup';
import { Payment, PaymentByCounter, } from '../month-payment';

@Injectable()
export class PaymentService {

  constructor() { }

  getPayments(): (Payment|PaymentByCounter)[] {
    return PAYMENTS;
  }
  
  getCurencyString(): string {
    return '$';
  }

}
