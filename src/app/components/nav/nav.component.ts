import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private clientService:ClientService,private  route:ActivatedRoute){}

  isPortifolioRoute:Boolean | undefined;
  isLandingPageRoute:Boolean | undefined;
  isTradingRoute:Boolean | undefined;
  currentUrl: any;
  ngOnInit(){
    
    this.route.url.subscribe((url)=>{
      this.isPortifolioRoute=url[0].path==='portfolio';
      this.isLandingPageRoute=url[0].path==='landing-page';
      this.isTradingRoute=url[0].path==='trades'
    })
    // console.log("RR" , this.isLandingPageRoute )

  }

  // isLandingPage= this.clientService.isLanding;
  // isPortFolio = this.clientService.isPortFolio

}
