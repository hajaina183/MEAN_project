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
  constructor(public reparationVoitureService: ReparationVoitureService,
    private common : CommonService) { }

  ngOnInit(): void {
    //this.createChart();
    this.getValeur();
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
                this.dateDebut[p] = new Date(d.reparation[p].daty);
                this.dateFin[p] = new Date(d.reparation[p].dateFin);
                this.diffDate[p] = (((this.dateDebut[p].getTime() - this.dateFin[p].getTime()) / 1000 )/3600)*-1
                console.log("minutesDiff [ " +p +" ]" + this.diffDate[p]);
                console.log("type  " , typeof this.diffDate[p]);
                this.sommeTempsParVoiture = this.sommeTempsParVoiture+this.diffDate[p] ; 
              }
              
              
           }
           
          }
          console.log("fffffffffffff "+this.sommeTempsParVoiture);
          this.moyenneReparation = Math.round((this.sommeTempsParVoiture/comm.voiture.length)*100 ) / 100 ;
         
          
        
          
        }
        /**/

      } else {
        alert("error");
      }
    })
}

  /*createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: [467,576, 572, 79, 92,574, 573, 576],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: [542, 542, 536,327,17,0.00,538,541],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }*/

}
