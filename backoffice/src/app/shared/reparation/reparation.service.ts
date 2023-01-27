import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reparation } from './reparation.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  selectedReparation: Reparation;
  reparations: Reparation[];
  readonly baseURL = `${environment.base_url}reparation`;

  constructor(private http: HttpClient) { }

  postReparation(rep: Reparation) {
    return this.http.post(this.baseURL, rep);
  }

  getReparationList() {
    return this.http.get(this.baseURL);
  }

  getReparationListModele(modele: String) {
    return this.http.get(this.baseURL + `/${modele}`);
  }

  putReparation(rep: Reparation) {
    return this.http.put(this.baseURL + `/${rep._id}`, rep);
  }

  deleteReparation(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
