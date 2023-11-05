import { Marker } from "./marker";

export class Project
{
  id: number;
  nombre_proyecto: string;
  descripcion: string;
  marker: Marker;

  constructor(id: number, nombre_proyecto: string, descripcion: string, marker: Marker){
    this.id=id;
    this.nombre_proyecto=nombre_proyecto;
    this.descripcion=descripcion;
    this.marker=marker;
  }
}
