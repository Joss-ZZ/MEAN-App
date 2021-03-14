import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { ValidatorService } from '../../shared/validator/validator.service';
import { UtilidadesService } from '../../shared/services/utilidades.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  imagenTemp!: any;
  imagenSubir!: File;

  miFormulario: FormGroup = this.fb.group({
    nombre: [this.usuario.nombre, [Validators.required, Validators.pattern(this.validatorService.nombrePattern)]],
    email: [this.usuario.email, [Validators.required, Validators.pattern(this.validatorService.correoPattern)]],
    archivo: ['', [Validators.required]]
  })

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private validatorService: ValidatorService,
              private utilidadesService: UtilidadesService,
              private router: Router) { }

  get usuario() {
    return this.authService.usuario;
  }

  ngOnInit(): void {
  }

  actualizar(){

    const {nombre, email} = this.miFormulario.value;
    
    if(this.miFormulario.valid){
      this.authService.actualizarUsuario( nombre, email, this.imagenSubir)
      .subscribe( resp => {
        if(resp.ok){
          this.utilidadesService.openSnackBar("Actualizado correctamente!");
          this.router.navigateByUrl('/dashboard/principal');
        }
      });
    }else{
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
    }

  }

  cambiarImagen(file: File){
    console.log(file);
    this.imagenSubir = file;

    if(!file){
      return this.imagenTemp = null;
    }

    if(file.type.includes('image')){
      const reader = new FileReader();
      reader.readAsDataURL( file );
  
      reader.onloadend = () => {
        this.imagenTemp = reader.result;
      }
    }else{
      Swal.fire('Error', 'Solo puede subir imágenes', 'error');
      this.miFormulario.get('archivo').setValue('');
    }

  }

}
