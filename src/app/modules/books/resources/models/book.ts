export interface Book {
    id:number;
    name: string;
    author: string;
    publishingHouse:string;
    yearOfPublishing:Date | null;
    owner:string;
    available:boolean;
    reservedBy?:string;
}
