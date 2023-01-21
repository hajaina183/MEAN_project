import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReparationVoiture } from './reparationVoiture.model';
import { Voiture } from './voiture.model';

@Injectable({
  providedIn: 'root'
})
export class ReparationVoitureService {
  reparationVoitures: ReparationVoiture[];
  voitures: Voiture[];
  voiture = new Voiture();
  
  readonly baseURL = 'http://localhost:3000/reparationVoiture';

  constructor(private http: HttpClient) {
    this.reparationVoitures = [];
    this.voitures = [];
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

  insertVoitureReparation(voiture: Voiture,date: string,type: string,prix: string) {
    return this.http.put(this.baseURL + `/insertVoitureReparation/${date}/${type}/${prix}`, voiture);
  }

  terminerReparation(voiture: Voiture,date: string,type: string) {
    return this.http.put(this.baseURL + `/terminerReparation/${date}/${type}`, voiture);
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
