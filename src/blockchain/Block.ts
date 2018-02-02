export interface Block{
    hash: string | null;
    timestamp: number; //ms since epoch
}

class block implements Block{
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

export function genesisBlock(): Block {
    return new block(0, "0", "genesis");
}