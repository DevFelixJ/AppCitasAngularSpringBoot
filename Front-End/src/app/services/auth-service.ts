import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:8080'; // Cambia esto para que coincida con la URL de tu backend
    private tokenKey = 'auth_token';
  
    constructor(private http: HttpClient) {}
  
    login(loginRequest: LoginRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(this.url + '/login', loginRequest);
    }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem(this.tokenKey);
    }
  
    saveToken(token: string): void {
      localStorage.setItem(this.tokenKey, token);
    }
  
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    removeToken(): void {
      localStorage.removeItem(this.tokenKey);
    }
  }