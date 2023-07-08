export interface Book {
    id:number;
    name: string;
    author: string;
    publishingHouse:string;
    yearOfPublishing:number;
    owner:string;
    available:boolean;
    reservedBy?:string;
}
