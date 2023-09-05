import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio.model';
@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

 

  email:any;
  portfolios:Portfolio[] | undefined =[]
  constructor(private route:ActivatedRoute, private clientService: ClientService) { }
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.getPortfolioData(this.email)
  }

 

  getPortfolioData(email:string){
    this.clientService.getPortfolioData(email).subscribe((data) =>{
      this.portfolios =data;
      console.log("Portfolio", this.portfolios)
    })

  }
  isProfit(portfolios:Portfolio): boolean {
    return portfolios.askPrice >= portfolios.bidPrice;
  }
  
  calculateProfitLossPercentage(portfolios:Portfolio): string {
    return ((portfolios.askPrice - portfolios.bidPrice) / portfolios.bidPrice * 100).toFixed(2);
  }
 

}

