import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private acct: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    return this.acct.isLoggesIn.pipe(take(1), map((loginStatus: boolean) =>
    {
      const destination: string = state.url;
      const productId = route.params.id;

      if (!loginStatus) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        return false;
      }

      return false;
    }))
  }
}
