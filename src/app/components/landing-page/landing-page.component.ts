import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService,private clientService:ClientService){}
  ngOnInit() {
  //   const token = this.cookieService.get('jwtToken');
  //   if(!token){
  //     this.router.navigate(['home-page']);
  //   }
  }
  

}
