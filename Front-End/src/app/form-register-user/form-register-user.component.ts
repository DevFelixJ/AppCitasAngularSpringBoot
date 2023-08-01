import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './form-register-user.component.html',
  styleUrls: ['./form-register-user.component.css']
})
export class FormRegisterUserComponent {
  userData = {
    username: '',
    password: '',
    email: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    console.log('userData:', this.userData);
    const API_URL = 'http://localhost:8080/auth/register'; // Cambiar la URL si es diferente en tu backend

    const registerRequest: RegisterRequest = {
      username: this.userData.username,
      email: this.userData.email,
      password: this.userData.password
    };

    this.http.post<AuthResponse>(API_URL, registerRequest).pipe(
      tap((response) => {
        console.log('Usuario registrado exitosamente:', response);
        // Aquí podrías realizar alguna acción después de un registro exitoso.
        this.router.navigate(['/']); // Esto redirige a la ruta '/'
      }),
      catchError((error) => {
        console.error('Error al registrar el usuario:', error);
        // Aquí podrías manejar el error en caso de que falle el registro.
        return throwError(() => new Error(error)); // Devuelve un nuevo observable de error.
      })
    ).subscribe();
  }
}
