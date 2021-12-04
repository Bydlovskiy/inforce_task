export interface ICommentRequest {
    productId : number;
    description : string;
    date : Date;
}
export interface ICommentResponse {
    id : number
    productId : number;
    description : string;
    date : Date;
}