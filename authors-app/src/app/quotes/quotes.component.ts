import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-quotes',
	templateUrl: './quotes.component.html',
	styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
	author:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this._route.params.subscribe((params: Params) => {
			this.getQuotes(params['id'])
		})
	}

	ngOnInit() {
	}
	goHome(){
		this._router.navigate(['/'])
	}
	writeQuote(id){
		this._router.navigate(['/write/'+id])
	}
	getQuotes(id){
		this._httpService.getAuthor(id).subscribe(data=>{
			this.author = data['data']
		})
	}
	voteChange(id, idx, delta){
		this._httpService.voteChange(id, idx, delta).subscribe(data=>{
			this.getQuotes(id)
		})
	}
	quoteRemove(id, idx){
		this._httpService.quoteRemove(id, idx).subscribe(data=>{
			this.getQuotes(id)
		})
	}
}