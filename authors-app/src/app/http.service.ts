import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	constructor(private _http: HttpClient) { }
	getAuthors(){
		return this._http.get('/authors');
	}
	createAuthor(newAuthor){
		return this._http.post('/authors', newAuthor)
	}
	deleteAuthor(id){
		return this._http.delete('/authors/'+id)
	}
	getAuthor(id){
		return this._http.get('/authors/'+id)
	}
	updateAuthor(author){
		return this._http.put('/authors/'+author._id, author)
	}
}
