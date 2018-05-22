export class Payment {
    id: number;
    service: string;
    year: number;
    month: number;
    sum: number;
    paid: boolean;
 }

export class PaymentByCounter extends Payment {
    counterBeginMonth: number;
    counterEndMonth: number;
}
