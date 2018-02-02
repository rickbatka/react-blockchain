import { observable } from 'mobx';
import * as crypto from"crypto-js";
import { INode } from './INode';

/* class Block{
    public hash: string;
    public timestamp: number; //ms since unix epoch

    constructor(
        public index: number, 
        public previousHash: string, 
        public data: string
    ){
        this.timestamp = new Date().valueOf();
        
        console.log(crypto.SHA256("asd"));
    }

    public static genesis = () => {
        //return new Block();
    };
} */
class node implements INode{
    @observable public nodeId: number;

    constructor(nodeId: number){
        this.nodeId = nodeId;
    }

    public getBlocks = () => {};
}

export module Network{
    export let nodes : node[] = observable([new node(0)]);
    export const addNode = () => {
        nodes.push(new node(nodes.length));
    };

    var a = 1;
    export const getA = () => ++a;

    console.log(Network.getA());
    console.log(Network.getA());
    
    console.log(crypto.SHA256("asd").toString());
}

export default Network;