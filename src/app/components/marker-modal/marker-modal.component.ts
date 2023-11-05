import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.css']
})
export class MarkerModalComponent {
  @Output() proyectoGuardado = new EventEmitter<void>();
  proyecto = {
    nombre_proyecto: '',
    descripcion: '',
    marker: { latitude: 0, longitude: 0 },
    price: 0,
    date: new Date() 
  };
  hasData: boolean = false;

  constructor(public dialogRef: MatDialogRef<MarkerModalComponent>, private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data) {
      this.hasData = true;
      this.proyecto = data;
    }

  }

  guardar(): void {
    const fechaFormateada = format(this.proyecto.date, "yyyy-MM-dd HH:mm:ss");
    console.log('Objeto proyecto:', { ...this.proyecto, fecha: fechaFormateada });
    if (this.hasData) {
      this.projectService.update({ ...this.proyecto, fecha: fechaFormateada }).subscribe(data => {
        this.proyectoGuardado.emit();
        this.dialogRef.close();
      });
    } else {
      this.projectService.add({ ...this.proyecto, fecha: fechaFormateada }).subscribe(data => {
        this.proyectoGuardado.emit();
        this.dialogRef.close();
      });
    }

  }
}
