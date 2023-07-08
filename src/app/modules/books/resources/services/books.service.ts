 import { Observable, catchError, concatMap, firstValueFrom, of, switchMap, take } from "rxjs";
import { Store } from "@ngrx/store";
import { Book } from "../models/book";
import { MocksKeys } from "../../../../shared/constants/constants";
import { ApiResponce } from "../../../../shared/models/apiResponce";
import * as AuthSelectors from "../../../auth/resources/store/auth.selectors";

export class BooksService implements BooksServiceInterface  {
    static $inject = ['store','mocksConstants'];
    store:Store;
    mocksKeys:MocksKeys;

    constructor(store,mocksConstants) {
        this.store = store;
        this.mocksKeys = mocksConstants;
        const books = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS)) as Book[];
        if (!books || books.length === 0){
            this.generateMockBooks();
        }
    }

    addBook(book:Book):Observable<ApiResponce<null>>{
        const responce:ApiResponce<null> = {
            success:false,
            errors:[]
        } 

        let books = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS)) as Book[];
        if(!books){
            return of({...responce, errors:['connection error']});
        }

        return this.store.select(AuthSelectors.selectUser).pipe(
            take(1),
            switchMap(user => {
                book.owner = user.name
                book.id = books.length + 1;
                book.available = true;  
                books.push(book);
                localStorage.setItem(this.mocksKeys.BOOKS, JSON.stringify(books));
                return of({...responce, success:true});
            }),
            catchError(error => {
                return of({...responce, errors:['connection error']})
            })
        )
        
    }

    editBook(book:Book):Observable<ApiResponce<null>>{

        const responce:ApiResponce<null> = {
            success:false,
            errors:[]
        } 

        const books = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS)) as Book[];
        if(!books){
            return of({...responce, errors:['connection error']});
        }

        const editBookIndex = books.findIndex(x => x.id === book.id);   
        if(!editBookIndex){
            return of({...responce, errors:['book not exist']}); 
        }

        books[editBookIndex] = book;
        localStorage.setItem(this.mocksKeys.BOOKS, JSON.stringify(books));

        return of({...responce, success:true});
        
    }

    getBooks():Observable<ApiResponce<Book[]>>{

        const responce:ApiResponce<Book[]> = {
            success:false,
            errors:[]
        } 

        let books = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS)) as Book[];
        if(!books){
            return of({...responce, errors:['connection error']});
        }

/*         let reserves = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS_RESERVES)) as Reserve[];  
        if (reserves){
            this.joinReservesToBooks(books,reserves);
        }      */


        return of({...responce, success:true, data:books});
    }

/*     joinReservesToBooks(books:Book[],reserves:Reserve[]){
        for (const reserve of reserves) {
            const bookIndex = books.findIndex(x => x.id === reserve.bookid);
            if(!bookIndex){
                continue;
            }

            books[bookIndex].available = false;
        }
    } */

    reserveBook(bookId:number, reserve?:boolean):Observable<ApiResponce<null>>{
        
        if (reserve === undefined) {
            reserve = true; 
          }
        
        const responce:ApiResponce<null> = {
            success:false,
            errors:[]
        } 

        let books = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS)) as Book[];
        if(!books){
            return of({...responce, errors:['connection error']});
        }

        return this.store.select(AuthSelectors.selectUser).pipe(
            take(1),
            concatMap((user) => {
                const bookindex = books.findIndex(x => x.id === bookId);
                if(!bookindex){
                    return of({...responce, errors:['book not found']});                            
                }
                books[bookindex].available = !reserve;
                books[bookindex].reservedBy = reserve ? user.name : null;
                localStorage.setItem(this.mocksKeys.BOOKS, JSON.stringify(books));
                return of({...responce, success:true});
            }),
            catchError((error) => {
                return of({...responce, error:error})
            })
        );

    }

    generateMockBooks(){

        const books:Book[] = [
            {id:1, name: "The Lord of the Rings", author:"Tolkien", publishingHouse:'pb h #1', yearOfPublishing: 2010, owner:'user1',available:true},
            {id:2, name: "A Song of Ice and Fire", author:"George Martin", publishingHouse:'pb h #1', yearOfPublishing: 2010, owner:'user1',available:true},
            {id:3, name: "Jonathan Strange & Mr Norrell", author:"Susanna Clarke", publishingHouse:'pb h #1', yearOfPublishing: 2011, owner:'user2',available:true},
            {id:4, name: "American Gods", author:"Neil Gaiman", publishingHouse:'pb h #1', yearOfPublishing: 2011, owner:'user2',available:true},
            {id:5, name: "Assassin’s Apprentice", author:"Robin Hobb", publishingHouse:'pb h #1', yearOfPublishing: 2012, owner:'user3',available:true},
            {id:6, name: "Murder on the Orient Express", author:"Agatha Christie", publishingHouse:'pb h #1', yearOfPublishing: 2012, owner:'user3',available:true},
            {id:7, name: "The Hound of the Baskervilles", author:"Arthur Conan Doyle", publishingHouse:'pb h #1', yearOfPublishing: 2013, owner:'user4',available:true},
            {id:8, name: "The Maltese Falcon", author:"Dashiell Hammett", publishingHouse:'pb h #1', yearOfPublishing: 2013, owner:'user4',available:true},
            {id:9, name: "The Big Sleep", author:"Raymond Chandler", publishingHouse:'pb h #1', yearOfPublishing: 2014, owner:'user5',available:true},
            {id:10, name: "The Name of the Rose", author:"Umberto Eco", publishingHouse:'pb h #1', yearOfPublishing: 2014, owner:'user5',available:true}
        ];
   
        localStorage.setItem(this.mocksKeys.BOOKS, JSON.stringify(books));

    }

}

export interface BooksServiceInterface{
    addBook(book:Book):Observable<ApiResponce<null>>;
    editBook(book:Book):Observable<ApiResponce<null>>;
    getBooks():Observable<ApiResponce<Book[]>>;
    reserveBook(bookId:number, reserve?:boolean):Observable<ApiResponce<null>>
}

