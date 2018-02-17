import { observable } from 'mobx';
import { SHA256 } from 'crypto-js';

export interface Block {
    hash: string | null;
    nonce: number | null;
    index: number;
    data: string;
    previousHash: string;
    timestamp: number; //ms since epoch
    isValid: boolean;
}

class block implements Block{
    @observable public hash: string | null;
    @observable public nonce: number | null;
    @observable public isValid: boolean = false;
    public timestamp: number; //ms since epoch

    constructor(
        public index: number, 
        public previousHash: string, 
        public data: string
    ){
        this.timestamp = new Date().valueOf();
        this.hash = null;
        this.nonce = null;
    }
}

export function genesisBlock(): Block {
    return new block(0, "0", "GENESIS BLOCK");
}

export function validateHash(block: Block): boolean {
    return block.hash != null && block.hash === calculateHash(block);
}

export function calculateHash(block: Block): string {
    return SHA256(`${block.index}${block.previousHash}${block.timestamp}${block.nonce}${block.data}`).toString();
}