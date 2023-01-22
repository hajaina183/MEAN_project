import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjoutVoitureComponent } from './ajout-voiture/ajout-voiture.component';
import { BrowserModule  } from '@angular/platform-browser';
import { CommonModule, } from '@angular/common';

const routes: Routes = [
  { path: "", component: InscriptionComponent},
  { path: "navbar", component: NavbarComponent},
  { path: "ajout-voiture", component: AjoutVoitureComponent}
  
];

@NgModule({
  imports: [CommonModule,BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
