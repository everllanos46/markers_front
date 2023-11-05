import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environmets';
import { Project } from '../models/project';

const ruta = environment.ruta;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `${token}` // Agregar el token como Bearer
    });
  }

  getData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(ruta + "project", {headers}).pipe(map(project => {
      return project.data;
    }));
  }

  add(project: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(ruta + "project/add", project, {headers}).pipe(map(projectd => {
      return projectd;
    }));
  }

  getDataYear(year:any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(ruta + "project/year",{year:year}, {headers}).pipe(map(project => {
      return project.data;
    }));
  }

  update(project: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(ruta + "project/update", project,{headers}).pipe(map(projectd => {
      return projectd;
    }));
  }
}
