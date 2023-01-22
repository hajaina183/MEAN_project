import { Component, OnInit } from '@angular/core';
import { Depense } from '../shared/depense/depense.model';
import { DepenseService } from '../shared/depense/depense.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {
  annee = [];
  mois = [
    "janvier",
    "fevrier",
    "mars",
    "avril",
    "mey",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre"
  ]
  selectedMois = "Mois";
  selectedAnnee = "Année";

  salaire!: number;
  loyer!: number;
  piece!: number;
  autres!: number;

  constructor(
    public depenseService: DepenseService,
  ) { }

  ngOnInit(): void {
    for(var i = 2000, l = 2100; i < l; i++) {
      this.annee.push(i);
    }

    this.getDepenses();
  }

  getDepenses() {
    this.depenseService.getDepenseList().subscribe((res) => {
      this.depenseService.depenses = res as Depense[];
    });
  }

  updateMois(e){
    this.selectedMois = e.target.value
  }

  updateAnnee(e){
    this.selectedAnnee = e.target.value
  }

  enregistrer() {
    var depense = new Depense();
    depense.mois = this.selectedMois;
    depense.annee = this.selectedAnnee;
    depense.salaire = this.salaire;
    depense.loyer = this.loyer;
    depense.piece = this.piece;
    depense.autres = this.autres;
    this.depenseService.postDepense(depense).subscribe((res) => {
      if(res) {
        console.log(res);
        this.getDepenses();
      }
    });
  }

}
