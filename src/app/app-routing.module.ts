import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HistoryComponent }    from './history/history.component';
import { PaymentComponent }     from './payment/payment.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/payment', pathMatch: 'full' },
  { path: 'payment', component: PaymentComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'settings', component: UsersettingsComponent }
  
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}