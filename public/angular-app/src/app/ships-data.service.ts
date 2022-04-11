import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ship } from './ships/ships.component';

@Injectable({
  providedIn: 'root'
})
export class ShipsDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  public getShips(counter:string,skip?:string): Promise<Ship[]> {
  
    let url!: string
    if(skip){
      url= this.apiBaseUrl + "/ships/?counter="+counter+"&offset="+skip;
    }else{
      // url= this.apiBaseUrl + "/ships/?counter="+counter;
      url= this.apiBaseUrl + "/ships/?counter="+counter+"&offset="+0;
    }
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship[]})
                .catch(this.handleError);
  }

  public getShip(shipId: string): Promise<Ship> {
    const url: string= this.apiBaseUrl + "/ships/" + shipId;
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship})
                .catch(this.handleError);
  }
  
  public geoSearch(lng: string, lat:string,dis:string): Promise<Ship[]> {
    const url: string= this.apiBaseUrl + "/search/?lng=" + lng+"&lat="+lat+"&dis="+dis;

    console.log("url",url);
    
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship})
                .catch(this.handleError);
  }

  private handleError(error: any):Promise<any> {
    return Promise.reject(error.message || error);
  }
}
