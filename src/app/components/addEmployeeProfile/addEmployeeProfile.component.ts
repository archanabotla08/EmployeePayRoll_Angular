import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePayRoll } from 'src/app/models/employeePayRoll';
import { EmployeePayrollService } from 'src/app/services/employeePayroll.service';

@Component({
  selector: 'addEmployeeProfile',
  templateUrl: './addEmployeeProfile.html',
  styleUrls: ['./addEmployeeProfile.component.scss']
})
export class AddEmployeeProfileComponent implements OnInit {
  @ViewChildren ('checkBox') 
  checkBox!: QueryList<any>;
  employee: EmployeePayRoll = new EmployeePayRoll();
  id: any;
  a: boolean = false;
  submitted = false;
  userDetail!: FormGroup;
  isEdit: Boolean = false;
  checked: string[] = [];
  employees: any;
  checkedDepartments: string[] = [];
  constructor(private employeeService: EmployeePayrollService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.userDetail = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2),
      Validators.pattern('^[A-Z][a-zA-Z\\s]{2,}$')])],
      salary: ['', Validators.required],
      department: [null, Validators.required],
      gender: ['', Validators.required],
      day: ['', Validators.required],
      year: ['', Validators.required],
      month: ['', Validators.required],
      notes: [''],
      profile: ['', Validators.required]
    });

    this.route.params.subscribe(param => {
    console.log(param);
    if (param && param.id) {
      this.employeeService.getEmployeePayrollById(param.id).subscribe((response: any) => {
        console.log(response);
        this.id = param.id;
        this.isEdit = true;
        this.userDetail.controls['name'].setValue(response.data.name);
        this.userDetail.controls['salary'].setValue(response.data.salary);
        this.userDetail.controls['gender'].setValue(response.data.gender);
        this.userDetail.controls['profile'].setValue(response.data.profilePic);
        this.userDetail.controls['notes'].setValue(response.data.note);
        var str = response.data.startDate;
        var splited: string[] = str.split(' ');
        console.log(splited)
        this.userDetail.controls["day"].setValue(splited[0]);
        this.userDetail.controls["month"].setValue(splited[1]);
        this.userDetail.controls["year"].setValue(splited[2]);
        this.checkedDepartments = response.data.department; this.checked = this.checkedDepartments;
        console.log("department", this.checkedDepartments);
        });
      }
    });
  }


  newEmployee(): void {
    this.submitted = false;
    this.employee = new EmployeePayRoll();
  }

  register() {
    if(!this.isFormValid())
      return;
    var employeeDto = {
      'name': this.userDetail.controls['name'].value,
      'salary': this.userDetail.controls['salary'].value,
      'departments':this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value +" " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'note': this.userDetail.controls['notes'].value,
      'profilePic': this.userDetail.controls['profile'].value
    };
    console.log("employee dto in Register()", employeeDto)
    this.employeeService.addEmployeePayRollRecord(employeeDto).subscribe((response:any) => {
      this.router.navigate(["/home"]);
      console.log("Response is ====> " + response);
    })
  }

  update() {
    this.getCheckbox(this.checkBox); 
    var employeeDto = {
      'id': Number.parseInt(this.id),
      'name': this.userDetail.controls['name'].value,
      'salary': this.userDetail.controls['salary'].value.toString(),
      'departments':this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value + " " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'note': this.userDetail.controls['notes'].value,
      'profilePic': this.userDetail.controls['profile'].value
    };
    console.log("employee dto in Update()", employeeDto)

    if(this.isFormValid()) {
      this.employeeService.updateEmployeePayRollRecord(employeeDto).subscribe((response: any) => {
        console.log("response is " + response);
        this.router.navigate(["/home"]);
      })
    }
  }

  isFormValid(): boolean {
    if(this.userDetail.controls['name'].valid &&
        this.userDetail.controls['salary'].valid &&
        this.checked.length > 0 &&
        this.userDetail.controls['gender'].valid &&
        this.userDetail.controls['day'].valid &&
        this.userDetail.controls['year'].valid &&
        this.userDetail.controls['month'].valid &&
        this.userDetail.controls['notes'].valid &&
        this.userDetail.controls['profile'].valid)
    return true;
    this.userDetail.markAllAsTouched();
    return false;
  }

  validatePrevious(num: Number) {
    for(var i=0; i<=num; i++)
      this.userDetail.controls[this.fields[i]].markAsTouched();
  }

  toggleCheckBox(dept: any){
    // return (this.checkedDepartments.includes(dept)) ? true : false;
  }

  onSubmit() {
    this.submitted = true;
    this.register();
  }

  reset() {
    this.resetCheckbox(this.checkBox);
    this.userDetail.reset();
  }

  getCheckbox(checkbox: any){
    this.checked = [];
    this.checkBox.filter(checkbox => checkbox.checked == true).forEach(data => this.checked.push(data.value));
  }

  resetCheckbox(checkbox: any){
    this.checked = [];
    this.checkedDepartments = []; console.log("checkedDepartments in reset ", this.checkedDepartments);
    this.checkBox.filter(checkbox => checkbox.checked == true).forEach(checkbox => checkbox.checked=false);
  }

  fields: string[] = ['name', 'profile', 'gender', 'department', 'salary', 'day', 'month', 'year', 'notes'];

  days: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28',
    '29', '30', '31'
  ];
  months: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12'
  ];
  years: string[] = [
    '2010', '2011', '2012', '2013', '2014', '2016', '2017', '2018', '2019', '2020',
    '2021'
  ];
  departments: string[] = [
    'HR', 'Sales', 'Finance', 'Engineer', 'Others'
  ]
  
  formatLabel(value: number) {
    if(value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}