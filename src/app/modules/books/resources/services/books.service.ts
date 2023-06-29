 import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { Book } from "../models/book";
import { MocksKeys } from "src/app/shared/constants/constants";
import { bookApiResponce } from "../models/bookApiResponce";


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

    addBook(book:Book):Observable<bookApiResponce>{
        const responce:bookApiResponce = {
            success:false,
            errors:[]
        } 

        let books = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS)) as Book[];
        if(!books){
            return of({...responce, errors:['connection error']});
        }

        book.Id = books.length + 1;
        
        localStorage.setItem(this.mocksKeys.BOOKS, JSON.stringify(books.push(book)));
        return of({...responce, success:true});
    }

    editBook(book:Book){

        const responce:bookApiResponce = {
            success:false,
            errors:[]
        } 

        const books = JSON.parse(localStorage.getItem(this.mocksKeys.BOOKS)) as Book[];
        if(!books){
            return of({...responce, errors:['connection error']});
        }

        const editBookIndex = books.findIndex(x => x.Id === book.Id);   
        if(!editBookIndex){
            return of({...responce, errors:['book not exist']}); 
        }

        books[editBookIndex] = book;
        localStorage.setItem(this.mocksKeys.BOOKS, JSON.stringify(books));

        return of({...responce, success:true});
        
    }

    generateMockBooks(){

        const books:Book[] = [
            {Id:1, name: "The Lord of the Rings", author:"Tolkien", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user1'},
            {Id:2, name: "A Song of Ice and Fire", author:"George Martin", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user1'},
            {Id:3, name: "Jonathan Strange & Mr Norrell", author:"Susanna Clarke", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user2'},
            {Id:4, name: "American Gods", author:"Neil Gaiman", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user2'},
            {Id:5, name: "Assassin’s Apprentice", author:"Robin Hobb", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user3'},
            {Id:6, name: "Murder on the Orient Express", author:"Agatha Christie", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user3'},
            {Id:7, name: "The Hound of the Baskervilles", author:"Arthur Conan Doyle", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user4'},
            {Id:8, name: "The Maltese Falcon", author:"Dashiell Hammett", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user4'},
            {Id:9, name: "The Big Sleep", author:"Raymond Chandler", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user5'},
            {Id:10, name: "The Name of the Rose", author:"Umberto Eco", publishingHouse:'pb h #1', yearOfPublishing: new Date(2010,1,1), owner:'user5'}
        ];
        localStorage.setItem(this.mocksKeys.BOOKS, JSON.stringify(books));

    }

}

export interface BooksServiceInterface{

}

