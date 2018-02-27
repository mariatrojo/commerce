import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './products/products.component';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{ path: '',
	  redirectTo: '/products',
	  pathMatch: 'full'
	 },
	{ path: 'products', component: ShowComponent },
	{ path: 'products/new', component: NewComponent },
	{ path: 'details/:id', component: DetailsComponent },
	{ path: 'products/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
