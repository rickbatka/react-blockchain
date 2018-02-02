import { observable } from 'mobx';
import { Network } from './Network';
import { Block, genesisBlock } from './Block';

export interface BNode{
    nodeId: number;
    blocks: Block[];
    initialized: Promise<boolean>;
}

export class node implements BNode{
    @observable public nodeId: number;
    @observable public blocks: Block[];
    public initialized: Promise<boolean>;

    constructor(nodeId: number){
        this.nodeId = nodeId;

        this.logAction(`alive, querying network for existing nodes...`);
        this.initialized = this.init();
    }

    private init = async () => {
        let allNodes = Network.queryNodes.get();
        if(allNodes.length == 0){
            this.logAction(`...no nodes. initiating genesis block...`);
            this.blocks = [genesisBlock()];
        }else{
            this.logAction(`...found ${allNodes.length} nodes, finding longest valid blockchain...`);
            this.blocks = node.getBlockchain(allNodes); 
        }

        this.logAction(`online. chain height ${this.blocks.length}.`);
        return true;
    };

    private static getBlockchain = (nodes: BNode[]) => {
        // todo currently just takes the longest, should also validate...
        let longestValidChain = nodes
            .sort((a, b) => a.blocks.length < b.blocks.length ? -1 : 1)
            [0].blocks;

        // clone, so we don't have multiple nodes accessing the same blockchain in memory - the perils of not having a real network seam...
        return longestValidChain.map(block => <Block>{...block});
    }

    public logAction = (text: string) => {
        console.log(`Node ${this.nodeId}: ${text}`);
    }
}

export function createNode(nodeId: number): BNode{
    return new node(nodeId);
}