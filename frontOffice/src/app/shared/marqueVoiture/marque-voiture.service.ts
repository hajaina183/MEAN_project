import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarqueVoiture } from './marque-voiture.model';

@Injectable()
export class MarqueVoitureService {
  selectedClient!: MarqueVoiture;
  clients!: MarqueVoiture[];
  
  readonly baseURL = 'http://localhost:3000/marqueVoiture';

  constructor(private http: HttpClient) { }

  getMarqueVoiture(emp: MarqueVoiture) {
    return this.http.get(this.baseURL);
  }

  postClient(emp: MarqueVoiture) {
    return this.http.post(this.baseURL,emp);
  }

  putClient(emp: MarqueVoiture) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteClient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
