import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../shared/client/client.model';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { Voiture } from '../shared/reparationVoiture/voiture.model';
import { ActivatedRoute } from '@angular/router';


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
  modele!: string;
  numero!: string;
  voitureList: any = [];

  constructor(public reparationVoitureService: ReparationVoitureService,private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.listeVoiture();
    

  }

  listeVoiture(){
    this.reparationVoitureService.voitures = [];
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

  
  depanner(modele,numero){
    console.log("depanner : "+modele);
    var repVoiture = new Voiture();
    
    console.log("modele "+modele);
    repVoiture.modele = modele;
    console.log("numero "+numero);
    repVoiture.numero = numero;
    this.reparationVoitureService.depannerVoiture(repVoiture).subscribe((res) => {
      if(res) {
        this.listeVoiture();
      }
    });
  }

}
