import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { VoitureDiagnostiqueComponent } from './voiture-diagnostique/voiture-diagnostique.component';
import { DiagnostiqueComponent } from './diagnostique/diagnostique.component';
import { VoitureGarageComponent } from './voiture-garage/voiture-garage.component';
import { DetailsComponent } from './details/details.component';
import { DepenseComponent } from './depense/depense.component';
import { ValiderPaiementComponent } from './valider-paiement/valider-paiement.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ValiderSortieComponent } from './valider-sortie/valider-sortie.component';

@NgModule({
  imports: [
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    VoitureDiagnostiqueComponent,
    DiagnostiqueComponent,
    VoitureGarageComponent,
    DetailsComponent,
    DepenseComponent,
    ValiderPaiementComponent,
    StatistiqueComponent,
    ValiderSortieComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }