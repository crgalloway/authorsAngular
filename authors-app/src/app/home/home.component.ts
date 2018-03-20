import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	authorList = []
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }
	ngOnInit() {
		this.getAuthors()
	}
	getAuthors(){
		this._httpService.getAuthors().subscribe(data=>{
			this.authorList = data['data']
		})
	}
	deleteAuthor(id){
		this._httpService.deleteAuthor(id).subscribe()
		this.getAuthors()
	}
	editAuthor(id){
		this._router.navigate(['/edit/'+id])
	}
	goHome(){
		this._router.navigate(['/'])
	}
	goNew(){
		this._router.navigate(['/new'])
	}
	viewQuotes(id){
		this._router.navigate(['/quotes/'+id])
	}
}