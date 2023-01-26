import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjoutVoitureComponent } from './ajout-voiture/ajout-voiture.component';
import { ListeVoitureComponent } from './liste-voiture/liste-voiture.component';
import { DetailsComponent } from './details/details.component';
import { FactureComponent } from './facture/facture.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PagedirigeantComponent } from './pagedirigeant/pagedirigeant.component';
import { HistoriqueComponent } from './historique/historique.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InscriptionComponent,
    AjoutVoitureComponent,
    ListeVoitureComponent,
    DetailsComponent,
    PagedirigeantComponent,
    FactureComponent,
    PaiementComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
