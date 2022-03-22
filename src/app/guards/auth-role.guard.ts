import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, pluck, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { UsersService } from '@services/users.service';
import { Profile } from '@classes/profile';
import { AdminService } from '@services/admin.service';

/**
 * Credit: https://medium.com/echohub/angular-role-based-routing-access-with-angular-guard-dbecaf6cd685
 */
@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private adminService: AdminService,
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkRoles(route, url);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkRoles(childRoute, url);
  }

  private checkRoles(
    route: ActivatedRouteSnapshot,
    url: any
  ): Observable<boolean> {
    return this.adminService.checkIsAdmin();
  }
}
