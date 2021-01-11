import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeePayRoll } from '../models/employeePayRoll';


@Injectable({
  providedIn: 'root'
})
export class EmployeePayrollService {
  private getUrl: string = "http://localhost:8080/employeepayrollservice/";

  constructor(private httpClient: HttpClient) { }

  getAllEmployeePayRollList(): Observable<any> {
    return this.httpClient.get<any>(`${this.getUrl}get`);
  }
  
  getEmployeePayrollById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.getUrl}get/${id}`);
  }

  deleteEmployeePayrollRecord(id: number): Observable<any> {
    return this.httpClient.delete(`${this.getUrl}delete/${id}`);
  }

  addEmployeePayRollRecord(data: any): Observable<EmployeePayRoll> {
    return this.httpClient.post<EmployeePayRoll>(`${this.getUrl}create`, data);
  }

  updateEmployeePayRollRecord(data: any) {
    var id = data.id;
    return this.httpClient.put<EmployeePayRoll>(`${this.getUrl}update/${id}`, data);
  }
}