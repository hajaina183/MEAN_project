import { Component, OnInit } from '@angular/core';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';

import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { Voiture } from '../shared/reparationVoiture/voiture.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-voiture-diagnostique',
  templateUrl: './voiture-diagnostique.component.html',
  styleUrls: ['./voiture-diagnostique.component.scss']
})
export class VoitureDiagnostiqueComponent implements OnInit {
  listeVoiture!: String[];
  reponse!: any;

  constructor(
    public reparationVoitureService: ReparationVoitureService,
    private common : CommonService
    ) { }

  ngOnInit(): void {
    this.common.showSpinner();
    this.reparationVoitureService.reparationVoitures = [];
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            var d = comm.voiture[j];
            if(d.diagnostique == 2) {
              var revV = new ReparationVoiture();
              revV.nom = comm.nom;
              revV.voiture.push(d);
              this.reparationVoitureService.reparationVoitures.push(revV);
            }
          }
      }
      } else {
        alert("error");
      }
      setTimeout(()=>{
        this.common.hideSpinner();
      },2000)
    });
  }

}
