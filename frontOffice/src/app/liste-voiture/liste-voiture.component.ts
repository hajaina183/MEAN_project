import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../shared/client/client.model';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { Voiture } from '../shared/reparationVoiture/voiture.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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

  constructor(public reparationVoitureService: ReparationVoitureService,private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

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
      if(res) {
        var repV = res as ReparationVoiture[];
        for(var i = 0; i< repV[0].voiture.length; i++) {
          var daba = new Voiture();
          daba.modele = repV[0].voiture[i].modele;
          daba.numero = repV[0].voiture[i].numero;
          daba.diagnostique = repV[0].voiture[i].diagnostique;
          daba.reparation = repV[0].voiture[i].reparation;
          if(repV[0].voiture[i].reparation !== undefined) {
            var yes = 0;
            var no = 0;
            for(var j = 0; j< repV[0].voiture[i].reparation.length; j++) {
              var reparation = repV[0].voiture[i].reparation[j];
                if(reparation.etat == 1) { yes++; }
                else if(reparation.etat == 0) { no++; }
            }
            var pourcentage = Math.round((100 * yes) / repV[0].voiture[i].reparation.length);
            daba.pourcentage = pourcentage;
          }
          this.reparationVoitureService.voitures.push(daba);
        }
      } else {
        alert("Tsy mety ");
      }
    })
  }

  
  depanner(modele,numero){
    //console.log("depanner : "+modele);
    var repVoiture = new Voiture();
    
    //console.log("modele "+modele);
    repVoiture.modele = modele;
    //console.log("numero "+numero);
    repVoiture.numero = numero;
    this.reparationVoitureService.depannerVoiture(repVoiture).subscribe((res) => {
      if(res) {
        this.listeVoiture();
      }
    });
  }

  recuperer(modele,numero){
    //console.log("depanner : "+modele);
    var recupVoiture = new Voiture();
    
    //console.log("modele "+modele);
    recupVoiture.modele = modele;
    //console.log("numero "+numero);
    recupVoiture.numero = numero;
    this.reparationVoitureService.recupererVoiture(recupVoiture).subscribe((res:any) => {
      if(res) {
        console.log(res);
        this.showToast(res?.message)
        this.listeVoiture();
      }
    });
  }

  chercher(){
    this.reparationVoitureService.voitures = [];
    var voiture = new Voiture();
    voiture.numero = this.numero;
    console.log(this.numero);
    this.reparationVoitureService.chercher(voiture).subscribe((res) => {
      if(res) {
        console.log(res);
        var daba = new Voiture();
        var repV = res as ReparationVoiture;
        daba.modele = repV[0].voiture.modele;
        daba.numero = repV[0].voiture.numero;
        daba.diagnostique = repV[0].voiture.diagnostique;
        daba.reparation = repV[0].voiture.reparation;
        if(repV[0].voiture.reparation !== undefined) {
          var yes = 0;
          var no = 0;
          for(var j = 0; j< repV[0].voiture.reparation.length; j++) {
            var rep = repV[0].voiture.reparation[j];
              if(rep.etat == 1) { yes++; }
              else if(rep.etat == 0) { no++; }
          }
          var pourcentage = Math.round((100 * yes) / repV[0].voiture.reparation.length);
          daba.pourcentage = pourcentage;
        }
        this.reparationVoitureService.voitures.push(daba);
        
      }
      
    });
  }

  showToast(message){
    this.toastr.success(`<span class="now-ui-icons ui-1_bell-53">${message}</span> `, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert",
      positionClass: 'toast-bottom-center'
    });
  }

}
