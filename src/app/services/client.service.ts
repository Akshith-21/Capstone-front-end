import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { ClientIdentification } from '../models/clientIdentification';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
<<<<<<< HEAD
   client=[{
    "id":1,
    "email":"a720982@fmr.com"
},
{
    "id":2,
    "email":"a720918@fmr.com"
},
{
    "id":1,
    "email":"a720990@fmr.com"
},
{
    "id":1,
    "email":"a720917@fmr.com"
},
]



=======
  public mockCLientData = new Map([
    ["test@test.com", new Client(new Person('tests@test.com', 1, new Date('2001-01-01'), 'India', 'test'), new Set<ClientIdentification>([new ClientIdentification('test', 'test')]))],
    ["mehulrana@gmail.com", new Client(new Person('mehulrana@gmail.com', 2, new Date("2001-04-05"), 'India', '411006'), new Set<ClientIdentification>([new ClientIdentification('PAN', '12345')]))],
  ]);
>>>>>>> e3ab1f1ddb979bf90a731550d672cc86b8e28d72
  constructor() { }

  getMockData() {
    return this.mockCLientData;
  }

  doesEmailExist(email: string) {
    return this.mockCLientData.has(email);
  }
}
