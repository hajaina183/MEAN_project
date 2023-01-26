import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderPaiementComponent } from './valider-paiement.component';

describe('ValiderPaiementComponent', () => {
  let component: ValiderPaiementComponent;
  let fixture: ComponentFixture<ValiderPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
