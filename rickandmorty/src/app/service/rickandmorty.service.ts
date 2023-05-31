import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get(this.apiUrl+'location/?page=1');
  }

  public detalle(id:number){
    return this.http.get(this.apiUrl +  `location/${id}`)
  }

  public character(id:number){
    return this.http.get(this.apiUrl +  `character/${id}`)
  }
}
