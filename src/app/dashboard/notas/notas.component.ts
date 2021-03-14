import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Nota } from 'src/app/auth/interfaces/interface';

import { NotaService } from '../services/nota.service';
import { NotaComponent } from '../components/nota/nota.component';
import { UtilidadesService } from '../../shared/services/utilidades.service';
import { EliminarComponent } from '../components/eliminar/eliminar.component';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],

})
export class NotasComponent implements OnInit {

  //Paginator
  length: number = 100;
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  notas: Nota[] = [];

  displayedColumns: string[] = ['usuario', 'descripcion', 'accion'];
  dataSource: MatTableDataSource<any>;

  constructor(private notaService: NotaService,
              public dialog: MatDialog,
              private utilidadesService: UtilidadesService) {}

  ngOnInit(): void {
    this.notaService.listarNotas()
      .subscribe(resp=> {
        this.notas = resp.notasDB;
        this.dataSource = new MatTableDataSource(this.notas);
        this.dataSource.paginator = this.paginator;
      });
  }

  Editar(row: Nota, index: number){
    // const indiceFila = (this.dataSource.paginator.pageIndex*this.dataSource.paginator.pageSize)+index;
    const dialogRef = this.dialog.open(NotaComponent, {
      width: '60%',
      data: row
    })

    dialogRef.afterClosed()
      .subscribe(nuevaNota=> {
        if(!nuevaNota){
          return;
        }
        this.notaService.editarNota(row._id, nuevaNota)
          .subscribe(resp => {
            this.dataSource.data = this.dataSource.data.map(nota => {
              if(nota._id === row._id){
                nota.descripcion = nuevaNota;              
              }
              return nota;
            });
            this.utilidadesService.openSnackBar('Actualizado con éxito');
          })
      })

  }

  Eliminar(row: Nota){

    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed()
      .subscribe(resp => {
        if(!resp){
          return;
        }
        this.notaService.eliminarNota(row._id)
          .subscribe(resp => {
            if(resp.ok){
              this.dataSource.data = this.dataSource.data.filter(i => i !== row);
              this.utilidadesService.openSnackBar('Eliminado correctamente');
            }
          })
      });
  }

  agregarNota(){
    const dialogRef = this.dialog.open(NotaComponent,{
      width: '60%',
      data: ''
    })

    dialogRef.afterClosed()
      .subscribe(nota=> {
        if(!nota){
          return;
        }
        //expresion regular para reemplazar espacios en blanco por un espacio
        const notaString = nota.replace(/\s+/g, ' ');
        this.notaService.agregarNota(notaString)
            .subscribe(resp => {
              if(resp.ok){
                this.dataSource.data.push(resp.notaDB);
                this.dataSource = new MatTableDataSource(this.dataSource.data);
                this.dataSource.paginator = this.paginator;
                this.utilidadesService.openSnackBar('Agregado con éxito');
              }
            })
      });
  }


  //Filtro para la busqueda
  aplicarFiltro(event: KeyboardEvent ){
    const searchText = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchText.trim().toLowerCase();
    console.log(this.dataSource.data);
  }

}
