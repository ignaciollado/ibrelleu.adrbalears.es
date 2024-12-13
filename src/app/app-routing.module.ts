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
import { SuccessStoriesComponent } from './successStories/success-stories/success-stories.component';
import { SuccessStoriesDetailComponent } from './successStories/success-stories-detail/success-stories-detail.component';
import { SignUpExternalUserComponent } from './sign-up-external-user/sign-up-external-user.component';

const routes: Routes = [
  { path: 'home', component: BodyComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'body', component: BodyComponent },
  { path: 'accounts', component: AccountComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact-detail/:id', component: ContactDetailComponent},
  { path: 'account-detail/:id', component: AccountDetailComponent},
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'success-stories', component: SuccessStoriesComponent},
  { path: 'success-stories-detail/:id', component: SuccessStoriesDetailComponent},
  { path: 'sign-up-external-user', component: SignUpExternalUserComponent},
  { path: '', redirectTo: '/body', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
