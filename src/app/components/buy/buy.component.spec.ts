import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyComponent } from './buy.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Price } from 'src/app/models/price.model';
import { FormsModule, NgModel } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Instrument } from 'src/app/models/instrument.model';




describe('BuyComponent', () => {
  const price:Price[] =[{
    "askPrice": 104.75,
    "bidPrice": 104.25,
    "priceTimestamp": "21-AUG-19 10.00.01.042000000 AM GMT",
    "instrument": {
    "instrumentId": "N123456",
    "externalIdType": "CUSIP",
    "externalId": "46625H100",
    "categoryId": "STOCK",
    "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
    "maxQuantity": 1000,
    "minQuantity": 1
    }
    },
    {
    "askPrice": 312500,
    "bidPrice": 312000,
    "priceTimestamp": "21-AUG-19 05.00.00.040000000 AM -05:00",
    "instrument": {
    "instrumentId": "N123789",
    "externalIdType": "ISIN",
    "externalId": "US0846707026",
    "categoryId": "STOCK",
    "instrumentDescription": "Berkshire Hathaway Inc. Class A",
    "maxQuantity": 10,
    "minQuantity": 1
    }
    },
  ]
  const instrument:Instrument[]=[{
    "instrumentId": "N123789",
    "externalIdType": "ISIN",
    "externalId": "US0846707026",
    "categoryId": "STOCK",
    "instrumentDescription": "Berkshire Hathaway Inc. Class A",
    "maxQuantity": 10,
    "minQuantity": 1
    }]
  let component: BuyComponent;
  let fixture: ComponentFixture<BuyComponent>;
  let email:string=''
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyComponent ],
      imports:[RouterTestingModule, FormsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: price}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
