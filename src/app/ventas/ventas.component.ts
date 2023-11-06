import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  projects: any[] = [];
  filteredTableData: any[] = [];
  selectedYear: number = 2023;
  years: number[] = [];
  tableData: any[] = [];
  results: any[] = [];

  constructor(private projectService: ProjectService) { }

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

  get() {
    this.projects = [];
    this.results = [];
    this.projectService.getDataYear(this.selectedYear).subscribe((data) => {
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
            name: this.returnMonthName(mes)
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

  returnMonthName(monthNumber: number) {
    switch (monthNumber) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosoto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      default:
        return "Diciembre";
    }
  }

  updateTable(): void {
    this.get();
  }
}
