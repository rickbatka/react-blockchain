import { observable, computed } from 'mobx';
import { BNode, createNode } from './Node';

export module Network{
    let nodes : BNode[] = observable([]);
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
}

export default Network;