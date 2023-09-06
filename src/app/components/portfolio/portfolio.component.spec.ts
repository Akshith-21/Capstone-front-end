import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from 'src/app/services/client.service';
import { Portfolio } from 'src/app/models/portfolio.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-nav',
  template: 'mock nav'
  })
  class MockNavComponent {
    @Input()
    email:string=''
  }
describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioComponent,MockNavComponent ],
      imports:[FormsModule,RouterTestingModule],
      providers:[ClientService]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should initialize email property', () => {
  //   expect(component.email).toBe('');
  // });

  it('should fetch portfolio data from the service', () => {
    const email = 'test@example.com';
    const mockPortfolioData: Portfolio[] = []; // Provide mock data as needed
    spyOn(component.clientService, 'getPortfolioData').and.returnValue(of(mockPortfolioData));
    component.getPortfolioData(email);
    expect(component.portfolios).toEqual(mockPortfolioData);
    expect(component.clientService.getPortfolioData).toHaveBeenCalledWith(email);
  })
  it('should calculate profit/loss percentage correctly', () => {
    const portfolio: Portfolio = {
      askPrice: 10,
      bidPrice: 8,
      priceTimestamp: new Date(),
      instrumentDescription: '',
      externalId: '',
      currentHoldings: 3,
      externalType: '',
      categoryId: ''
    };
    expect(component.calculateProfitLossPercentage(portfolio)).toBe('25.00');
  });

  it('should return true if ask price is greater than or equal to bid price', () => {
    const portfolio: Portfolio = {
      askPrice: 10,
      bidPrice: 8,
      priceTimestamp: new Date(),
      instrumentDescription: '',
      externalId: '',
      currentHoldings: 3,
      externalType: '',
      categoryId: ''
      // Add other properties as needed for the test
    };
    expect(component.isProfit(portfolio)).toBe(true);
  });

});
