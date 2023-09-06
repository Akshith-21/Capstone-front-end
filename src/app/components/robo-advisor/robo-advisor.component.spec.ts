import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoboAdvisorComponent } from './robo-advisor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Price } from 'src/app/models/price.model';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-nav',
  template: 'mock nav'
  })
  class MockNavComponent {
   @Input()
   email:string =''
  }
describe('RoboAdvisorComponent', () => {
  let component: RoboAdvisorComponent;
  let fixture: ComponentFixture<RoboAdvisorComponent>;
  let price: Price[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoboAdvisorComponent,MockNavComponent],
      imports:[RouterTestingModule,MatDialogModule],
      providers:[{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: price }]


    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
