import { ClientIdentification } from "./clientIdentification";
import { Person } from "./person";

export class Client {

    public mockCLientData = new Map([
        ["test@test.com", new Client(new Person('test@test.com', "1", String(new Date('2001-01-01')), 'India', 'test'), new Set<ClientIdentification>([new ClientIdentification('test', 'test')]))],
        ["mehulrana@gmail.com", new Client(new Person('mehulrana@gmail.com', "2", String(new Date("2001-04-05")), 'India', '411006'), new Set<ClientIdentification>([new ClientIdentification('PAN', '12345')]))],
      ]);
      
    constructor(
        public person: Person,
        public clientIdentificationSet: Set<ClientIdentification>
    ){}
}