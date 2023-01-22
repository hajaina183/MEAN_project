import { Component, OnInit } from '@angular/core';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { ReparVoiture } from '../shared/reparVoiture/repar-voiture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ReparVoitureService } from '../shared/reparVoiture/repar-voiture.service';
import { Client } from '../shared/client/client.model';
import { MarqueVoiture } from '../shared/marqueVoiture/marque-voiture.model';
import { MarqueVoitureService } from '../shared/marqueVoiture/marque-voiture.service';


@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css'],
  providers: [
    ReparationVoitureService,
    ReparVoitureService,
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
  numero!: string;
  marqueVoitureList: any = [];


  constructor(private reparatVoitureService: ReparVoitureService,private marqueVoitureService: MarqueVoitureService) { }

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
  
      this.email= JSON.stringify(clientLS.email);
      this.nom =  JSON.stringify(clientLS.nom);
      this.prenom =  JSON.stringify(clientLS.prenom);
      this.adresse =  JSON.stringify(clientLS.adresse);
      this.tel = JSON.stringify(clientLS.tel);
      console.log(clientLS.email);
  }

  insertVoitureClient(){
    var cli = new ReparVoiture();
    cli.nom = this.nom;
    cli.email = this.email;
    cli.modele = this.marque;
    cli.numero = this.numero;
    this.reparatVoitureService.insertVoiture2(cli).subscribe((res) => {
      if(res) {
        console.log("vita");
      } else {
        alert("Tsy mety ");
      }
    })
  }

  
  
}
