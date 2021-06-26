import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "list", component: OrderListComponent},
  {path: "addOrder", component: AddOrderComponent},
  {path: "addOrder/:id", component: AddOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
