import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	products: any;
	theProduct: any;
	productID: any;
	item: any;
	buttonDisabled: boolean;

  constructor(
	  private _httpService: HttpService,
	  private _router: Router,
	  private _route: ActivatedRoute,
	) { }

  ngOnInit() {
	this._route.params.subscribe((params: Params) => {
		console.log(params['id']);
		this.getAProduct(params['id']);
		this.productID = params['id'];
	})
  }
  getAProduct(id) {
	  let observable = this._httpService.getOneProductID(id);
	  observable.subscribe( data => {
		this.theProduct = data['data'];
		console.log('This is from getAProduct in details component', this.theProduct);
	  })
  }

  onDeleteButtonClick(id) {
	let observable = this._httpService.deleteProduct(id);
	observable.subscribe(data => {
		if(data["error"]) {
			console.log(data["error"]);
		} else {
			console.log("Deleted a product", data);
			this._router.navigate(['/products']);
		}
	});
	}

}
