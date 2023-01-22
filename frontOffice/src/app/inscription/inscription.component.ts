import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client/client.service';
import { Client } from '../shared/client/client.model';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [
    ClientService,
    ReparationVoitureService
  ]
})
export class InscriptionComponent implements OnInit {
  name!: string;
  lastName!: string;
  adresse!: string;
  tel!: string;
  email!: string;
  mdp!: string;
  clientResponse!: any;
  constructor(private clientService: ClientService,private reparationVoitureService: ReparationVoitureService, private router: Router) { }

  ngOnInit(): void {
  }

  traitementIscription() {
    console.log("atooooooo");
    var cli = new Client();
    cli.nom = this.name;
    cli.prenom = this.lastName;
    cli.adresse = this.adresse;
    cli.tel = this.tel;
    cli.email = this.email;
    cli.mdp = this.mdp;

    var reparationVoiture = new ReparationVoiture();
    reparationVoiture.nom = this.name;
    reparationVoiture.prenom = this.lastName;
    reparationVoiture.adresse = this.adresse;
    reparationVoiture.tel = this.tel;
    reparationVoiture.email = this.email;



    this.clientService.postClient(cli).subscribe((res) => {
      if(res) {
        console.log("ouiiiii");
        this.reparationVoitureService.insertVoiture(reparationVoiture).subscribe((res)=> {
          if(res) {
            console.log("atoo");
            this.clientService.envoieEmail(cli).subscribe((res) => {
            console.log("tongaaaaaa");
          })
        }
       })
      } else {
        alert("Compte introuvable");
      }
    })
  }

  traitementLogin() {
    console.log("atooooooo");
    var cli = new Client();
    cli.email = this.email;
    cli.mdp = this.mdp;
    this.clientService.traitementLogin(cli).subscribe((res) => {
      if(res) {
        localStorage.setItem('email',cli.email)
        this.clientResponse = res;
        // set local storage
        localStorage.setItem('adminSession', JSON.stringify(this.clientResponse));
        //console.log(this.clientResponse._id);
        this.router.navigate(['../navbar']);
      } else {
        alert("Compte introuvable")
      }
    })
  }

}
