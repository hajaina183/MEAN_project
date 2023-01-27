import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';


import { Admin } from './admin.model';

@Injectable()
export class AdminService {
  selectedAdmin: Admin;
  admins: Admin[];
  readonly baseURL = `${environment.base_url}admin`;

  constructor(private http: HttpClient) { }

  postAdmin(emp: Admin) {
    return this.http.post(this.baseURL, emp);
  }

  traitementLoginAdmin(emp: Admin) {
    return this.http.post(this.baseURL + `/traitementLogin`, emp);
  }

  getAdminList() {
    return this.http.get(this.baseURL);
  }

  putAdmin(emp: Admin) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteAdmin(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
