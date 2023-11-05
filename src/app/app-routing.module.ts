import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'compras',
    component: ComprasComponent,
    pathMatch: 'full'
  },
  {
    path: 'ventas',
    component: VentasComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
