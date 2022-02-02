import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFhirjsComponent } from './ng-fhirjs.component';

describe('NgFhirjsComponent', () => {
  let component: NgFhirjsComponent;
  let fixture: ComponentFixture<NgFhirjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFhirjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFhirjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
