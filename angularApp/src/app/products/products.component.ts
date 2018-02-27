import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ShowComponent implements OnInit {
	products: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
	  this.getProductsFromService();
  }

  getProductsFromService() {
	let observable = this._httpService.getProducts();
	observable.subscribe(data => {
		console.log("Got our products!", data)
		this.products = data['items'];
	})
  }

  saveIDtoService(productID){
    this._httpService.productID = productID
    console.log("ID got saved", productID)
  }

}
