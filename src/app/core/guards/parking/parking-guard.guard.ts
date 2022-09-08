import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PARKING_ACCESS_TOKEN } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ParkingGuard implements CanActivate {
  constructor(private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = sessionStorage.getItem(PARKING_ACCESS_TOKEN)
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
