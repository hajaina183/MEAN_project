import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  imports: [
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
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
    DetailsComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
