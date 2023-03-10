import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client/client.service';
import { Client } from '../shared/client/client.model';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [
    ClientService,
    ReparationVoitureService
  ]
})
export class InscriptionComponent implements OnInit {
  name!: string;
  lastName!: string;
  adresse!: string;
  tel!: string;
  email!: string;
  mdp!: string;
  clientResponse!: any;
  constructor(
    private clientService: ClientService,
    private reparationVoitureService: ReparationVoitureService, 
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.email = "hajainarafenoherilala@gmail.com";
    this.mdp = "hajaina";
  }

  traitementIscription() {
    console.log("atooooooo");
    var cli = new Client();
    cli.nom = this.name;
    cli.prenom = this.lastName;
    cli.adresse = this.adresse;
    cli.tel = this.tel;
    cli.email = this.email;
    cli.mdp = this.mdp;

    var reparationVoiture = new ReparationVoiture();
    reparationVoiture.nom = this.name;
    reparationVoiture.prenom = this.lastName;
    reparationVoiture.adresse = this.adresse;
    reparationVoiture.tel = this.tel;
    reparationVoiture.email = this.email;



    this.clientService.postClient(cli).subscribe((res) => {
      console.log("itaooooo");
      if(res) {
        console.log("ouiiiii");
        this.reparationVoitureService.insertVoiture(reparationVoiture).subscribe((res)=> {
          if(res) {
            console.log("atoo");
            //this.router.navigate(['../pagedirigeant']);
            this.clientService.envoieEmail(cli).subscribe((res) => {
              //this.router.navigate(['../pagedirigeant']);
              if(res) {
                console.log("tongaaaaaa");
                this.router.navigate(['../pagedirigeant']);
              }
            })
          }
        })
      } else {
        alert("Compte introuvable");
      }
    })
  }

  traitementLogin() {
    console.log("atooooooo");
    var cli = new Client();
    cli.email = this.email;
    cli.mdp = this.mdp;
    this.clientService.traitementLogin(cli).subscribe((res) => {
      if(res) {
        localStorage.setItem('email',cli.email)
        this.clientResponse = res;
        // set local storage
        localStorage.setItem('adminSession', JSON.stringify(this.clientResponse));
        //console.log(this.clientResponse._id);
        this.router.navigate(['../liste-voiture']);
      } else {
        //.showToast("Compte introuvable");
        /*this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Compte introuvable', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-top-center'
        });*/
        alert("Compte introuvable");
      }
    })
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
