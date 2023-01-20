import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReparationVoiture } from './reparationVoiture.model';

@Injectable({
  providedIn: 'root'
})
export class ReparationVoitureService {
  reparationVoitures: ReparationVoiture[];
  
  readonly baseURL = 'http://localhost:3000/reparationVoiture';

  constructor(private http: HttpClient) {
    this.reparationVoitures = [];
   }

  postClient(emp: ReparationVoiture) {
    return this.http.post(this.baseURL,emp);
  }

  envoieEmail(emp: ReparationVoiture){
    return this.http.post(this.baseURL+`/envoieMail`,emp);
  }

  insertVoiture(emp: ReparationVoiture) {
    return this.http.post(this.baseURL + `/insertPersoVoiture`, emp);
  }

  putClient(emp: ReparationVoiture) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteClient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  getRepartionVoitureList() {
    return this.http.get(this.baseURL);
  }

  
}
