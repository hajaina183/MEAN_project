import { TestBed } from '@angular/core/testing';

import { MarqueVoitureService } from './marque-voiture.service';

describe('MarqueVoitureService', () => {
  let service: MarqueVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarqueVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
