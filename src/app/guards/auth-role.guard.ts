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
    console.log(route);
    return this.usersService.profile$.pipe(
      map((profile) => {
        // login check
        if (!profile) return false;

        // roles check
        if (!route.data.role) return true;
        else {
          if (profile.app_metadata?.roles?.indexOf(route.data.role) > -1) {
            return true;
          } else {
            console.log('ERROR: Unauthorized.');
            this.router.navigate(['']);
            return false;
          }
        }
      }),
      catchError((err, caught) => {
        console.log('Error:', err.message);
        this.router.navigate(['']);
        return of(false);
      })
    );
    // if (this.authService.) {
    //   const userRole = this.authService.getRole();
    //   if (route.data.role && route.data.role.indexOf(userRole) === -1) {
    //     this.router.navigate(['/home']);
    //     return false;
    //   }
    //   return true;
    // }

    // this.router.navigate(['/home']);
    // return false;
  }
}
