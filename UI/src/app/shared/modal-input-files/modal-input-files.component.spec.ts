import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInputFilesComponent } from './modal-input-files.component';

describe('ModalInputFilesComponent', () => {
  let component: ModalInputFilesComponent;
  let fixture: ComponentFixture<ModalInputFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInputFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInputFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
