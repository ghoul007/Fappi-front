import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FappiNgMediaComponent} from './fappi-ng-media.component';

describe('FappiNgMediaComponent', () => {
  let component: FappiNgMediaComponent;
  let fixture: ComponentFixture<FappiNgMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FappiNgMediaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FappiNgMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
