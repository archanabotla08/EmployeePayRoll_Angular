import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeePayrollService } from 'src/app/services/employeePayroll.service';
// import { ContactService } from '../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeePayrollList: any[] = [];
 

  constructor(
     private router: Router,
      private employeePayrollService: EmployeePayrollService
      ) { }

  ngOnInit() {
    this.getEmployeePayrollData();
  }

  getEmployeePayrollData() {
    this.employeePayrollService.getAllEmployeePayRollList()
                    .subscribe(response =>{
                      this.employeePayrollList  = response.data;
                      console.log(this.employeePayrollList);
                    });
}

delete(id: number) {
  this.employeePayrollService.deleteEmployeePayrollRecord(id).subscribe(
    data => {
      console.log('deleted response', data);
      this.getEmployeePayrollData();
    }
  )
  }   
  
  update(id: number) {
    console.log(id);
    this.router.navigateByUrl(`/employeePayrollForm/${id}`);
  }
}