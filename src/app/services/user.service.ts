import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environmets';
import { User } from '../models/user';

const ruta = environment.ruta;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentToken: BehaviorSubject<string>;
  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    if (token !== null)
      this.currentToken = new BehaviorSubject<string>(token);
    else this.currentToken = new BehaviorSubject<string>("");
  }

  getData(): Observable<User[]> {
    return this.http.get<User[]>(ruta + "user").pipe(tap(() => console.log("Consultado correctamente")));
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(ruta + "user/login", { username, password }).pipe(map(user => {
      sessionStorage.setItem('token', user.data);
      return user;
    }));
  }

  create(user:any): Observable<any> {
    return this.http.post<any>(ruta + "user/create", user).pipe(tap(() => console.log("Creado correctamente")));
  }

  public get currentTokenValue(): string {
    return this.currentToken.value;
  }

  logout(){
    sessionStorage.removeItem('token');
    this.currentToken= new BehaviorSubject<string>("");
  }
}
