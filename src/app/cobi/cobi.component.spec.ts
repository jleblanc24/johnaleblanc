import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobiComponent } from './cobi.component';

describe('CobiComponent', () => {
  let component: CobiComponent;
  let fixture: ComponentFixture<CobiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
