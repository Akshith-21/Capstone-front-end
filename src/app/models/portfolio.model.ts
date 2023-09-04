import { Instrument } from "./instrument.model";
import { GovtBond } from "./govt-bond.model"; 
import { StockInstrument } from "./stock-instrument.model";

export interface Portfolio{
    externalType:string
    externalId:string
    categoryId:string
    priceTimestamp:Date;
    instrumentDescription:string
}