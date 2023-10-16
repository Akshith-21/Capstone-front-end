import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientCredentials } from 'src/app/models/ClientCredentials';
import { Balance } from 'src/app/models/balance';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { ClientService } from 'src/app/services/client.service';
import { FmtsService } from 'src/app/services/fmts.service';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexOptions, ApexResponsive } from 'ng-apexcharts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  authCreds: ClientCredentials | undefined;
  constructor(private clientService: ClientService, private clientTradesService : ClientTradesService, private fmts: FmtsService) {  }

  portfolio: Portfolio[] = [];

  chartData: number[] = [0, 0, 0];

  balance: number = 0;
  investedAmt: number = 0;
  investedValue: number = 0;
  renderChart: boolean = false;

  // chartOptions = {
	//   animationEnabled: true,
	//   title:{
	// 	text: "Project Cost Breakdown"
	//   },
	//   data: [{
	// 	type: "doughnut",
	// 	yValueFormatString: "#,###.##'%'",
	// 	indexLabel: "{name}",
	// 	dataPoints: [
	// 	  { y: 28, name: "Labour" },
	// 	  { y: 10, name: "Legal" },
	// 	  { y: 20, name: "Production" },
	// 	  { y: 15, name: "License" },
	// 	  { y: 23, name: "Facilities" },
	// 	  { y: 17, name: "Taxes" },
	// 	  { y: 12, name: "Insurance" }
	// 	]
	//   }]
	// }	
  chartOptions: ApexOptions = {};
  // series: ApexAxisChartSeries=;
  
  


  ngOnInit() {
    this.authCreds = this.clientService.getCreds();
    console.log("cred", this.authCreds);
    this.fetchBalance();
    this.fetchPortfolio();

    // const seriesData = [44, 55, 13, 43, 22];
    // const labels = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

    // // Assign the series property within chartOptions.
    // this.chartOptions.series = seriesData;
    // this.chartOptions.labels = labels;
    // this.chartOptions.colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];
    // this.chartOptions.responsive = [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200,
    //       },
    //       legend: {
    //         position: 'bottom',
    //       },
    //     },
    //   },
    // ];


    // this.getPriceData();
    // this.getAllInstruments();
    // this.getGovtPrice();
    // this.getStockInstrument();
  }

  // getPriceData(){
  //   this.fmts.getPriceData().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Price Data", this.demo)
  //   },}); 

  // }
  // getGovtPrice(){
  //   this.fmts.getGovtPrice().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Govt Price Data", this.demo)
  //   },}); 

  // }
  // getAllInstruments(){
  //   this.fmts.getAllInstruments().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Instrument Data", this.demo)
  //   },}); 

  // }
  // getStockInstrument(){
  //   this.fmts.getStockInstrument().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Stock Instrument Data", this.demo)
  //   },}); 
  //  
  // }

  fetchBalance() {
    this.clientTradesService.getBalance().subscribe({
      next: (response: Balance) => {
        this.balance = response.balance;
        console.log("Balance in home " + this.balance);
      },
      error:(error: any) => {
        if(error.status==500) {
          alert("Internal Server Error");
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
      error:(error: any) => {
        if(error.status==500) {
          console.log("Internal Server Error");
        }
      }
    });
  }

  calculateInvestments() {
    this.portfolio.forEach((p) => {
      this.chartData[p.categoryType=='STOCK'?0:p.categoryType=='GOVT'?1:2] +=  p.totalInvestment;
      this.investedAmt += p.totalInvestment;
      this.investedValue += p.askPrice * p.currentHoldings;
    });
    this.chartData= this.chartData.map(e => parseFloat(e.toFixed(2)));
    console.log(this.chartData)
    
    this.renderChart = true;
  }


}
