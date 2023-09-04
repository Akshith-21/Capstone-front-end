import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { ClientIdentification } from '../models/clientIdentification';

const testClientData =  new Map([
  ["test1@test.com", new Client(new Person('test1@test.com', "1", String(new Date('2001-01-01')), 'India', '431412'), new Set<ClientIdentification>([new ClientIdentification('Aadhaar', '2039210932194')]))],
  ["mock@gmail.com", new Client(new Person('mock@gmail.com', "2", String(new Date("2004-08-03")), 'India', '413413'), new Set<ClientIdentification>([new ClientIdentification('PAN', 'AHDJHE1234FDAF5')]))],
]);



describe('ClientService', () => {
  let service: ClientService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
    service.mockClientData = testClientData;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should validate correct email', () => {
    const testEmail = "mock@gmail.com";
    expect(service.doesEmailExist(testEmail)).toBeTrue();
  });
  it('should validate incorrect email', () => {
    const testEmail = "abcd@gmail.com";
    expect(service.doesEmailExist(testEmail)).toBeFalse();
  });
  it('should add a Client', () => {
    const testPerson = new Person('test2@test.com', "3", String(new Date('2003-01-01')), 'India', '434412');
    const testIdentification = new ClientIdentification('Aadhaar', '20396989894');
    service.addClient(testPerson, testIdentification);
    expect(service.mockClientData.get(testPerson.email)?.person.postalCode).toEqual("434412");
  });
  it('should fetch correct ID', () => {
    const testEmail = "test1@test.com";
    const clientId : Set<ClientIdentification>| undefined = service.getId(testEmail);
    for (let entry of clientId?clientId:[]) {
      expect(entry.value).toBe('2039210932194');
  }
  })
  
});
