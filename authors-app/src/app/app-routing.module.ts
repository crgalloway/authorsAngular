import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
	{path: 'home', component:HomeComponent},
	{path: 'new', component:NewComponent},
	{path: 'edit/:id', component:EditComponent},
	{path: 'quotes/:id', component:QuotesComponent},
	{path: 'write/:id', component:WriteComponent},
	{ path: '**', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
