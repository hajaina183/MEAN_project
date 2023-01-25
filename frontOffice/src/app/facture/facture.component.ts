import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faC } from '@fortawesome/free-solid-svg-icons';
import { Facture } from '../shared/reparationVoiture/facture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  numero!: string;
  reste!: number;
  payer = 0;
  currentDate!: string;

  constructor(
    public reparationVoitureService: ReparationVoitureService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numero = params.numero;
      }
    );

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.currentDate = `${year}-${month}-${day}`;

    this.getFactures();
  }

  getFactures() {
    //this.payer = 0;
    var fact = new Facture();
    fact.numero = "4537 WWT";
    this.reparationVoitureService.getFacture(fact).subscribe((res) => {
      if(res) {
        var obj = JSON.parse(JSON.stringify(res));
        this.reparationVoitureService.facture._id = obj[0]._id;
        this.reparationVoitureService.facture.nom = obj[0].nom;
        this.reparationVoitureService.facture.prenom = obj[0].prenom;
        this.reparationVoitureService.facture.adresse = obj[0].adresse;
        this.reparationVoitureService.facture.email = obj[0].email;
        this.reparationVoitureService.facture.tel = obj[0].tel;
        this.reparationVoitureService.facture.voiture = obj[0].voiture;
        this.reparationVoitureService.facture.totalReparation = obj[0].totalReparation;
        this.reparationVoitureService.facture.nbrReparation = obj[0].nbrReparation;
        for(var i=0; i<this.reparationVoitureService.facture.voiture.reparation.length; i++) {
          var reparation = this.reparationVoitureService.facture.voiture.reparation[i];
          if(reparation.montantPaye === undefined) {
            reparation.montantPaye = 0;
          }
          this.payer = this.payer + +reparation.montantPaye;
        }
        this.reste = +this.reparationVoitureService.facture.totalReparation - this.payer;
        console.log("payer : "+this.payer);
        console.log("reste : "+this.reste);
      }
    });
  }

}
