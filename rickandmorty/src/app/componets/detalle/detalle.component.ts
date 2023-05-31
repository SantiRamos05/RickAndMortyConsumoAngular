import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickandmortyService } from 'src/app/service/rickandmorty.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{
  locations: string[] = [];
  allCharacters: any[] = []; // lista completa de personajes
  characters: any[] = []; // lista de personajes en la página actual
  itemsPerPage: number = 12;
  currentPage: number = 0;
  totalItems: number = 0;



  constructor(private servicio: RickandmortyService, private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.servicio.detalle(id).subscribe((data: any) => {
      this.locations = data.residents;
      console.log(data.residents);

      // Hacer una petición HTTP para cada URL de personaje
      const requests = this.locations.map(url => this.http.get(url));

      // Combinar todas las respuestas en una sola matriz de personajes
      forkJoin(requests).pipe(
        map(responses => responses.map(response => response)),
      ).subscribe(characters => {
        this.allCharacters = characters;
        this.totalItems = this.allCharacters.length;
        this.characters = this.allCharacters.slice(0, this.itemsPerPage);

      });

    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.characters = this.allCharacters.slice(startIndex, endIndex);
  }


}
