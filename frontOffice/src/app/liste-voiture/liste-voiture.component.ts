import { Component, OnInit } from '@angular/core';
import { Client } from '../shared/client/client.model';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';

@Component({
  selector: 'app-liste-voiture',
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.css']
})
export class ListeVoitureComponent implements OnInit {

  email! : string;
  nom!: string;
  prenom!: string;
  adresse! : string;
  tel!: string;
  marque!: string;
  numero!: string;
  voitureList: any = [];

  constructor(public reparationVoitureService: ReparationVoitureService) { }

  ngOnInit(): void {

    var clientLS = new Client();
    var adminJSON = localStorage.getItem('adminSession');
    clientLS = adminJSON && JSON.parse(adminJSON);

    var reparationVoiture = new ReparationVoiture();


    reparationVoiture.email= JSON.stringify(clientLS.email).replace(/"/g, '');
    reparationVoiture.nom =  JSON.stringify(clientLS.nom).replace(/"/g, '');
 

    this.reparationVoitureService.listeVoiture(reparationVoiture).subscribe((res) => {
      console.log("lasaadla ty tenq  marina haha ");
      if(res) {
        var repV = res as ReparationVoiture[];
        console.log(repV[0].nom);
        for(var i = 0; i< repV[0].voiture.length; i++) {
          console.log("voiture : "+repV[0].voiture[i]);
          this.reparationVoitureService.voitures.push(repV[0].voiture[i]);
          // le bouton aleo tode mitambatra ao @ etat io, tsy misy hoe libre tsouny zany fa tode ao le bouton
        }
        console.log(this.reparationVoitureService.voitures);
      } else {
        alert("Tsy mety ");
      }
    })



  }

}
