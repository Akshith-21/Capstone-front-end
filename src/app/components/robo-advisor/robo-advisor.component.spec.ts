import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoboAdvisorComponent } from './robo-advisor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Price } from 'src/app/models/price.model';
import { Component, Input } from '@angular/core';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { of } from 'rxjs';
import { BuyComponent } from '../buy/buy.component';


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
  let dialog: MatDialog;
  let clientTradeService: ClientTradesService;

    // Create mock instances of MatDialog and ClientTradesService
  

  beforeEach(async () => {
    const mockMatDialog = {
      open: jasmine.createSpy('open'),
      afterAllClosed: of(true), // Mock afterAllClosed Observable
    };

    const mockClientTradesService = {
      mockBalanceData: new Map<string, number>(),
    };
    await TestBed.configureTestingModule({
      declarations: [ RoboAdvisorComponent,MockNavComponent],
      imports:[RouterTestingModule,MatDialogModule],
      providers:[{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: price },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ClientTradesService, useValue: mockClientTradesService },]


    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute a buy trade and update balance correctly', () => {
    // Mock data for the trade
    const price: Price = {
      instrument: {
        instrumentId: 'XYZ123',
        externalIdType: 'TypeA',
        externalId: '123456',
        categoryId: 'CatA',
        maxQuantity: 10,
        minQuantity: 1,
        instrumentDescription: 'Instrument XYZ',
      },
      askPrice: 0,
      bidPrice: 0,
      priceTimestamp: ''
    };

    // Set the initial balance for the client (replace 'test@test.com' with the client's email)
    component.email = 'test@test.com';
    clientTradeService.mockBalanceData.set(component.email, 10000); // Initial balance of $10,000
    expect(dialog.open).toHaveBeenCalledWith(BuyComponent, {
      data: {
        price: price,
        email: component.email,
      },
      width: '500px',
      height: '500px',
    });

    // Check if the client's balance was updated correctly (assuming the trade cost is $1000)
    expect(clientTradeService.mockBalanceData.get(component.email)).toBe(9000); // Updated balance of $9,000
  });
});

