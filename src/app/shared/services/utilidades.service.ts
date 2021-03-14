import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, "ok", {
      duration: 2000,
    });
  }

}
