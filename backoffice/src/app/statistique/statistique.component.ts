import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { CommonService } from '../services/common.service';
import { ReparationVoitureService } from '../shared/reparationVoiture/reparation-voiture.service';
import { ReparationVoiture } from '../shared/reparationVoiture/reparationVoiture.model';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  public chart: any;
  reponse!: any;
  dateDebut = [];
  dateFin = [];
  diffDate = [];
  sommeTemps ; 
  sommeTempsParVoiture = 0;
  moyenneReparation = 0 ; 
  prixTotal = [] ;
  jours = [] ;
  datePaiement = [] ;
  lundi = 0 ;
  mardi = 0 ;
  mercredi = 0 ;
  jeudi = 0; 
  vendredi = 0 ;
  samedi = 0 ;
  dimanche = 0 ; 
  constructor(public reparationVoitureService: ReparationVoitureService,
    private common : CommonService) { }

  ngOnInit(): void {
    //this.createChart();
    this.getValeur();
    this.getChiffreAffaire()
    //this.calculateDiff("2023-1-23 20:46:46","2023-1-24 21:46:46");
  }

  calculateDiff(data1,data2){
    let date1 = new Date(data1);
    let date2 = new Date(data2);
    let days = (((date1.getTime() - date2.getTime()) / 1000 )/3600)*-1;
    console.log("minutes " + days*60);
    return days;
  }

  getValeur(){
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
         // console.log(comm);
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            console.log("tailleVoiture " + comm.voiture.length);
            var d = comm.voiture[j];
           if(d.reparation !== undefined) {
              for(var p = 0, lll = d.reparation.length; p < lll; p++){
                console.log("date debut  "+d.reparation[p].dateFin);
                console.log("date Fin  "+d.reparation[p].dateFin);
                console.log("...........................");
                if(d.reparation[p].dateFin !== undefined || d.reparation[p].daty == undefined ){
                    this.dateDebut[p] = new Date(d.reparation[p].daty);
                    this.dateFin[p] = new Date(d.reparation[p].dateFin);
                    this.diffDate[p] = (((this.dateDebut[p].getTime() - this.dateFin[p].getTime()) / 1000 )/3600)*-1
                    console.log("minutesDiff [ " +p +" ]" + this.diffDate[p]);
                    console.log("type  " , typeof this.diffDate[p]);
                    this.sommeTempsParVoiture = this.sommeTempsParVoiture+this.diffDate[p] ; 
                }
              
                
              }
           }
          }
          //console.log("fffffffffffff "+this.sommeTempsParVoiture);
          this.moyenneReparation = Math.round((this.sommeTempsParVoiture/comm.voiture.length)*100 ) / 100 ;
        }
      } else {
        alert("error");
      }
    })
  }

  getChiffreAffaire(){
    this.reparationVoitureService.getRepartionVoitureList().subscribe((res) => {
      if(res) {
        this.reponse = res;
        
        for (var i = 0, l = this.reponse.length; i < l; i++) {
          var comm = this.reponse[i];
         // console.log(comm);
          for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
            console.log("tailleVoiture " + comm.voiture.length);
            var d = comm.voiture[j];
           if(d.reparation !== undefined) {
              for(var p = 0, lll = d.reparation.length; p < lll; p++){
                if(d.reparation[p].dateFin !== undefined || d.reparation[p].daty == undefined ){
                  if(d.reparation[p].paye == 2 ){
                    this.datePaiement[p] = new Date(d.reparation[p].datePaiement);
                    this.prixTotal[p] = d.reparation[p].prix * d.reparation[p].quantite ;
                    this.jours[p] = this.datePaiement[p].getDay(); 
                    console.log("jour " + this.jours[p]);
                    console.log("prixTotal " +this.prixTotal[p]); 
                    console.log("...........................");
                    if(this.jours[p] == 0){
                      this.lundi = this.lundi + this.prixTotal[p] ;
                    }
                    if(this.jours[p] == 1){
                      this.mardi = this.mardi + this.prixTotal[p] ;
                    }
                    if(this.jours[p] == 2){
                      this.mercredi = this.mercredi + this.prixTotal[p] ;
                    }
                    if(this.jours[p] == 3){
                      this.jeudi = this.jeudi+ this.prixTotal[p] ;
                    }
                    if(this.jours[p] == 4){
                      this.vendredi = this.vendredi + this.prixTotal[p] ;
                    }
                    if(this.jours[p] == 5){
                      this.samedi = this.samedi + this.prixTotal[p] ;
                    }
                    if(this.jours[p] == 6){
                      this.dimanche = this.dimanche + this.prixTotal[p] ;
                    }
                  }
                  
                  
              }
            }
           }
          
          }
          
        }
        /*console.log("total Lundi " + this.lundi);
        console.log("total Mardi " + this.mardi);
        console.log("total Mer " + this.mercredi);
        console.log("total Jeu " + this.jeudi);
        console.log("total vend " + this.vendredi);
        console.log("total Same " + this.samedi);
        console.log("total diam " + this.dimanche);*/
        this.chart = new Chart("MyChart", {
          type: 'bar', //this denotes tha type of chart
    
          data: {// values on X-Axis
            labels: ['Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi', 'Samedi', 'Dimanche'], 
             datasets: [
              {
                label: "Chiffre d’affaires par jour",
                data: [this.lundi,this.mardi, this.mercredi, this.jeudi, this.vendredi,this.samedi, this.dimanche],
                backgroundColor: 'blue'
              }
              
            ]
          },
          options: {
            aspectRatio:2.5
          }
          
        });

      } else {
        alert("error");
      }
    })

  }


}
