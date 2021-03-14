import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canLoad(): boolean | Observable<boolean> {

    return this.authService.validarToken()
              .pipe(
                tap(ok => {
                  if(!ok){
                    this.router.navigateByUrl('/auth/login');
                  }
                })
              )

  }

  canActivate(): boolean | Observable<boolean> {

    return this.authService.validarToken()
              .pipe(
                tap(ok => {
                  if(!ok){
                    this.router.navigateByUrl('/auth/login');
                  }
                })
              )

  }
  
}
