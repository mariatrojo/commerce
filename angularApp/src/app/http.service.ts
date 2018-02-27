import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  productID: any;

  constructor(private _http: HttpClient) { }

  getProducts(){
	  return this._http.get('/items');
  }

  addProduct(newproduct) {
	  return this._http.post('/items', newproduct)
  }

  deleteProduct(id) {
	  return this._http.delete(`/items/${id}`);
  }

  getOneProductID(id){
	  return this._http.get(`/items/${id}`);
  }

  editProduct(id, product) {
	  console.log(id);
	  console.log(product);
	  return this._http.put(`/items/${id}`, product);
  }

  editPetLike(id, pet) {
	  console.log(id);
	  return this._http.put(`/likes/${id}`, pet);
  }

}
