import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentDetailComponent } from './entertainment-detail.component';

describe('EntertainmentDetailComponent', () => {
  let component: EntertainmentDetailComponent;
  let fixture: ComponentFixture<EntertainmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
