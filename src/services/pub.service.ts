import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Pub } from 'src/models/Pub';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PubService {
  private apiUrl = 'http://localhost:3000/Pub';
  constructor(private http: HttpClient) { 

  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  getAllPub(): Observable<Pub[]> {
    return this.http.get<Pub[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  addPub(pub: Pub): Observable<void> {
    return this.http.post<void>(this.apiUrl, pub);
  }
  deletePub(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  updatePub(id: string, pub: Pub): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, pub)
      .pipe(catchError(this.handleError));
  }
  
  
}
