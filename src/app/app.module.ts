import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component'
import { FooterComponent } from './partials/footer/footer.component';
import { CPanelComponent } from './components/cpanel/cpanel.component';
import { GraphQLModule } from './graphql.module';
import { ConnectBackendService } from './services/connect-backend.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UnauthGuard } from './guards/unauth.guard';
import { UserComponent } from './components/user/user.component';
import { ModalComponent } from './partials/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    ProductDetailsComponent,
    FooterComponent,
    CPanelComponent,
    LogInComponent,
    RegisterComponent,
    NotFoundComponent,
    UserComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ConnectBackendService,
    AuthGuard,
    UnauthGuard,

    TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LocationComponent,
    IndexComponent,
    PetrolComponent,
    EnvironmentComponent,
    ContractingComponent,
    MaintenanceComponent,
    LicenceComponent,
    LoadingComponent,
    EvalToStringPipe,
    OthersComponent,
    NotFoundComponent,
    ContactUsComponent,
    ImgViewerComponent,
    SocialMediaComponent,
    PdfViewerComponent
    
    BrowserModule,
    PdfViewerModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
*/
