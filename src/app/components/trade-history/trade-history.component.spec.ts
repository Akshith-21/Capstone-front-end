import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeHistoryComponent } from './trade-history.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
describe('TradeHistoryComponent', () => {
  let component: TradeHistoryComponent;
  let fixture: ComponentFixture<TradeHistoryComponent>;
 let price :Price[]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeHistoryComponent,MockNavComponent],
      imports:[RouterTestingModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: price }]

    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
