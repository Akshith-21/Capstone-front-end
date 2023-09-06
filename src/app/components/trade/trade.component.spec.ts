import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeComponent } from './trade.component';
import { Price } from 'src/app/models/price.model';
import { of } from 'rxjs';
import { FmtsService } from 'src/app/services/fmts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  template: 'mock nav'
  })
  class MockNavComponent {
   @Input()
   email:string =''
  }

describe('TradeComponent', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;
  let price:Price[]

  beforeEach(async () => {
    const fmtsMockData: Price[] =[
      {
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
        }
    ];

    const mockfmtsService = jasmine.createSpyObj("fmtsService", [
      "getAllPrices",
     
    ]);
    mockfmtsService.getAllPrices.and.returnValue(of(fmtsMockData));
    
      
    
    await TestBed.configureTestingModule({
      declarations: [ TradeComponent,MockNavComponent ],
      imports:[RouterTestingModule, MatDialogModule, FormsModule],
      providers:[{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: price },{ provide:FmtsService , useValue:mockfmtsService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
