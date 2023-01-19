import { TestBed } from '@angular/core/testing';

import { ReparationVoitureService } from './reparation-voiture.service';

describe('ReparationVoitureService', () => {
  let service: ReparationVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReparationVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
