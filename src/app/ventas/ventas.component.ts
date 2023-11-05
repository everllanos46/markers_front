import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  projects: any[]=[];
  filteredTableData: any[] = [];
  selectedYear: number = 2023;
  years: number[] = [];
  tableData: any[] = [];
  results: any[] = [];

  constructor(private projectService: ProjectService){}

  ngOnInit(): void {
    this.fillYears();
    this.selectedYear = new Date().getFullYear();
    this.updateTable();
    this.get();
  }



  fillYears(): void {
    for (let year = 2001; year <= 2024; year++) {
      this.years.push(year);
    }
  }

  get(){
    this.projectService.getDataYear(this.selectedYear).subscribe((data)=>{
      console.log(data)
      this.projects = data;
      const proyectosAgrupados = this.projects.reduce((result, proyecto) => {
        const fechaCreacion = new Date(proyecto.date);
        const mes = fechaCreacion.getMonth() + 1;
        const anio = fechaCreacion.getFullYear();

        const clave = `${anio}-${mes}`;

        if (!result[clave]) {
          result[clave] = {
            anio,
            mes,
            totalVentas: 0,
            cantidadVentas: 0,
          };
        }

        result[clave].totalVentas += proyecto.price;
        result[clave].cantidadVentas++;
        return result;
      }, {});


      const resultados = Object.values(proyectosAgrupados);
      this.results = resultados;
      console.log(resultados);
    });
  }

  updateTable(): void {

    const filteredData = this.tableData.filter((item) => {
      const itemDate = new Date(item.fecha);
      const itemYear = itemDate.getUTCFullYear();
      const itemMonth = itemDate.getUTCMonth() + 1; 
      return itemYear === this.selectedYear;
    });


    this.filteredTableData = filteredData;
  }
}
