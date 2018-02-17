import { observable } from 'mobx';
import { Network } from './Network';
import { Block, genesisBlock, validateHash, createBlock } from './Block';

export interface BNode{
    nodeId: number;
    blocks: Block[];
    initialized: Promise<boolean>;
    onBlockAdded: (block: Block) => void;
    onBlockMined: (block: Block) => boolean;
    submitNewBlock: (data: string) => void;
}

export class node implements BNode{
    @observable public nodeId: number;
    @observable public blocks: Block[] = [];
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
            this.addBlock(genesisBlock());
        }else{
            this.logAction(`...found ${allNodes.length} nodes, finding longest valid blockchain...`);
            this.blocks = node.getBlockchain(allNodes); 
        }

        this.logAction(`online. chain height ${this.blocks.length}.`);

        return true;
    };

    public submitNewBlock = (data: string) => {
        this.addBlock(createBlock(this.blocks.length, this.blocks[this.blocks.length - 1].hash, data));
    };

    private addBlock = (block: Block) => {
        this.blocks.push(block);
        Network.broadcastUnminedBlock(block, this.nodeId);
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

    public onBlockAdded = (block: Block) => {
        if (block.index == this.blocks.length && block.previousHash == this.blocks[this.blocks.length-1].hash) {
            this.blocks.push(<Block>{ ...block });
            return true;
        }

        return false;
    };

    public onBlockMined = (block: Block) => {
        let foundBlock = this.blocks.find(b => b.index == block.index
                && b.data == block.data
                && b.previousHash == block.previousHash);

        if (foundBlock && validateHash(block))
        {
            foundBlock.hash = block.hash;
            foundBlock.isValid = true;
            return true;
        }
        return false;
    };
}

export function createNode(nodeId: number): BNode{
    return new node(nodeId);
}