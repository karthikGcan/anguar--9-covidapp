import { Injectable } from '@angular/core';
import{Observable,of,throwError}from 'rxjs';
import{HttpClient,HttpHeaders,HttpErrorResponse}from '@angular/common/http';
import{catchError,map,tap}from 'rxjs/operators';
import  {Cases} from './cases';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};


const apiUrl = 'http://localhost:3000/api';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private Http: HttpClient) { 
  
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addCases(cases: Cases): Observable<Cases> {
    return this.Http.post<Cases>(apiUrl, cases, httpOptions).pipe(
      tap((c: Cases) => console.log(`added product w/ id=${c.id}`)),
      catchError(this.handleError<Cases>('addCases'))
    );
  }
  

  getCases(): Observable<Cases[]>{
    return this.Http.get<Cases[]>(`${apiUrl}`)
    .pipe(tap (Cases => console.log('fetched acces')),
    catchError(this.handleError('getcases',[]))
    );
  }
  getCasesById(id : string): Observable<Cases>{
    const url = `${apiUrl}/${id}`;
    return this.Http.get<Cases>(url).pipe(
      tap(_ =>console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<Cases>(`getCasesById id=${id}`))
);
 }

 deleteCases(id : string): Observable<Cases>{
   const url = `${apiUrl}/${id}`;
   return this.Http.delete<Cases>(url).pipe(
     tap(_ =>console.log(`deleted cases id=${id}`)),
     catchError(this.handleError<Cases>(`deleteCases id`))
    );
   }
   updateCases(id: string, cases: Cases): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.Http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>('updateCases'))
    );
  }
    

 }
 

