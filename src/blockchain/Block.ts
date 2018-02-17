import { observable } from 'mobx';
import { SHA256 } from 'crypto-js';

export interface Block {
    hash: string | null;
    nonce: number | null;
    index: number;
    data: string;
    previousHash: string | null;
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
        public previousHash: string | null, 
        public data: string
    ){
        this.timestamp = new Date().valueOf();
        this.hash = null;
        this.nonce = null;
    }
}

export function genesisBlock(): Block {
    return new block(0, "00ecf311bbb2fe20a323ac8fed6fde46198dd6f5e66e859fb83ea47d9a480ce8", "GENESIS BLOCK");
}

export function createBlock(index: number, previousHash: string | null, data: string): Block {
    return new block(index, previousHash, data);
}

export function validateHash(block: Block): boolean {
    return block.hash != null && block.hash === calculateHash(block);
}

export function calculateHash(block: Block): string {
    return SHA256(`${block.index}${block.previousHash}${block.timestamp}${block.nonce}${block.data}`).toString();
}