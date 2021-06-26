import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { OrderListComponent } from './components/order-list/order-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { OrderService } from './services/order.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddOrderComponent } from './components/add-order/add-order.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    AddOrderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    HighchartsChartModule,
    MatCardModule,
    MatExpansionModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
