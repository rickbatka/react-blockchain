import { observable, computed } from 'mobx';
//import * as crypto from"crypto-js";
import { INode, node } from './INode';

export module Network{
    let nodes : INode[] = observable([]);
    export let queryNodes = computed(() => nodes);

    export const addNode = async () => {
        let newIndex = nodes.length;
        console.log(`Network: adding node ${newIndex}...`);

        let newNode = new node(newIndex);
        newNode.initialized.then(() => {
            console.log(`Network: node ${newIndex} online.`);
            nodes.push(newNode);
        });
    };
}

export default Network;