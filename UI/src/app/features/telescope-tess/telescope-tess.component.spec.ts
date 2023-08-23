/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelescopeTessComponent } from './telescope-tess.component';

describe('TelescopeTessComponent', () => {
  let component: TelescopeTessComponent;
  let fixture: ComponentFixture<TelescopeTessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeTessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeTessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
