/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelescopeKeplerComponent } from './telescope-kepler.component';

describe('TelescopeKeplerComponent', () => {
  let component: TelescopeKeplerComponent;
  let fixture: ComponentFixture<TelescopeKeplerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeKeplerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeKeplerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
