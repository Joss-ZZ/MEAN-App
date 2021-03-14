import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../../auth/interfaces/interface';

@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  // imagenUrl: string = 'http://localhost:4000/imagenes/usuarios';

  transform(usuario: Usuario): string {
    
    if(!usuario.img_url){
      return `assets/images/no-image.png`;
    }else{
      return `${usuario.img_url}`;
    }

  }

}
