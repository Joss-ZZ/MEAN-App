import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nota } from '../../../auth/interfaces/interface';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class EliminarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EliminarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Nota) { }

  ngOnInit(): void {
  }

  borrar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close();
  }

}
