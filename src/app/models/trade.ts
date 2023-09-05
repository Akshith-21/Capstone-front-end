export class Trade {
    constructor(
        // public order: Order,
        public cashValue: number,
        public quantity: number,
        public direction: string,
        public instrumentId: string,
        public clientId: string,
        public tradeId: string,
        public executionPrice: number
    ) {}
}
