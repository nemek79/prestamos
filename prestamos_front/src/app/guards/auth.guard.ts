import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route,
  UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authSRV: AuthService,
    private route: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authSRV.isAuthenticated()) {

      if (this.isTokenExpirado()) {
        this.authSRV.logout();
        this.route.navigate(['/login']);
      }

      return true;
    }

    this.route.navigate(['/login']);
    return false;
  }
  // estos me salen pero en el curso no se ven
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  isTokenExpirado(): boolean {

    let token = this.authSRV.getToken();

    let payload = this.authSRV.obtenerDatosToken(token);

    let now = new Date().getTime() / 1000; // Fecha actual en segundos

    if (payload.exp < now)  {
      return true;
    }

    return false;
  }

}

