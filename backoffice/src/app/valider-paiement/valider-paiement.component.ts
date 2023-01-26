import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reparation } from '../shared/reparation/reparation.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ReparationPaiement } from '../shared/reparationVoiture/reparationPaiement.model';
import { Voiture } from '../shared/reparationVoiture/voiture.model';

@Component({
  selector: 'app-valider-paiement',
  templateUrl: './valider-paiement.component.html',
  styleUrls: ['./valider-paiement.component.scss']
})
export class ValiderPaiementComponent implements OnInit {
  reponse!: any;
  form!: FormGroup;

  constructor(
    public reparationVoitureService: ReparationVoitureService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    });
   }

  ngOnInit(): void {
    this.getReparations();
  }

  getReparations() {
    this.reparationVoitureService.reparationPaiement = [];
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            var d = comm.voiture[j];
            var revV = new Voiture();
            revV.reparation = d.reparation;
            if(d.reparation !== undefined) {
              for(var k=0; k < d.reparation.length; k++) {
                var r = d.reparation[k];
                if(r.paye == 1) {
                  var rept = new ReparationPaiement();
                  rept.daty = r.daty;
                  rept.dateFin = r.dateFin;
                  rept.etat = r.etat;
                  rept.paye = r.paye;
                  rept.prix = r.prix;
                  rept.type = r.type;
                  rept.numero = d.numero;
                  rept.datePaiement = r.datePaiement;
                  console.log(rept.paye);
                  this.reparationVoitureService.reparationPaiement.push(rept);
                }
              }
            }
          }
        }
        this.reparationVoitureService.reparationPaiement.sort(function compare(a, b) {
          if (a.datePaiement < b.datePaiement)
             return 1;
          if (a.datePaiement > b.datePaiement )
             return -1;
          return 0;
        });
      } else {
        alert("error");
      }
    });
  }

  onCheckboxChange(e) {
    const website: FormArray = this.form.get('website') as FormArray;
  
    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === e.target.value);
       website.removeAt(index);
    }
  }

  valider(){
    var type = this.form.value.website;
    for(var i=0; i < type.length; i++) {
      var s = type[i].split('_');
      var tp = s[0];
      var date = s[1];
      var numero = s[2]; //+ convert string to number
      var voiture = new Voiture();
      voiture.numero = numero;
      this.reparationVoitureService.validerPaiement(voiture,date,tp).subscribe((res) => {
        if(res) {
          console.log("res : "+res);
          this.getReparations();
        }
      });
    }
  }
  
}
