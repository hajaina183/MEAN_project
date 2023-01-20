import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reparation } from '../shared/reparation/reparation.model';
import { ReparationService } from '../shared/reparation/reparation.service';

@Component({
  selector: 'app-diagnostique',
  templateUrl: './diagnostique.component.html',
  styleUrls: ['./diagnostique.component.scss']
})
export class DiagnostiqueComponent implements OnInit {

  constructor(
    public reparationService: ReparationService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.reparationService.getReparationList().subscribe((res) => {
      this.reparationService.reparations = res as Reparation[];
    });
    this.route.queryParams.subscribe(params => {
        console.log(params);
      }
    );
  }

}
