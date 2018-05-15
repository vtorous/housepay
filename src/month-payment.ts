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

export class MonthPayment {
    Electricity: PaymentByCounter;
    Gas: PaymentByCounter;
    Water: PaymentByCounter;
    Rent: Payment;
    Garbage: Payment;
    Phone: Payment;
    Internet: Payment;
}