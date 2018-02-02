export interface IBlock{
    hash: string | null;
    timestamp: number; //ms since epoch
}

class Block implements IBlock{
    public hash: string | null;
    public timestamp: number; //ms since epoch

    constructor(
        public index: number, 
        public previousHash: string, 
        public data: string
    ){
        this.timestamp = new Date().valueOf();
        this.hash = null;
    }
}

export function genesisBlock() {
    return new Block(0, "0", "genesis");
}