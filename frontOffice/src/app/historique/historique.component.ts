import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'console';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { Voiture } from '../shared/reparationVoiture/voiture.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  modele!: string;
  numero!: string;
  reponse!: any;

  constructor( public reparationVoitureService: ReparationVoitureService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.modele = params.modele;
      this.numero = params.numero;
    }
    );
    this.getHistorique();
  }

  getHistorique() {
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            var d = comm.voiture[j];
            if(d.modele == this.modele && d.numero == this.numero) {
              //for (var k = 0, lll = d.reparation.length; k < lll; k++) {}
              var revV = new Voiture();
              revV.modele = d.modele;
              revV.numero = d.numero;
              revV.diagnostique = d.diagnostique;
              revV.reparation = d.reparation;
              this.reparationVoitureService.voiture = revV;
            }
          }
      }
      } else {
        alert("error");
      }
    });
  }
    
}
