import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/interface';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  displayedColumns: string[] = ['img', 'nombre', 'email'];
  public dataSource;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.listarUsuarios()
        .subscribe(resp => {
          this.usuarios = resp,
          this.dataSource = this.usuarios
        });
  }

}
