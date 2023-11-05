import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarkerModalComponent } from '../components/marker-modal/marker-modal.component';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  projects: Project[]=[];
  coordinates: number[][] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'latitude', 'longitude', 'precio','accion' ];
  dataSource = new MatTableDataSource<Project>(this.projects);

  constructor(public dialog: MatDialog, private projectService: ProjectService) {}

  ngOnInit(){
    this.getData();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openMarkerModal(project:any): void {
    const dialogRef = this.dialog.open(MarkerModalComponent,{
      data: project
    });
    dialogRef.componentInstance.proyectoGuardado.subscribe(() => {
      this.getData();
    });
  }

  getData(){
    this.projects=[];
    this.coordinates=[];
    this.projectService.getData().subscribe(data=>{
      this.projects = data;
      this.coordinates = this.projects.map(project => [project.marker.longitude, project.marker.latitude]);
    });
  }

  editarProyecto(project: Project): void {
    console.log(project);
  }


}
