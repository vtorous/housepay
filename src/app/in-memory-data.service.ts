import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Payment, PaymentByCounter, UserSettingsClass} from '../data-models'

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const payments: (Payment | PaymentByCounter)[] = [
     
      { id: 70, service: 'Electricity', year: 2016, month: 10, sum: 25, paid: true, counterBeginMonth: 565625, counterEndMonth: 78678635},
      { id: 71, service: 'Gas', year: 2016, month: 10, sum: 25, paid: true, counterBeginMonth: 767867825, counterEndMonth: 78678635},
      { id: 72, service: 'Water', year: 2016, month: 10, sum: 25, paid: true, counterBeginMonth: 786768725, counterEndMonth: 68786735},
      { id: 73, service: 'Rent', year: 2016, month: 10, sum: 25, paid: true},
      { id: 74, service: 'Garbage', year: 2016, month: 10, sum: 25, paid: true},
      { id: 75, service: 'Phone', year: 2016, month: 10, sum: 25, paid: true},
      { id: 76, service: 'Internet', year: 2016, month: 10, sum: 25, paid: true},

      { id: 80, service: 'Electricity', year: 2016, month: 11, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 78678635},
      { id: 81, service: 'Gas', year: 2016, month: 11, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 377335},
      { id: 82, service: 'Water', year: 2016, month: 11, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 1234535},
      { id: 83, service: 'Rent', year: 2016, month: 11, sum: 25, paid: true},
      { id: 84, service: 'Garbage', year: 2016, month: 11, sum: 25, paid: true},
      { id: 85, service: 'Phone', year: 2016, month: 11, sum: 25, paid: true},
      { id: 86, service: 'Internet', year: 2016, month: 11, sum: 25, paid: true},
  
      { id: 100, service: 'Electricity', year: 2017, month: 0, sum: 25, paid: true, counterBeginMonth: 78676825, counterEndMonth: 123142335},
      { id: 101, service: 'Gas', year: 2017, month: 0, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 45345335},
      { id: 102, service: 'Water', year: 2017, month: 0, sum: 25, paid: true, counterBeginMonth: 7867625, counterEndMonth: 12312335},
      { id: 103, service: 'Rent', year: 2017, month: 0, sum: 25, paid: true},
      { id: 104, service: 'Garbage', year: 2017, month: 0, sum: 25, paid: true},
      { id: 105, service: 'Phone', year: 2017, month: 0, sum: 25, paid: true},
      { id: 106, service: 'Internet', year: 2017, month: 0, sum: 25, paid: true},
  
      { id: 110, service: 'Electricity', year: 2017, month: 1, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 12312335},
      { id: 111, service: 'Gas', year: 2017, month: 1, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 457545335},
      { id: 112, service: 'Water', year: 2017, month: 1, sum: 25, paid: true, counterBeginMonth: 78678678625, counterEndMonth: 12312335},
      { id: 113, service: 'Rent', year: 2017, month: 1, sum: 25, paid: true},
      { id: 114, service: 'Garbage', year: 2017, month: 1, sum: 25, paid: true},
      { id: 115, service: 'Phone', year: 2017, month: 1, sum: 25, paid: true},
      { id: 116, service: 'Internet', year: 2017, month: 1, sum: 25, paid: true},

      { id: 120, service: 'Electricity', year: 2017, month: 2, sum: 25, paid: true, counterBeginMonth: 78678678625, counterEndMonth: 4531434335},
      { id: 121, service: 'Gas', year: 2017, month: 2, sum: 25, paid: true, counterBeginMonth: 12313225, counterEndMonth: 12312335},
      { id: 122, service: 'Water', year: 2017, month: 2, sum: 25, paid: true, counterBeginMonth: 123133725, counterEndMonth: 44565435},
      { id: 123, service: 'Rent', year: 2017, month: 2, sum: 25, paid: true},
      { id: 124, service: 'Garbage', year: 2017, month: 2, sum: 25, paid: true},
      { id: 125, service: 'Phone', year: 2017, month: 2, sum: 25, paid: true},
      { id: 126, service: 'Internet', year: 2017, month: 2, sum: 25, paid: true},
  
      { id: 130, service: 'Electricity', year: 2017, month: 3, sum: 25, paid: true, counterBeginMonth: 12354525, counterEndMonth: 123735},
      { id: 131, service: 'Gas', year: 2017, month: 3, sum: 25, paid: true, counterBeginMonth: 12312325, counterEndMonth: 12312335},
      { id: 132, service: 'Water', year: 2017, month: 3, sum: 25, paid: true, counterBeginMonth: 12312325, counterEndMonth: 4454535},
      { id: 133, service: 'Rent', year: 2017, month: 3, sum: 25, paid: true},
      { id: 134, service: 'Garbage', year: 2017, month: 3, sum: 25, paid: true},
      { id: 135, service: 'Phone', year: 2017, month: 3, sum: 25, paid: true},
      { id: 136, service: 'Internet', year: 2017, month: 3, sum: 25, paid: true},

      { id: 140, service: 'Electricity', year: 2017, month: 4, sum: 25, paid: true, counterBeginMonth: 123725, counterEndMonth: 4545435},
      { id: 141, service: 'Gas', year: 2017, month: 4, sum: 25, paid: true, counterBeginMonth: 232325, counterEndMonth: 45645635},
      { id: 142, service: 'Water', year: 2017, month: 4, sum: 25, paid: true, counterBeginMonth: 678725, counterEndMonth: 78678635},
      { id: 143, service: 'Rent', year: 2017, month: 4, sum: 25, paid: true},
      { id: 144, service: 'Garbage', year: 2017, month: 4, sum: 25, paid: true},
      { id: 145, service: 'Phone', year: 2017, month: 4, sum: 25, paid: true},
      { id: 146, service: 'Internet', year: 2017, month: 4, sum: 25, paid: true},
  
      { id: 150, service: 'Electricity', year: 2017, month: 5, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 78678635},
      { id: 151, service: 'Gas', year: 2017, month: 5, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 78678635},
      { id: 152, service: 'Water', year: 2017, month: 5, sum: 25, paid: true, counterBeginMonth: 78676825, counterEndMonth: 78678635},
      { id: 153, service: 'Rent', year: 2017, month: 5, sum: 25, paid: true},
      { id: 154, service: 'Garbage', year: 2017, month: 5, sum: 25, paid: true},
      { id: 155, service: 'Phone', year: 2017, month: 5, sum: 25, paid: true},
      { id: 156, service: 'Internet', year: 2017, month: 5, sum: 25, paid: true},
      
      { id: 160, service: 'Electricity', year: 2017, month: 6, sum: 25, paid: true, counterBeginMonth: 78676825, counterEndMonth: 78678635},
      { id: 161, service: 'Gas', year: 2017, month: 6, sum: 25, paid: true, counterBeginMonth: 78676825, counterEndMonth: 76876835},
      { id: 162, service: 'Water', year: 2017, month: 6, sum: 25, paid: true, counterBeginMonth: 7867625, counterEndMonth: 7687635},
      { id: 163, service: 'Rent', year: 2017, month: 6, sum: 25, paid: true},
      { id: 164, service: 'Garbage', year: 2017, month: 6, sum: 25, paid: true},
      { id: 165, service: 'Phone', year: 2017, month: 6, sum: 25, paid: true},
      { id: 166, service: 'Internet', year: 2017, month: 6, sum: 25, paid: true},
  
      { id: 170, service: 'Electricity', year: 2017, month: 7, sum: 25, paid: true, counterBeginMonth: 7687625, counterEndMonth: 78676878635},
      { id: 171, service: 'Gas', year: 2017, month: 7, sum: 25, paid: true, counterBeginMonth: 78676825, counterEndMonth: 78676835},
      { id: 172, service: 'Water', year: 2017, month: 7, sum: 25, paid: true, counterBeginMonth: 7687625, counterEndMonth: 76876835},
      { id: 173, service: 'Rent', year: 2017, month: 7, sum: 25, paid: true},
      { id: 174, service: 'Garbage', year: 2017, month: 7, sum: 25, paid: true},
      { id: 175, service: 'Phone', year: 2017, month: 7, sum: 25, paid: true},
      { id: 176, service: 'Internet', year: 2017, month: 7, sum: 25, paid: true},

      { id: 180, service: 'Electricity', year: 2017, month: 8, sum: 25, paid: true, counterBeginMonth: 78676825, counterEndMonth: 767635},
      { id: 181, service: 'Gas', year: 2017, month: 8, sum: 25, paid: true, counterBeginMonth: 786767625, counterEndMonth: 76878635},
      { id: 182, service: 'Water', year: 2017, month: 8, sum: 25, paid: true, counterBeginMonth: 7867676825, counterEndMonth: 7867635},
      { id: 183, service: 'Rent', year: 2017, month: 8, sum: 25, paid: true},
      { id: 184, service: 'Garbage', year: 2017, month: 8, sum: 25, paid: true},
      { id: 185, service: 'Phone', year: 2017, month: 8, sum: 25, paid: true},
      { id: 186, service: 'Internet', year: 2017, month: 8, sum: 25, paid: true},
  
      { id: 190, service: 'Electricity', year: 2017, month: 9, sum: 25, paid: true, counterBeginMonth: 45645625, counterEndMonth: 45645635},
      { id: 191, service: 'Gas', year: 2017, month: 9, sum: 25, paid: true, counterBeginMonth: 45645625, counterEndMonth: 45645635},
      { id: 192, service: 'Water', year: 2017, month: 9, sum: 25, paid: true, counterBeginMonth: 4564564525, counterEndMonth: 45645635},
      { id: 193, service: 'Rent', year: 2017, month: 9, sum: 25, paid: true},
      { id: 194, service: 'Garbage', year: 2017, month: 9, sum: 25, paid: true},
      { id: 195, service: 'Phone', year: 2017, month: 9, sum: 25, paid: true},
      { id: 196, service: 'Internet', year: 2017, month: 9, sum: 25, paid: true},

      { id: 200, service: 'Electricity', year: 2017, month: 10, sum: 25, paid: true, counterBeginMonth: 45645625, counterEndMonth: 4567735},
      { id: 201, service: 'Gas', year: 2017, month: 10, sum: 25, paid: true, counterBeginMonth: 78678625, counterEndMonth: 78678635},
      { id: 202, service: 'Water', year: 2017, month: 10, sum: 25, paid: true, counterBeginMonth: 313213225, counterEndMonth: 87787835},
      { id: 203, service: 'Rent', year: 2017, month: 10, sum: 25, paid: true},
      { id: 204, service: 'Garbage', year: 2017, month: 10, sum: 25, paid: true},
      { id: 205, service: 'Phone', year: 2017, month: 10, sum: 25, paid: true},
      { id: 206, service: 'Internet', year: 2017, month: 10, sum: 25, paid: true},
  
      { id: 210, service: 'Electricity', year: 2017, month: 11, sum: 25, paid: true, counterBeginMonth: 445654625, counterEndMonth: 8478735},
      { id: 211, service: 'Gas', year: 2017, month: 11, sum: 25, paid: true, counterBeginMonth: 45645625, counterEndMonth: 456735},
      { id: 212, service: 'Water', year: 2017, month: 11, sum: 25, paid: true, counterBeginMonth: 45345325, counterEndMonth: 78787835},
      { id: 213, service: 'Rent', year: 2017, month: 11, sum: 25, paid: true},
      { id: 214, service: 'Garbage', year: 2017, month: 11, sum: 25, paid: true},
      { id: 215, service: 'Phone', year: 2017, month: 11, sum: 25, paid: true},
      { id: 216, service: 'Internet', year: 2017, month: 11, sum: 25, paid: true},

      
      { id: 400, service: 'Electricity', year: 2018, month: 0, sum: 111, paid: true, counterBeginMonth: 45645625, counterEndMonth: 7867635},
      { id: 401, service: 'Gas', year: 2018, month: 0, sum: 111, paid: true, counterBeginMonth: 25768768, counterEndMonth: 35786768},
      { id: 402, service: 'Water', year: 2018, month: 0, sum: 111, paid: true, counterBeginMonth: 257867687, counterEndMonth: 37867865},
      { id: 403, service: 'Rent', year: 2018, month: 0, sum: 111, paid: true},
      { id: 404, service: 'Garbage', year: 2018, month: 0, sum: 111, paid: true},
      { id: 405, service: 'Phone', year: 2018, month: 0, sum: 111, paid: true},
      { id: 406, service: 'Internet', year: 2018, month: 0, sum: 111, paid: true},
      
      { id: 410, service: 'Electricity', year: 2018, month: 1, sum: 222, paid: true, counterBeginMonth: 25456456, counterEndMonth: 35456456},
      { id: 411, service: 'Gas', year: 2018, month: 1, sum: 222, paid: true, counterBeginMonth: 2578676, counterEndMonth: 358786},
      { id: 412, service: 'Water', year: 2018, month: 1, sum: 222, paid: true, counterBeginMonth: 25546878, counterEndMonth: 37867685},
      { id: 413, service: 'Rent', year: 2018, month: 1, sum: 222, paid: true},
      { id: 414, service: 'Garbage', year: 2018, month: 1, sum: 222, paid: true},
      { id: 415, service: 'Phone', year: 2018, month: 1, sum: 222, paid: true},
      { id: 416, service: 'Internet', year: 2018, month: 1, sum: 222, paid: true},

      { id: 420, service: 'Electricity', year: 2018, month: 2, sum: 1, paid: true, counterBeginMonth: 25456456, counterEndMonth: 3786767865},
      { id: 421, service: 'Gas', year: 2018, month: 2, sum: 12, paid: true, counterBeginMonth: 24564565, counterEndMonth: 35786786},
      { id: 422, service: 'Water', year: 2018, month: 2, sum: 25, paid: true, counterBeginMonth: 25456456, counterEndMonth: 3787865},
      { id: 423, service: 'Rent', year: 2018, month: 2, sum: 1, paid: true},
      { id: 424, service: 'Garbage', year: 2018, month: 2, sum: 1, paid: true},
      { id: 425, service: 'Phone', year: 2018, month: 2, sum: 1, paid: true},
      { id: 426, service: 'Internet', year: 2018, month: 2, sum: 5, paid: true},
  
      { id: 430, service: 'Electricity', year: 2018, month: 3, sum: 125, paid: true, counterBeginMonth: 25456456, counterEndMonth: 37867865},
      { id: 431, service: 'Gas', year: 2018, month: 3, sum: 125, paid: true, counterBeginMonth: 24564565, counterEndMonth: 78678635},
      { id: 432, service: 'Water', year: 2018, month: 3, sum: null, paid: false, counterBeginMonth: null, counterEndMonth: null},
      { id: 433, service: 'Rent', year: 2018, month: 3, sum: 125, paid: true},
      { id: 434, service: 'Garbage', year: 2018, month: 3, sum: 125, paid: true},
      { id: 435, service: 'Phone', year: 2018, month: 3, sum: 125, paid: true},
      { id: 436, service: 'Internet', year: 2018, month: 3, sum: 125, paid: true},
      
      { id: 440, service: 'Electricity', year: 2018, month: 4, sum: null, paid: false, counterBeginMonth: 25456456, counterEndMonth: null},
      { id: 441, service: 'Gas', year: 2018, month: 4, sum: 1256.87, paid: true, counterBeginMonth: 25786786, counterEndMonth: 78678635},
      { id: 442, service: 'Water', year: 2018, month: 4, sum: null, paid: false, counterBeginMonth: null, counterEndMonth: null},
      { id: 443, service: 'Rent', year: 2018, month: 4, sum: 485.54, paid: true},
      { id: 444, service: 'Garbage', year: 2018, month: 4, sum: 224.12, paid: true},
      { id: 445, service: 'Phone', year: 2018, month: 4, sum: 124.24, paid: true},
      { id: 446, service: 'Internet', year: 2018, month: 4, sum: null, paid: false},
  
      { id: 450, service: 'Electricity', year: 2018, month: 5, sum: null, paid: false, counterBeginMonth: null, counterEndMonth: null},
      { id: 451, service: 'Gas', year: 2018, month: 5, sum: null, paid: false, counterBeginMonth: 54343525, counterEndMonth: null},
      { id: 452, service: 'Water', year: 2018, month: 5, sum: null, paid: false, counterBeginMonth: 43434525, counterEndMonth: null},
      { id: 453, service: 'Rent', year: 2018, month: 5, sum: null, paid: false},
      { id: 454, service: 'Garbage', year: 2018, month: 5, sum: null, paid: false},
      { id: 455, service: 'Phone', year: 2018, month: 5, sum: null, paid: false},
      { id: 456, service: 'Internet', year: 2018, month: 5, sum: null, paid: false},
  
    ];

    const userSettings: UserSettingsClass[] = [{
      id: 0,
      beginMonth: 10,
      beginYear: 2016,
      services: [
          { id: 0, name: 'Electricity', pricePerUnit: 2.5, firstValue: 202354 },
          { id: 1, name: 'Gas', pricePerUnit: 7.5, firstValue: 6535 },
          { id: 2, name: 'Water', pricePerUnit: 25, firstValue: 985645 },
          { id: 3, name: 'Rent', pricePerUnit: null, firstValue: null },
          { id: 4, name: 'Garbage', pricePerUnit: null, firstValue: null },
          { id: 5, name: 'Phone', pricePerUnit: null, firstValue: null },
          { id: 6, name: 'Internet', pricePerUnit: null, firstValue: null },
      ]
    }]
    const db = { payments, userSettings };
    return db;
  }
}