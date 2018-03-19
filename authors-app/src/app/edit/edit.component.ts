import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	authorName:any
	error = ""
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.authorName = { name: "" }
	}
	ngOnInit() {
		this._route.params.subscribe((params: Params) => {
			this.getAuthor(params['id'])
		})
	}
	getAuthor(id){
		this._httpService.getAuthor(id).subscribe(data=>{
			this.authorName = data['data']
		})
	}
	goHome(){
		this._router.navigate(['/'])
	}
	onSubmit(){
		if(this.authorName.name.length <= 3){
			this.error = "Author names must be longer than 3 letters"
		}
		else{
			this._httpService.updateAuthor(this.authorName).subscribe()
			this.authorName = { name: ""}
			this.goHome()
		}
	}
}
