import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { ClientIdentification } from '../models/clientIdentification';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public mockCLientData = new Map([
    ["test@test.com", new Client(new Person('test@test.com', 1, new Date('2001-01-01'), 'India', 'test'), new Set<ClientIdentification>([new ClientIdentification('test', 'test')]))],
    ["mehulrana@gmail.com", new Client(new Person('mehulrana@gmail.com', 2, new Date("2001-04-05"), 'India', '411006'), new Set<ClientIdentification>([new ClientIdentification('PAN', '12345')]))],
  ]);
  constructor() { }

  getMockData() {
    return this.mockCLientData;
  }

  doesEmailExist(email: string) {
    return this.mockCLientData.has(email);
  }
}
