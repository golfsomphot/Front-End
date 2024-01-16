import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogtestComponent } from './logtest/logtest.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';
import { SaleorderComponent } from './saleorder/saleorder.component';
import { AuthguardService } from './authguard.service';



 
const routes: Routes = [
  { path: '', component: LogtestComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthguardService] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthguardService] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthguardService] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthguardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService] },
  { path: 'quotation', component: QuotationComponent, canActivate: [AuthguardService] },
  { path: 'saleorder', component: SaleorderComponent, canActivate: [AuthguardService] },
   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
