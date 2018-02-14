import { observable } from 'mobx';

export interface Block {
    hash: string | null;
    index: number;
    data: string;
    previousHash: string;
    timestamp: number; //ms since epoch
    isValid: boolean;
}

class block implements Block{
    @observable public hash: string | null;
    @observable public isValid: boolean = false;
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

export function validateHash(block: Block): boolean {
    //TODO 
    return true;
}