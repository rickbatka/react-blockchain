import { observable } from 'mobx';
import * as crypto from"crypto-js";

export class Node{
    @observable public nodeId: number;

    constructor(nodeId: number){
        this.nodeId = nodeId;
    }
}
/* 
class Block{
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

export class BStore{
    @observable public Nodes: Node[];

    constructor(){
        this.Nodes = [new Node(0)];
        console.log(crypto.SHA256("asd").toString());
    }
}