import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
  @Input() email?:string;
  acceptTerms:boolean = false;


  constructor(private  route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    
  }

  onContinueClick(){
    if(this.acceptTerms){
      this.router.navigate(['/home-page',this.email]);

    }
    else{
      // show a message saying it is mandatory to click
    }
  }

}
