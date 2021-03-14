import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import Swal from 'sweetalert2'
import { ValidatorService } from '../../../shared/validator/validator.service';
import { AuthService } from '../../services/auth.service';
import { UtilidadesService } from '../../../shared/services/utilidades.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombrePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.correoPattern)] ],
    password: ['', [Validators.required ,Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private authService: AuthService,
              private router: Router,
              private utilidadesService: UtilidadesService) { }

  registrar(){
    const {nombre, email, password} = this.miFormulario.value;

    this.authService.registro(nombre, email, password)
      .subscribe(ok => {
        if(ok === true){
          this.utilidadesService.openSnackBar('Bienvenido')
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error en el registro', ok, 'error');
        }
      })
  }

}
