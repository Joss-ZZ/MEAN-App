import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { UtilidadesService } from '../../../shared/services/utilidades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@gmail.com',[Validators.required, Validators.pattern(this.validatorService.correoPattern)]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private authService: AuthService,
              private router: Router,
              private utilidadesService: UtilidadesService) { }

  ingresar(){
    const {email, password} = this.miFormulario.value;
    
    this.authService.login(email, password)
      .subscribe(ok=> {
        if(ok === true){
          this.utilidadesService.openSnackBar('Bienvenido');
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error al iniciar sesión', ok, 'error');
        }
      });

  }

}
