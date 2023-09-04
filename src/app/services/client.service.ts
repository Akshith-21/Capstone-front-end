import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { ClientIdentification } from '../models/clientIdentification';

@Injectable({
  providedIn: 'root'
})


export class ClientService {

  isPortFolio :boolean =false
  isLanding:boolean =false
  public mockClientData = new Map([
    ["test@test.com", new Client(new Person('tests@test.com', "1", String(new Date('2001-01-01')), 'India', 'test'), new Set<ClientIdentification>([new ClientIdentification('test', 'test')]))],
    ["mehulrana@gmail.com", new Client(new Person('mehulrana@gmail.com', "2", String(new Date("2001-04-05")), 'India', '411006'), new Set<ClientIdentification>([new ClientIdentification('PAN', '12345')]))],
  ]);
  portfolioData =[{
    externalType: "Bond",
    externalId: "GOOG",
    categoryId: "Technology",
    priceTimestamp: new Date(),
    instrumentDescription: "Google Inc. bond"
  },
 { 
  externalType: "Bond",
  externalId: "GOOG",
  categoryId: "Technology",
  priceTimestamp: new Date(),
  instrumentDescription: "Google Inc. bond"
},{
  externalType: "Cryptocurrency",
  externalId: "BTC",
  categoryId: "Currency",
  priceTimestamp: new Date(),
  instrumentDescription: "Bitcoin"
}]

getEmail()
{

}

  verifyEmail(email:string):boolean {
    for(let personEmail of this.mockClientData.entries()) {
      if (email === personEmail[0]){
        return true;
        break;
      }
    }
    return false;
  }

  addClient(person: Person,clientIdentification: ClientIdentification){
    this.mockClientData.set(person.email, new Client(person,new Set<ClientIdentification>([clientIdentification])));
    console.log(this.mockClientData);
    
  }

  generateUniqueId(userEmail:string):string{
    {
      const timestamp = Date.now().toString(36);
      const randomNum = Math.floor(Math.random()*1000).toString(36);
      const userPart = userEmail.substring(0,3).toUpperCase();
      const uniqueId = `${userPart}-${timestamp}-${randomNum}`;
      return uniqueId;
    }

  }

  constructor() {
    
  }

  doesEmailExist(email:string)
  {
     return this.mockClientData.has(email);
  }
  getId(email:string):Set<ClientIdentification>| undefined{
    const temp = this.mockClientData.get(email);
    return temp?.clientIdentificationSet
  }

  // getTempObject() :{[email:string]: Client}{
  // const temp :{[email :string] : Client} ={};
  // this.mockClientData.forEach((email,client)=>{
  //   const id = client.clientIdentificationSet.value().next.value();

  // })
  // return temp;
  // }
  // uniqueStruct = new Map<string , Client>(); //Unique structure which is combination of email id and identification value
   
   


  

}
