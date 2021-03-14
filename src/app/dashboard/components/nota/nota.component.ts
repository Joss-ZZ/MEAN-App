import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nota } from '../../../auth/interfaces/interface';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class NotaComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    descripcion: [this.data.descripcion, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NotaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Nota) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.dialogRef.close(this.miFormulario.get('descripcion').value);
  }

  cerrarModal(){
    this.dialogRef.close();
  }

}
