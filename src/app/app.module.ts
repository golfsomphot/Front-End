import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogtestComponent } from './logtest/logtest.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerComponent } from './customer/customer.component';
 
import { EmployeesComponent } from './employees/employees.component';
import { ProductsComponent } from './products/products.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';
import { SaleorderComponent } from './saleorder/saleorder.component';
import { varible } from './varible';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatFormFieldModule } from '@angular/material/form-field';
 
@NgModule({
  declarations: [
    AppComponent,   
    LogtestComponent,
    MenuComponent,
    ProfileComponent,
    CustomerComponent,
    EmployeesComponent,
    ProductsComponent,
    DashboardComponent,
    QuotationComponent,
    SaleorderComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AgGridModule,
    ButtonModule
    
    
  ],
  providers: [varible],
  bootstrap: [AppComponent]
})
export class AppModule { }
