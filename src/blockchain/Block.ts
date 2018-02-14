export interface Block{
    hash: string | null;
    index: number;
    data: string;
    previousHash: string;
    timestamp: number; //ms since epoch
    isValid: boolean;
}

class block implements Block{
    public hash: string | null;
    public timestamp: number; //ms since epoch
    public isValid: boolean = false;

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