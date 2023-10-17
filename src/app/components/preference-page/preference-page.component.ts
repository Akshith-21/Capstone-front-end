import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-preference-page',
  templateUrl: './preference-page.component.html',
  styleUrls: ['./preference-page.component.css']
})

export class PreferencePageComponent {
  userEmail: any;
  constructor(private route:ActivatedRoute,private clientService:ClientService){}
  ngOnInit(){
    this.clientService.retrieveJsonPayLoadFromJwt();
    this.route.paramMap.subscribe(param =>{
      this.userEmail =param.get('email');
    })
  }

}
