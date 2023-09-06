import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellComponent } from './sell.component';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Price } from 'src/app/models/price.model';

@Component({
  selector: 'app-nav',
  template: 'mock nav'
  })
  class MockNavComponent {
   @Input()
   email:string=''
  }


describe('SellComponent', () => {
  let component: SellComponent;
  let fixture: ComponentFixture<SellComponent>;
  let price:Price[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellComponent, MockNavComponent ],
      imports:[RouterTestingModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: price}]

    })
    .compileComponents();

    fixture = TestBed.createComponent(SellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
