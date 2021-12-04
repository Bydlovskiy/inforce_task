import { ICommentRequest, ICommentResponse } from "./IComment-interface";

export interface IProductRequest{
    imageUrl : string;
    name : string;
    count : number;
    size : {
        width : number;
        height : number;
    };
    weight : string;
}
export interface IProductResponse{
    id : number;
    imageUrl : string;
    name : string;
    count : number;
    size : {
        width : number;
        height : number;
    };
    weight : string;
}
