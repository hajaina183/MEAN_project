import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { BrowserModule  } from '@angular/platform-browser';
import { CommonModule, } from '@angular/common';

const routes: Routes = [
  { path: "", component: InscriptionComponent},
  { path: "navbar", component: NavbarComponent},
  
];

@NgModule({
  imports: [CommonModule,BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
