/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelescopeK2Component } from './telescope-k2.component';

describe('TelescopeK2Component', () => {
  let component: TelescopeK2Component;
  let fixture: ComponentFixture<TelescopeK2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeK2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeK2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
