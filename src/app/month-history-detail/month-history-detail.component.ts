import { Component, OnInit, Input } from '@angular/core';
import { PaymentService } from '../payment.service';
import { DatesService } from '../dates.service';


@Component({
  selector: 'app-month-history-detail',
  templateUrl: './month-history-detail.component.html',
  styleUrls: ['./month-history-detail.component.css'],
  providers: [ PaymentService, DatesService],
})
export class MonthHistoryDetailComponent implements OnInit {
  
  @Input() year: number;
  @Input() month: number;
  @Input() curencyString: string;
  monthHistory;
  totalMonthSum;
 
  constructor(private paymentService: PaymentService,
    private datesService: DatesService){
  }

  ngOnInit() {
    this.monthHistory = this.datesService.getMonthHistory(this.year, this.month);
    this.totalMonthSum = this.datesService.getMonthTotalSum(this.year, this.month);
  }
}
