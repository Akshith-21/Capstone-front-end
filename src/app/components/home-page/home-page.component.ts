import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientCredentials } from 'src/app/models/ClientCredentials';
import { Balance } from 'src/app/models/balance';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { ClientService } from 'src/app/services/client.service';
import { FmtsService } from 'src/app/services/fmts.service';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexOptions, ApexResponsive } from 'ng-apexcharts';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  authCreds: ClientCredentials | undefined;
  constructor(private snackBar: MatSnackBar, private clientService: ClientService, private clientTradesService: ClientTradesService, private fmts: FmtsService) { }

  portfolio: Portfolio[] = [];

  chartData: number[] = [0, 0, 0];

  balance: number = 0;
  investedAmt: number = 0;
  investedValue: number = 0;
  renderChart: boolean = false;



  ngOnInit() {
    this.clientService.retrieveJsonPayLoadFromJwt();
    this.clientTradesService.setCreds(this.clientService.getCred());
    this.authCreds = this.clientService.getCred();
    console.log("cred", this.authCreds);
    this.fetchBalance();
    this.fetchPortfolio();
  }

  fetchBalance() {
    this.clientTradesService.getBalance().subscribe({
      next: (response: Balance) => {
        this.balance = response.balance;
        console.log("Balance in home " + this.balance);
      },
      error: (error: any) => {
        if (error.status == 500) {
          this.openSnackBar('Please login first!', 'error');
        }
      }
    });
  }

  fetchPortfolio() {
    this.clientTradesService.getPortfolioData().subscribe({
      next: (response: Portfolio[]) => {
        this.portfolio = response;
        console.log("Portfolio Fetched in Home " + this.portfolio);
        this.calculateInvestments();
      },
      error: (error: any) => {
        if (error.status == 500) {
          console.log("Internal Server Error");
        }
      }
    });
  }

  calculateInvestments() {
    this.portfolio.forEach((p) => {
      this.chartData[p.categoryType == 'STOCK' ? 0 : p.categoryType == 'GOVT' ? 1 : 2] += p.totalInvestment;
      this.investedAmt += p.totalInvestment;
      this.investedValue += p.askPrice * p.currentHoldings;
    });
    this.chartData = this.chartData.map(e => parseFloat(e.toFixed(2)));
    console.log(this.chartData)

    this.renderChart = true;
  }

  openSnackBar(msg: string, status: string) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition,
      verticalPosition,
      panelClass: [status+'-snack'],
    });
  }


}
