import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ReparationPaiement } from '../shared/reparationVoiture/reparationPaiement.model';
import { Voiture } from '../shared/reparationVoiture/voiture.model';

@Component({
  selector: 'app-valider-sortie',
  templateUrl: './valider-sortie.component.html',
  styleUrls: ['./valider-sortie.component.scss']
})
export class ValiderSortieComponent implements OnInit {
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
    this.reparationVoitureService.voitures = [];
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            var d = comm.voiture[j];
            console.log(d);
            if(d.diagnostique == 3) {
              this.reparationVoitureService.voitures.push(d);
            }
          }
        }
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
      var numero = type[i];
      var voiture = new Voiture();
      voiture.numero = numero;
      this.reparationVoitureService.validerSortie(voiture).subscribe((res) => {
        if(res) {
          console.log("res : "+res);
          this.getReparations();
        }
      });
    }
  }

}
