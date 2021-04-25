import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): String {
    return this.usuario.uid || '';
  }

  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '1082609946978-h4drrkka53v3m26e578tpn0215vn4nen.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',          
        });

        resolve();
      });
    });
  }
  

  logout() {
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      });
      
    });
  }

  validarToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', google, img, role, uid);
        localStorage.setItem( 'token', resp.token );
        return true
      }),
      catchError( error => of(false) )
    );

  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/usuarios`, formData)
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem( 'token', resp.token )
                    })
                  );
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      //role: this.usuario.role
    };

    console.log( data );

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login( formData: LoginForm ) {
    return this.http.post(`${ base_url }/login`, formData)
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem( 'token', resp.token )
                    })
                  );
  }

  loginGoogle( token ) {
    return this.http.post(`${ base_url }/login/google`, { token })
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem( 'token', resp.token )
                    })
                  );
  }

}
