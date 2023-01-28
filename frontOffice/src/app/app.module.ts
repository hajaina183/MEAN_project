import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
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
import { FooterComponent } from './footer/footer.component';
import { NoopInterceptor } from './NoopInterceptor..interceptor';


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
    HistoriqueComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
