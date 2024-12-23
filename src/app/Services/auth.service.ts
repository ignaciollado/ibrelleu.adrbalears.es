import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDTO } from '../Models/auth.dto';
import { SharedService } from './shared.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export interface AuthToken {
  user_id: string;
  access_token: string;
}

const URL_API = '../../assets/phpAPI/'
const URL_API_SRV = "https://jwt.idi.es/public/index.php"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain', /* la única forma de evitar errores de CORS ha sido añadiendo esta cabecera */
  })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  constructor(
    private http: HttpClient, 
     private router: Router,
    private jwtHelper: JwtHelperService ) { }



  public login(loginForm: AuthDTO): Observable<AuthToken> {
    return this.http
        .post<AuthToken>( `${URL_API_SRV}/api/login-users/`, loginForm, httpOptions )
  }

  public logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('ibrelleu_id');
    window.location.reload()
  }

  public isAuthenticated(): boolean {
    console.log ( "el token: ", this.jwtHelper.decodeToken(sessionStorage.getItem("access_token")) )
    if (this.jwtHelper.isTokenExpired(sessionStorage.getItem("access_token"))) {
      return false
    } else {
      return true
    }
  }
}