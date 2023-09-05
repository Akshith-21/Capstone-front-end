import { Component, ViewChild } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ClientService } from 'src/app/services/client.service';
import { PreferencePageComponent } from '../preference-page/preference-page.component';
import { ClientPreferencesComponent } from '../client-preference/client-preference.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-robo-advisor',
  templateUrl: './robo-advisor.component.html',
  styleUrls: ['./robo-advisor.component.css']
})
export class RoboAdvisorComponent { 
  riskValue: string ='';
  email: any;

  constructor(private clientService:ClientService, private route:ActivatedRoute){
 }
 roboAdvisorData:any;
 ngOnInit(){
  this.email = this.route.snapshot.paramMap.get('email');
  this.getRoboAdvisorData(this.riskValue)
  this.clientService.getRiskValue().subscribe({
    next:x=>{
      this.riskValue = x;
    console.log("Risk value", this.riskValue)}
  });
 }

  getRoboAdvisorData(riskValue:string){
    // this.clientService.getRoboAdvisorData(riskValue).subscribe((data)=>{
    //     this.roboAdvisorData = data;
        
    // })
    this.roboAdvisorData = this.clientService.mockRoboAdvisorDataH;
    console.log("datain RA", this.roboAdvisorData)
  }
}
