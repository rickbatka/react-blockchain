import { observable } from 'mobx';

export class Node{
    @observable public nodeId: number;

    constructor(nodeId: number){
        this.nodeId = nodeId;
    }
}

export class BStore{
    @observable public Nodes: Node[];

    constructor(){
        this.Nodes = [new Node(0)];
    }
}