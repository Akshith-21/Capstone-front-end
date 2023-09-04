import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() email: any;
  constructor(private clientService:ClientService,private  route:ActivatedRoute, private router:Router){;
  }

  isHomeRoute:Boolean | undefined;
  isLandingPageRoute:Boolean | undefined;
  isPortfolioRoute: Boolean |undefined;
  isTradingRoute:Boolean | undefined;

  onPreference(){
    this.router.navigate(['/preference',this.email])
  }

  
  currentUrl: any;
  ngOnInit(){

    
    this.route.url.subscribe((url)=>{
      this.isHomeRoute=url[0].path==='home-page';
      this.isLandingPageRoute=url[0].path==='landing-page';
      this.isPortfolioRoute =url[0].path==='portfolio'
      this.isTradingRoute=url[0].path==='trades'
    })
    // console.log("RR" , this.isLandingPageRoute )

  }

  // isLandingPage= this.clientService.isLanding;
  // isPortFolio = this.clientService.isPortFolio

}
