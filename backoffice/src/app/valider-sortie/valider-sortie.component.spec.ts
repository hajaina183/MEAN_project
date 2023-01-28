import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderSortieComponent } from './valider-sortie.component';

describe('ValiderSortieComponent', () => {
  let component: ValiderSortieComponent;
  let fixture: ComponentFixture<ValiderSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
