import { Instrument } from "./instrument.model";

export interface GovtBond{
    askPrice:number;
    bidPrice:number;
    priceTimestamp:Date;
    instrument:Instrument
}