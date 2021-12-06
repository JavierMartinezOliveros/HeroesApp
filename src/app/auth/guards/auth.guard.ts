import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authservice: AuthService,
               private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // if( this.authservice.auth.id ) {
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard - CanActivate')
      // return false;

      return this.authservice.verificacionAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if( !estaAutenticado ){
                    this.router.navigate([ './auth/login']);
                  }
                })
              )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authservice.verificacionAutenticacion()
            .pipe(
              tap( estaAutenticado => {
                if( !estaAutenticado ){
                  this.router.navigate([ './auth/login']);
                }
              })
            );

      // if( this.authservice.auth.id ) {
      //   return true;
      // }

      // console.log('canLoad', true);
      // console.log( route );
      // console.log( segments );

      // console.log('Bloqueado por el AuthGuard - CanLoad')
      // return false;
  }
}
