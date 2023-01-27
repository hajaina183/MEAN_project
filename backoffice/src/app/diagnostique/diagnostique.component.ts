import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../shared/admin/admin.model';
import { Reparation } from '../shared/reparation/reparation.model';
import { ReparationService } from '../shared/reparation/reparation.service';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { Voiture } from '../shared/reparationVoiture/voiture.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-diagnostique',
  templateUrl: './diagnostique.component.html',
  styleUrls: ['./diagnostique.component.scss']
})
export class DiagnostiqueComponent implements OnInit {
  modele!: string;
  numero!: string;
  client!: string;
  reponse!: any;
  quantite!: number;
  typeRep!: string;
  prixRep!: number;

  constructor(
    public reparationService: ReparationService,
    public reparationVoitureService: ReparationVoitureService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.modele = params.modele;
        this.numero = params.numero;
        this.client = params.client;
      }
    );

    this.reparationService.getReparationListModele(this.modele).subscribe((res) => {
      this.reparationService.reparations = res as Reparation[];
    });

    this.getReparations();
    
  }

  getReparations() {
    this.reparationVoitureService.voiture = new Voiture();
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

  allowDrop(ev) {
    ev.preventDefault();
  }

  dateNow() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconde = date.getSeconds();
    let currentDate = `${year}-${month}-${day} ${hour}:${minute}:${seconde}`;
    return currentDate;
  }

  drag(type, prix) {
    this.typeRep = type;
    this.prixRep = prix;
    
  }

  drop(ev,content) {
    ev.preventDefault();
    console.log("drop");
    console.log("type : "+this.typeRep);
    var repVoiture = new Voiture();
    repVoiture.modele = this.modele;
    repVoiture.numero = this.numero;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'dialog-centered'
    }).result.then(async (result) => {
        if(this.reparationVoitureService.voiture.reparation === undefined) {
          this.reparationVoitureService.insertVoitureReparation(repVoiture,this.dateNow(),this.typeRep,this.prixRep,this.quantite).subscribe((res) => {
            if(res) {
              this.getReparations();
            }
          });
        } else {
          var signe = 0;
          for(var i = 0, l = this.reparationVoitureService.voiture.reparation.length; i < l; i++) {
            var rep = this.reparationVoitureService.voiture.reparation[i];
            if(rep.type == this.typeRep && rep.prix == this.prixRep) {
              signe = 1;
              this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Reparation '+this.typeRep+' en cours', '', {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: 'toast-top-center'
              });
            } 
          }
          if(signe == 0) {
            this.reparationVoitureService.insertVoitureReparation(repVoiture,this.dateNow(),this.typeRep,this.prixRep,this.quantite).subscribe((res) => {
              if(res) {
                this.getReparations();
              }
            });
          }
        }
    });
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
  }

  terminer(date, type) {
    var repVoiture = new Voiture();
    repVoiture.modele = this.modele;
    repVoiture.numero = this.numero;
    this.reparationVoitureService.terminerReparation(repVoiture,date,type).subscribe((res) => {
      if(res) {
        this.getReparations();
      }
    });
  }

  openModal(content){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'dialog-centered'
    }).result.then(async (result) => {
      console.log("Action when modal is closed !");
    });
  }
}
