import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectItem } from 'primeng/api';
import { Preferences } from 'src/app/models/preferences';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { PreferencesRequest } from 'src/app/models/PreferencesRequest';
 

 

interface InvestmentInterface {
  name: string,
  code: string
}
@Component({
  selector: 'app-client-preference',
  templateUrl: './client-preference.component.html',
  styleUrls: ['./client-preference.component.css']
})

 

 export class ClientPreferencesComponent implements OnInit{
  showPopup = false;
  roboAdvisorCheckBox:any;
  clientId: string = "";

  togglePopup(){
    this.showPopup = !this.showPopup;
    let id = this.clientService.getCreds()?.clientId;
    this.clientId = id?id:"0";
    this.clientService.clientPreferences[this.clientId] = new Preferences(this.investmentPurpose,this.selectedRiskTolerance.code,this.selectedIncomeCategory.code,this.selectedLengthOfInvestment.code);
    console.log("current client preferences", this.clientService.clientPreferences)
    this.getRiskTolerance();
    this.preferences();
  }
   currentPreferences = new Preferences("","","","");

  // @Input() email!: any;
  riskValue: string='';
  constructor(private clientService:ClientService,private  route:ActivatedRoute, private location: Location, private router:Router){  }

  investmentPurpose:string = "";
  selectedRiskTolerance!:InvestmentInterface;
  selectedIncomeCategory!:InvestmentInterface;
  selectedLengthOfInvestment!:InvestmentInterface;
  
  lengthOfInvestmentOptions:InvestmentInterface[] = [];
  riskToleranceOptions:InvestmentInterface[] =[];
  incomeCategoryOptions:InvestmentInterface[] =[];

  setInvestmentPurpose(event:any){
    console.log(this.investmentPurpose)
  }

  setRiskTolerance(event:any){
    console.log("In pref ", this.selectedRiskTolerance);  
  }
  
  setIncomeCategory(event:any){
    console.log(this.selectedIncomeCategory);
  }

  setLengthOfInvestment(event:any){
    console.log(this.selectedLengthOfInvestment);
  }
  
  onSave(){
    // this.clientService.clientPreferences[this.email] = new Preferences(this.investmentPurpose,this.selectedRiskTolerance.code,this.selectedIncomeCategory.code,this.selectedLengthOfInvestment.code);
    // console.log("current client preferences", this.clientService.clientPreferences)
    // this.getRiskTolerance();
    // this.router.navigate(['/home-page',this.email]);
    
    
  }

  onCancel(){
    this.location.back();
  }

  setExistingOptions() {
    
    if (this.clientService.clientPreferences[this.clientId].riskTolerance != ''  && this.clientService.clientPreferences[this.clientId].incomeCategory != '' && this.clientService.clientPreferences[this.clientId].lengthOfInvestment != '') {
      console.log("inside if");
      console.log(this.clientService.clientPreferences[this.clientId].riskTolerance);
      this.selectedRiskTolerance = this.riskToleranceOptions.find(obj => obj.code === this.clientService.clientPreferences[this.clientId].riskTolerance)!
      this.selectedIncomeCategory = this.incomeCategoryOptions.find(obj => obj.code ===this.clientService.clientPreferences[this.clientId].incomeCategory)!
      this.selectedLengthOfInvestment = this.lengthOfInvestmentOptions.find(obj => obj.code === this.clientService.clientPreferences[this.clientId].lengthOfInvestment)!;
      this.investmentPurpose = this.clientService.clientPreferences[this.clientId].investmentPurpose;
    // }
  }
}

  getRiskTolerance():string{
    // console.log("get risk tolerance");
    // console.log(this.selectedRiskTolerance.code)
    this.clientService.setRiskValue(this.selectedRiskTolerance.code)
    return this.selectedRiskTolerance.code;


  }

  preferences(){
    const preferencesRequest: PreferencesRequest = {
     investmentPurpose : this.investmentPurpose,
     riskTolerance:this.selectedRiskTolerance.name,
     lengthOfInvestment: this.selectedLengthOfInvestment.name,
     incomeCategory: this.selectedIncomeCategory.name,
     roboAdvisor: this.roboAdvisorCheckBox
    };
    this.clientService.setPreferences(preferencesRequest, this.clientId).subscribe({
      next: (response:String) => {
        console.log(response+"Response of preferences:");
       // this.router.navigate(['home-page', inputEmail])
       // this.clientService.setCreds(response);
      },
      error:(error:any) =>{
          if(error.status===400)
          {
            alert("Invalid credentials");
          }
      }
    });

  }

  ngOnInit() {
    this.lengthOfInvestmentOptions =[
      {name:'0-1 years', code:'0-1 years'},
      {name:'1 years- 5 years', code:'1 years- 5 years'},
      {name:'more than 5 years', code:'more than 5 years'},
    ]

    this.riskToleranceOptions=[
      {name:'Low', code:'Low'},
      {name:'Medium', code:'Medium'},
      {name:'High', code:'High'},
    ]

    this.incomeCategoryOptions = [
      {name:'0-100000', code:'0-100000'},
      {name:'100000-200000', code:'100000-200000'},
      {name:'more than 20000', code:'more than 20000'},
    ]
    this.setExistingOptions();

  }
 
}