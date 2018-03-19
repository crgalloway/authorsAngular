import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-new',
	templateUrl: './new.component.html',
	styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newAuthor: any
	error = ""
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }
	ngOnInit() {
		this.newAuthor = { name: "" }
	}
	onSubmit(){
		this._httpService.createAuthor(this.newAuthor).subscribe(data =>{
			if(data['error']){
				this.error = data['error']['errors']['name']['message']
			}
			else{
				this.newAuthor = { name: ""}
				this.goHome()
			}
		})
	}
	goHome(){
		this._router.navigate(['/'])
	}
}
