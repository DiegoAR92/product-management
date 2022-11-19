import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { Auth } from '../../../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth : Auth | undefined = undefined;

  get auth(): Auth{
    return this._auth as Auth;
  }
  constructor(private http: HttpClient, private router: Router) { }

  verifyLogged() : Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/users/1`)
    .pipe(
      map(auth => {
        this._auth = auth;
        return true;
      })
    );
  }

  login() : Observable<Auth>{
    return this.http.get<Auth>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(resp => this._auth = resp),
      tap(resp => localStorage.setItem('token', resp.id.toString()))
      );
  }

  logout(): void{
    localStorage.removeItem('token');
    this._auth = undefined;
    this.router.navigate(['/']);
  }

}
