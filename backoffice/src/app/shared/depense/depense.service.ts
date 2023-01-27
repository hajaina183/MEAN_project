import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from './depense.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  selectedDepense: Depense;
  depenses: Depense[];
  readonly baseURL = `${environment.base_url}depense`;

  constructor(private http: HttpClient) { }

  postDepense(dep: Depense) {
    return this.http.post(this.baseURL, dep);
  }

  getDepenseList() {
    return this.http.get(this.baseURL);
  }

  putDepense(dep: Depense) {
    return this.http.put(this.baseURL + `/${dep._id}`, dep);
  }

  deleteDepense(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
