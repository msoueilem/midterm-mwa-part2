import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShipsDataService } from '../ships-data.service';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  latitude!:string
  longitude!:string
  distance!:string
  ships: Ship[] = []
  constructor(private shipdata:ShipsDataService) { }

  ngOnInit(): void {
  }
  searchGeo():void{
    console.log(this.distance);
    
    this.shipdata.geoSearch(this.longitude,this.latitude,this.distance).then(
      res => this.updatelist(res)
    )
  }

  updatelist(ships:Ship[]):void{
    this.ships=ships
  }

}
