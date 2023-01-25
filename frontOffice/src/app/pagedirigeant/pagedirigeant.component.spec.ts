import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedirigeantComponent } from './pagedirigeant.component';

describe('PagedirigeantComponent', () => {
  let component: PagedirigeantComponent;
  let fixture: ComponentFixture<PagedirigeantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedirigeantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedirigeantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
