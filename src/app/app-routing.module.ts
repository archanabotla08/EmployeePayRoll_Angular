import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeProfileComponent } from './components/addEmployeeProfile/addEmployeeProfile.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path : 'home',
    component: HomeComponent
  }, 
  {
    path: 'employeePayrollForm',
    component: AddEmployeeProfileComponent
  },
  {
    path: 'employeePayrollForm/:id',
    component: AddEmployeeProfileComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
