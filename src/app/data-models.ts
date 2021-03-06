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

export class UserSettingsClass{
        id: number;
        beginMonth: number;
        beginYear: number;
        services: UserSettingSerivice [];
}

 export class UserSettingSerivice {
    id: number;
    name: string;
    pricePerUnit: number
    firstValue: number;
 }

export class  YearMonth {
    year: number;
    month: number;
}