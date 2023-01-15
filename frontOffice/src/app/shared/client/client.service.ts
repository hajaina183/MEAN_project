import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client.model';

@Injectable()
export class ClientService {
  selectedClient: Client;
  clients: Client[];
  
  readonly baseURL = 'http://localhost:3000/client';

  constructor(private http: HttpClient) { }

  postClient(emp: Client) {
    return this.http.post(this.baseURL,emp);
  }

  envoieEmail(emp: Client){
    return this.http.post(this.baseURL+`/envoieMail`,emp);
  }

  traitementLogin(emp: Client) {
    return this.http.post(this.baseURL + `/traitementLogin`, emp);
  }

  putClient(emp: Client) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteClient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
