import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReparVoiture } from './repar-voiture.model';

@Injectable({
  providedIn: 'root'
})
export class ReparVoitureService {
  selectedClient: ReparVoitureService;
  ReparVoiture: ReparVoiture[];
  
  readonly baseURL = 'http://localhost:3000/reparationVoiture';

  constructor(private http: HttpClient) { }

  insertVoiture2(emp: ReparVoiture) {
    return this.http.put(this.baseURL + `/insertVoiture`, emp);
  }
}
