import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preference-page',
  templateUrl: './preference-page.component.html',
  styleUrls: ['./preference-page.component.css']
})

export class PreferencePageComponent {
  userEmail: any;
  constructor(private route:ActivatedRoute){}
  ngOnInit(){
    this.route.paramMap.subscribe(param =>{
      this.userEmail =param.get('email');
    })
  }

}
