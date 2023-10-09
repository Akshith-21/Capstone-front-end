import { Instrument } from "./instrument.model";
import { GovtBond } from "./govt-bond.model"; 
import { StockInstrument } from "./stock-instrument.model";

 

export class Portfolio{
    constructor( 
        public externalType:string,
        public externalId:string,
        public categoryType:string,
        public priceTimestamp:Date,
        public instrumentDescription:string,
        public bidPrice:number,
        public askPrice:number,
        public currentHoldings:number,
        public instrumentId: string,
        public totalInvestment: number
    ){}
}