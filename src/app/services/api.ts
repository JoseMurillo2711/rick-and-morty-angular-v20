import { Injectable, inject, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // 1. Define API_URL como private readonly
  private readonly API_URL: string = 'https://rickandmortyapi.com/api/character';

  // 2. Inyecta HttpClient usando inject()
  private readonly http = inject(HttpClient);

  // 3. Señal privada tipo WritableSignal para almacenar personajes
  private charactersSignal: WritableSignal<Character[]> = signal<Character[]>([]);

  // 4. Señal pública de solo lectura tipo Signal
  public readonly characters: Signal<Character[]> = this.charactersSignal.asReadonly();

  /**
   * 5. Obtiene todos los personajes
   */
  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL).pipe(
      tap(response => this.charactersSignal.set(response.results))
    );
  }

  /**
   * 6. Busca personajes por nombre
   */
  searchCharacters(name: string): Observable<ApiResponse> {
    const trimmed = name.trim();
    if (!trimmed) {
      // Si el nombre está vacío, devolver todos
      return this.getCharacters();
    }

    const url = `${this.API_URL}?name=${encodeURIComponent(trimmed)}`;
    return this.http.get<ApiResponse>(url).pipe(
      tap(response => this.charactersSignal.set(response.results))
    );
  }
}
