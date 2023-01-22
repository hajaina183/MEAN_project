import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';

@Component({
  selector: 'app-voiture-garage',
  templateUrl: './voiture-garage.component.html',
  styleUrls: ['./voiture-garage.component.scss']
})
export class VoitureGarageComponent implements OnInit {
  reponse!: any;
  
  constructor(
    public reparationVoitureService: ReparationVoitureService,
    private common : CommonService
  ) { }

  ngOnInit(): void {
    this.common.showSpinner();
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            var d = comm.voiture[j];
            if(d.diagnostique == 1) {
              var revV = new ReparationVoiture();
              revV.nom = comm.nom;
              revV.voiture.push(d);
              var yes = 0;
              var no = 0;
              for(var k = 0, lll = d.reparation.length; k < lll; k++) {
                var reparation = d.reparation[k];
                if(reparation.etat == 1) { yes++; }
                else if(reparation.etat == 0) { no++; }
              }
              var pourcentage = Math.round((100 * yes) / d.reparation.length);
              revV.pourcentage = pourcentage;
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
