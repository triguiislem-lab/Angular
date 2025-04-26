import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:3000/members';

  constructor(private http: HttpClient) { }

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

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member)
      .pipe(catchError(this.handleError));
  }

  editMember(id: string, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${id}`, member)
      .pipe(catchError(this.handleError));
  }

  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

}
