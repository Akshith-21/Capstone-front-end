import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ClientCredentials } from 'src/app/models/ClientCredentials';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { Balance } from 'src/app/models/balance';
@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {



  // authCreds: ClientCredentials | undefined;
  portfolios: Portfolio[] = [];
  balance: number = 0;
  clientId: string | undefined = '';
  investedAmt: number = 0;
  investedValue: number = 0;
  profitorloss: any;

  constructor(public clientTradeService: ClientTradesService) { }

  fetchBalance() {
    this.clientTradeService.getBalance().subscribe({
      next: (response: Balance) => {
        console.log(response.balance, "Response balance:");
        this.balance = response.balance;
      },
      error: (error: any) => {
        if (error.status === 400) {
          console.log(error.error)
        }
      }
    });
  }

  ngOnInit() {
    // this.authCreds = this.clientService.getCreds();
    this.getPortfolioData();
    this.fetchBalance();
    this.clientId = this.clientTradeService.authCreds?.clientId;

  }



  getPortfolioData() {
    this.clientTradeService.getPortfolioData().subscribe({
      next: (data) => {
        this.portfolios = data;
        console.log("Portfolio", this.portfolios);
        this.calculateInvestments();
      }
    });

  }

  calculateInvestments() {
    if (this.portfolios) {
      this.portfolios.forEach((p) => {
        this.investedAmt += p.totalInvestment;
        this.investedValue += p.askPrice * p.currentHoldings;
      });
    }
  }

  isGain(portfolios: Portfolio): boolean {
    this.profitorloss = this.calculateGainPercentage(portfolios);
    return parseFloat(this.profitorloss) > 0;
  }

  calculateGain(portfolios: Portfolio): string {
    let eachItemInvestment = portfolios.totalInvestment / portfolios.currentHoldings;
    let sellPrice = portfolios.askPrice;
    return ((sellPrice - eachItemInvestment)).toFixed(2);
  }

  calculateGainPercentage(portfolios: Portfolio): string {
    let eachItemInvestment = portfolios.totalInvestment / portfolios.currentHoldings;
    let sellPrice = portfolios.askPrice;
    this.profitorloss = (((sellPrice - eachItemInvestment) / eachItemInvestment) * 100).toFixed(2);
    return this.profitorloss;
  }

  isProfit(portfolio: Portfolio): boolean {
    return portfolio.askPrice * portfolio.currentHoldings > portfolio.totalInvestment;
  }


}

