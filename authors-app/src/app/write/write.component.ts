import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-write',
	templateUrl: './write.component.html',
	styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
	author:String
	newQuote:Object
	error = ""
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.newQuote = {quote: ""}
		this._route.params.subscribe((params: Params) => {
			this.getAuthor(params['id'])
		})
	}

	ngOnInit() {
		
	}
	goHome(){
		this._router.navigate(['/'])
	}
	viewQuotes(id){
		this._router.navigate(['/quotes/'+id])
	}
	getAuthor(id){
		this._httpService.getAuthor(id).subscribe(data=>{
			this.author = data['data']
		})
	}
	onSubmit(id){
		this._httpService.addToQuotes(id, this.newQuote).subscribe(data=>{
			if(data['error']){
				this.error = data['error']
			}
			else{
				this.viewQuotes(id)
			}
			
		})
	}
}