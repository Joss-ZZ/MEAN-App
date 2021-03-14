import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private authService: AuthService) { }

  get usuario() {
    return this.authService.usuario;
  }

  ngOnInit(): void {
  }

}
