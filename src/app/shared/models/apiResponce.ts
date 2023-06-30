export interface ApiResponce<T> {
    success:boolean;
    data?:T;
    errors:string[];
}
