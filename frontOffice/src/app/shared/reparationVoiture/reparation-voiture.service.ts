import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReparationVoiture } from './reparationVoiture.model';
import { ReparVoiture } from './repar-voiture.model';
import { Voiture } from './voiture.model';

@Injectable({
  providedIn: 'root'
})
export class ReparationVoitureService {
  selectedClient!: ReparationVoitureService;
  ReparationVoiture!: ReparationVoiture[];
  voitures!: Voiture[];
  voiture = new Voiture();
  
  readonly baseURL = 'http://localhost:3000/reparationVoiture';

  constructor(private http: HttpClient) { 
    this.voitures = [] ;
  }

  getRepartionVoitureList() {
    return this.http.get(this.baseURL);
  }

  postClient(emp: ReparationVoiture) {
    return this.http.post(this.baseURL,emp);
  }

  envoieEmail(emp: ReparationVoiture){
    return this.http.post(this.baseURL+`/envoieMail`,emp);
  }

  insertVoitureReparation(rep: ReparVoiture) {
    return this.http.put(this.baseURL + `/insertVoiture`, rep);
  }

  insertVoiture(rep: ReparationVoiture) {
    return this.http.post(this.baseURL + `/insertPersoVoiture`, rep);
  }
  listeVoiture(emp: ReparationVoiture){
    return this.http.put(this.baseURL + `/listeVoiturePerso`,emp);
  }
  depannerVoiture(voiture: Voiture){
    return this.http.put(this.baseURL + `/depanage`,voiture);
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

  
}
