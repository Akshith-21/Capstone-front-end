import { ClientIdentification } from "./clientIdentification";
import { Person } from "./person";

export class Client {
    constructor(
        public person: Person,
        public clientIdentificationSet: Set<ClientIdentification>
    ){}
}