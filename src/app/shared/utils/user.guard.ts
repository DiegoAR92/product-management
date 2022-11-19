import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {
  
  constructor( private authService: AuthService, private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
      return this.authService.checkUser().pipe(
        tap( result => {
          if(!result){
            this.router.navigate(['/']);
          }
        } )
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.checkUser().pipe(
        tap( result => {
          if(!result){
            this.router.navigate(['/']);
          }
        } )
      );
  }

}
