import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from 'src/app/service/rickandmorty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ubicaciones: any[] = [];

  constructor(private servicio: RickandmortyService) { }


  ngOnInit(): void {
    this.servicio.getLocation().subscribe((data: any) => {
      this.ubicaciones = data.results;
    });
  }

}
