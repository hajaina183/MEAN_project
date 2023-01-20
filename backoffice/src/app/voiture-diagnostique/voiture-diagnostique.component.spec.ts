import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureDiagnostiqueComponent } from './voiture-diagnostique.component';

describe('VoitureDiagnostiqueComponent', () => {
  let component: VoitureDiagnostiqueComponent;
  let fixture: ComponentFixture<VoitureDiagnostiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureDiagnostiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureDiagnostiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
