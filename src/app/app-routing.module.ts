import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CPanelComponent } from './components/cpanel/cpanel.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { UserComponent } from './components/user/user.component';
import { VerifyProdNameAndIdGuard } from './guards/verify-prod-name-and-id.guard';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'cpanel', component: CPanelComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LogInComponent, canActivate: [UnauthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UnauthGuard]},
  {path: 'product/:name/:id', component: ProductDetailsComponent, canActivate: [VerifyProdNameAndIdGuard]},
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
