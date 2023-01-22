import { Component, OnInit } from '@angular/core';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { Client } from '../shared/client/client.model';
import { MarqueVoiture } from '../shared/marqueVoiture/marque-voiture.model';
import { MarqueVoitureService } from '../shared/marqueVoiture/marque-voiture.service';
import { ReparVoiture } from '../shared/reparationVoiture/repar-voiture.model';
import { Console } from 'console';


@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css'],
  providers: [
    ReparationVoitureService,
    MarqueVoitureService
  ]
})
export class AjoutVoitureComponent implements OnInit {
  email! : string;
  nom!: string;
  prenom!: string;
  adresse! : string;
  tel!: string;
  marque!: string;
  selectedMarque: any;
  numero!: string;
  marqueVoitureList: any = [];

  constructor(private reparationVoitureService: ReparationVoitureService,private marqueVoitureService: MarqueVoitureService) { }

  ngOnInit(): void {
      var marqueVoiture = new MarqueVoiture();

      this.marqueVoitureService.getMarqueVoiture(marqueVoiture).subscribe((res) => {
        if(res) {
          this.marqueVoitureList = res;
          console.log(this.marqueVoitureList);
        } else {
          alert("Tsy mety ");
        }
      })

      var clientLS = new Client();
      var adminJSON = localStorage.getItem('adminSession');
      clientLS = adminJSON && JSON.parse(adminJSON);
  
      this.email= JSON.stringify(clientLS.email).replace(/"/g, '');
      this.nom =  JSON.stringify(clientLS.nom).replace(/"/g, '');
      this.prenom =  JSON.stringify(clientLS.prenom).replace(/"/g, '');
      this.adresse =  JSON.stringify(clientLS.adresse).replace(/"/g, '');
      this.tel = JSON.stringify(clientLS.tel).replace(/"/g, '');
  }

  insertVoitureClient(){
    var cli = new ReparVoiture();
    cli.nom = this.nom;
    cli.email = this.email;
    cli.modele = this.selectedMarque;
    cli.numero = this.numero;
    console.log(cli);
    this.reparationVoitureService.insertVoitureReparation(cli).subscribe((res) => {
      if(res) {
        console.log(res);
      } else {
        alert("Tsy mety ");
      }
    })
  }

  update(event){
    this.selectedMarque = event.target.value;
  }
  
}
