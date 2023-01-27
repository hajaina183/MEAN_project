import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReparationVoiture } from './reparationVoiture.model';
import { Voiture } from './voiture.model';
import { ReparationPaiement } from './reparationPaiement.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReparationVoitureService {
  reparationVoitures: ReparationVoiture[];
  voitures: Voiture[];
  voiture = new Voiture();
  reparationPaiement: ReparationPaiement[];
  
  readonly baseURL = `${environment.base_url}reparationVoiture`;

  constructor(private http: HttpClient) {
    this.reparationVoitures = [];
    this.voitures = [];
    this.reparationPaiement = [];
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

  insertVoitureReparation(voiture: Voiture,date: string,type: string,prix: number, qte: number) {
    return this.http.put(this.baseURL + `/insertVoitureReparation/${date}/${type}/${prix}/${qte}`, voiture);
  }

  terminerReparation(voiture: Voiture,date: string,type: string) {
    return this.http.put(this.baseURL + `/terminerReparation/${date}/${type}`, voiture);
  }

  validerPaiement(voiture: Voiture,date: string,type: string) {
    return this.http.put(this.baseURL + `/validerPaiement/${date}/${type}`, voiture);
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
