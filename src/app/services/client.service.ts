import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { ClientIdentification } from '../models/clientIdentification';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public data = [
    
  ]
  public mockClientData = [
    {
      person: {
        email: "",
        id: 0,
        dateOfBirth: new Date(),
        country: '',
        postalCode: '',
      },
      clientIdentificationSet : new Set<ClientIdentification>()
    }
  ];
  constructor() { }
}
