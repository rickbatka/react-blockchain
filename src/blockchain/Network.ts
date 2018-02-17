import { observable, computed, action } from 'mobx';
import { BNode, createNode } from './Node';
import { Block } from './Block';
import { Miner } from './Miner';

export module Network{
    let nodes : BNode[] = observable([]);
    export let miners: Miner[] = observable([]);
    export let queryNodes = computed(() => nodes);

    export const addNode = async () => {
        let newIndex = nodes.length;
        console.log(`Network: adding node ${newIndex}...`);

        let newNode = createNode(newIndex);
        newNode.initialized.then(() => {
            console.log(`Network: node ${newIndex} online.`);
            nodes.push(newNode);
        });
    };

    export const addMiner = () => {
        let newIndex = miners.length;
        console.log(`Network: adding miner ${newIndex}...`);
        miners.push(new Miner(newIndex));
    };

    export const broadcastUnminedBlock = (block: Block, fromNodeId: number) => {
        for (let node of nodes) {
            node.onBlockAdded(block);
        }
        for (let m of miners) {
            m.onUnminedBlockAdded(block);
        }
    };

    export const submitMinedBlock = action((block: Block, fromMinerId: number) => {
        console.log(`Network: node ${fromMinerId} turned in mined block ${block.index}.`);
        for (let node of nodes) {
            node.onBlockMined(block);
        }
    });
}

export default Network;