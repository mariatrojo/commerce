import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	theProduct = {name: ""};
	productID: any;
	errMessage: any;

  constructor(
	private _httpService: HttpService, 
	private _router: Router, 
	private _route: ActivatedRoute
  ) { }

  ngOnInit() {
	this._route.params.subscribe((params: Params) => {
		console.log(params['id']);
		this.getTheProduct(params['id']);
		this.productID = params['id'];
	})
  }

  getTheProduct(ID) {
	let observable = this._httpService.getOneProductID(ID);
	observable.subscribe(data => {
		this.theProduct = data['data'];
		console.log('Hi this is from getThePet', this.theProduct);
	})
	}

	onEditSubmit(){
		console.log(this.productID);
		this._httpService.editProduct(this._httpService.productID, this.theProduct).subscribe(data => {
			if(data["error"]){
				console.log("There's a problem in edit component", data["error"]);
				this.errMessage = data["error"];
			} else {
				console.log(data['db']);
				//Update fix: works once we add the Router module to redirect
				this._router.navigate(['/products']);
			}
		})
	}

}
