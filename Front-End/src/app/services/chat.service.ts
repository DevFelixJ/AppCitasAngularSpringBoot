import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, User } from '../models/chat.model';
import {LoginRequest, AuthResponse} from '../models/auth.model'

@Injectable({
  providedIn: 'root',
})
export class ChatService {

    private url = 'http://localhost:8080'; // Cambiar la URL según corresponda
  
    constructor(private http: HttpClient) {}
  
    // Agrega los métodos de autenticación necesarios
    login(loginRequest: LoginRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.url}/login`, loginRequest);
    }
  
    // Agrega los métodos de autenticación necesarios
  
    getUserByNickname(nickname: string): Observable<User> {
      return this.http.get<User>(`${this.url}/getUserByNickname/${nickname}`);
    }
  
    getMessages(channelName: string): Observable<Message[]> {
      return this.http.post<Message[]>(`${this.url}/getMessages`, channelName);
    }
  
    // Otros métodos para enviar mensajes, etc., según tus necesidades
  }