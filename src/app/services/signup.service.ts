import { Injectable } from '@angular/core';
import { ClientIdentification } from '../models/clientIdentification';
import { Client } from '../models/client';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  public mockCLientData = new Map([
    ["test@test.com", new Client(new Person('test@test.com', "1", String(new Date('2001-01-01')), 'India', 'test'), new Set<ClientIdentification>([new ClientIdentification('test', 'test')]))],
    ["mehulrana@gmail.com", new Client(new Person('mehulrana@gmail.com', "2", String(new Date("2001-04-05")), 'India', '411006'), new Set<ClientIdentification>([new ClientIdentification('PAN', '12345')]))],
  ]);

  constructor() { }

  verifyEmail(email:string):boolean {
    for(let personEmail of this.mockCLientData.entries()) {
      if (email === personEmail[0]){
        return true;
        break;
      }
    }
    return false;
  }

  addClient(person: Person,clientIdentification: ClientIdentification){
    this.mockCLientData.set(person.email, new Client(person,new Set<ClientIdentification>([clientIdentification])));
    console.log(this.mockCLientData);
    
  }

 
}
