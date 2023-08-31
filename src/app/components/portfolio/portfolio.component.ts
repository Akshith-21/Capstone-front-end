import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  constructor(private clientService:ClientService){}

  ngOnInit(){
  
  }


}
