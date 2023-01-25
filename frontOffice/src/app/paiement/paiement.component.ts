import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { Voiture } from '../shared/reparationVoiture/voiture.model';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  numero!: string;
  reponse!: any;
  form: FormGroup;

  constructor(
    public reparationVoitureService: ReparationVoitureService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numero = params.numero;
      }
    );
    this.getReparations();
  }

  getReparations() {
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            var d = comm.voiture[j];
            if(d.numero == this.numero) {
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

  onCheckboxChange(e) {
    const website: FormArray = this.form.get('website') as FormArray;
  
    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === e.target.value);
       website.removeAt(index);
    }
  }

  payer(){
    var type = this.form.value.website;
    for(var i=0; i < type.length; i++) {
      var s = type[i].split('_');
      var tp = s[0];
      var date = s[1];
      var prix = +s[2]; //+ convert string to number
      var voiture = new Voiture();
      voiture.numero = this.numero;
      this.reparationVoitureService.payer(voiture,date,tp,prix).subscribe((res) => {
        if(res) {
          this.getReparations();
        }
      });
    }
  }

}
