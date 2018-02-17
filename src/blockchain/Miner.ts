import { observable } from 'mobx';
import * as _ from 'lodash';
import { Network } from './Network';
import { Block, calculateHash } from './Block';

export class Miner {
    @observable public minerId: number;
    static readonly DIFFICULTY_PREFIX: string = '00';
    static readonly MINING_ATTEMPT_INTERVAL_MS: number = 10;

    private blocks: Block[] = [];

    public constructor(minerId: number) {
        this.minerId = minerId;
        window.setInterval(this.doMining, Miner.MINING_ATTEMPT_INTERVAL_MS);
    }

    public onUnminedBlockAdded = (block: Block) => {
        this.blocks.push(block);
    };

    private doMining = async () => {
        if (this.blocks.length == 0) {
            return;
        }

        let curBlock = this.blocks[0];
        curBlock.nonce = _.isNil(curBlock.nonce) ? 0 : curBlock.nonce+1;
        _.throttle(() => this.logAction(`mining block ${curBlock.index}...`), 500)();
        
        let attempt = calculateHash(curBlock);
        if (_.startsWith(attempt, Miner.DIFFICULTY_PREFIX)) {
            this.logAction(`found solution for block ${curBlock.index}!`);
            Network.submitMinedBlock(<Block>{ ...curBlock, hash: attempt }, this.minerId);
            this.blocks.shift();
        }
    };
    
   
    public logAction = (text: string) => {
        console.log(`Miner ${this.minerId}: ${text}`);
    }
    
}

//export function createNode(nodeId: number): BNode {
//    return new node(nodeId);
//}