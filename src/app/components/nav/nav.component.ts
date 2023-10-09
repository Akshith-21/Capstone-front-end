import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() page: string = '';
  constructor(private clientService:ClientService,private  route:ActivatedRoute, private router:Router){;
  }


  onPreference(){
    this.router.navigate(['/preference'])
  }

  
  currentUrl: any;
  ngOnInit(){
    this.route.url.subscribe((url)=>{
      this.page = url[0].path;
      
    })
    // console.log("RR" , this.isLandingPageRoute )

  }

  // isLandingPage= this.clientService.isLanding;
  // isPortFolio = this.clientService.isPortFolio

}
