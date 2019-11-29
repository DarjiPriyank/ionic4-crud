import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(apiUrl)
      .pipe(
        tap(employee => console.log('fetched employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }

  getEmployee(id: any): Observable<Employee> {
    const url = `${apiUrl}/read/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(apiUrl+'/create', employee, httpOptions).pipe(
      tap((prod: Employee) => console.log(`added employee w/ id=${prod._id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(id: any, employee: any): Observable<any> {
    const url = `${apiUrl}/update/${id}`;
    return this.http.put(url, employee, httpOptions).pipe(
      tap(_ => console.log(`updated employee id=${id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(id: any): Observable<Employee> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

}
