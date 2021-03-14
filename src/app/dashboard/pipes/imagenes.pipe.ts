import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../../auth/interfaces/interface';

@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  imagenUrl: string = 'http://localhost:4000/imagenes/usuarios';

  transform(usuario: Usuario): string {
    
    if(!usuario.img){
      return `assets/images/no-image.png`;
    }else{
      return `${this.imagenUrl}/${usuario.img}`;
    }

  }

}
