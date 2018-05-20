import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { HttpClientModule} from '@angular/common/http';

import { PaymentComponent } from './payment/payment.component';
import { HistoryComponent } from './history/history.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { MonthPipe } from '../pipes/month';
import { MonthHistoryDetailComponent } from './month-history-detail/month-history-detail.component';

import { PaymentService } from './payment.service';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    HistoryComponent,
    UsersettingsComponent,
    MonthPipe,
    MonthHistoryDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ) 
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
