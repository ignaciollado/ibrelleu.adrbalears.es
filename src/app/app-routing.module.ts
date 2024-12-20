import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { AuthGuard } from './auth.guard';
import { ProtectedComponent } from './Protected/protected/protected.component';
import { BodyComponent } from './Body/body/body.component';
import { AccountComponent } from './Protected/account/account.component';
import { ContactsComponent } from './Protected/contacts/contacts.component';
import { AccountDetailComponent } from './Protected/account-detail/account-detail.component';
import { ContactDetailComponent } from './Protected/contact-detail/contact-detail.component';
import { SuccessStoriesComponent } from './success-stories/success-stories/success-stories.component';
import { SuccessStoriesDetailComponent } from './success-stories/success-stories-detail/success-stories-detail.component';
import { SignUpExternalUserComponent } from './sign-up-external-user/sign-up-external-user.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  { path: 'home', component: BodyComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'body', component: BodyComponent },
  { path: 'accounts', component: AccountComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact-detail/:id', component: ContactDetailComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'account-detail/:id', component: AccountDetailComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'success-stories', component: SuccessStoriesComponent},
  { path: 'success-stories-detail/:id', component: SuccessStoriesDetailComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'sign-up-external-user', component: SignUpExternalUserComponent},
  { path: '', redirectTo: '/body', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
