// user-login.component.ts

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, AuthResponse } from '../models/auth.model'; // Importa las interfaces desde el archivo creado

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  userData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const API_URL = 'http://localhost:8080/auth/login'; // La URL se ajusta para el endpoint /auth/login

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // Enviar credenciales con la solicitud
    };

    const loginRequest: LoginRequest = {
      username: this.userData.username,
      password: this.userData.password
    };

    this.http.post<AuthResponse>(API_URL, loginRequest, httpOptions).pipe(
      tap((response: AuthResponse) => {
        console.log('Respuesta del servidor:', response);

        if (response && response.token) {
          // Almacenar el token de acceso en el almacenamiento local (localStorage)
          localStorage.setItem('access_token', response.token);
          // Redirigir al usuario a la página de inicio después del inicio de sesión exitoso
          this.router.navigate(['/chatRoom', this.userData.username]); // Esto redirige a la ruta '/ChatRoom' con el nombre de usuario
        } else {
          // Mostrar un mensaje de error en caso de credenciales incorrectas u otro error
          console.error('Error de inicio de sesión:', response);
        }
      }),
      catchError((error) => {
        console.error('Error al iniciar sesión:', error);
        // Obtener el mensaje de error del objeto de error devuelto por el servidor
        let errorMessage = 'Error al iniciar sesión.';

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    ).subscribe();
  }
}
