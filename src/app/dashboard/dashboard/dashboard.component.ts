import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .main-footer{
        z-index: 0 !important;
        position: absolute !important;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  get usuario(){
    return this.authService.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
