import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModalDialogComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserModalDialogComponent;
  let fixture: ComponentFixture<UserModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
