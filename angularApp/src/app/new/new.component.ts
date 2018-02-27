import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct: any;
  errMessage: any;

  constructor(
	  private _httpService: HttpService,
	  private _router: Router
	) { }

  ngOnInit() {
	  this.newProduct = { name: "", quantity: "", price: "" }
}

  onSubmit(){
	  let observable = this._httpService.addProduct(this.newProduct);
	  observable.subscribe(data => {
		  if(data["error"]) {
			  console.log(data["error"]);
			  this.errMessage = data['error'];
		  } else {
			this.newProduct = { name: "", quantity: "", price: "" }
			console.log("Got a new product", data);
			this._router.navigate(['/products']);
		  }
	  })
  }


}
