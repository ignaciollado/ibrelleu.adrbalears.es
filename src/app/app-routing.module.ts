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
import { ShowGenericDataComponent } from './generic/show-generic-data/show-generic-data.component';
import { GrantorProjectsComponent } from './Protected/grantor-projects/grantor-projects.component';
import { GrantorProjectDetailComponent } from './Protected/grantor-project-detail/grantor-project-detail.component';
import { DocumentComponent } from './Protected/document/document.component';
import { IbrelleuProjectsComponent } from './Protected/ibrelleu-projects/ibrelleu-projects.component';
import { IbrelleuProjectDetailComponent } from './Protected/ibrelleu-project-detail/ibrelleu-project-detail.component';

const routes: Routes = [
  { path: 'home', component: DocumentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: BodyComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: BodyComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: BodyComponent, canActivate: [AuthGuard] },

  { path: 'body', component: BodyComponent },
  { path: 'accounts', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  {
    path: 'contact-detail/:id',
    component: ContactDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'account-detail/:id',
    component: AccountDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'grantor-projects',
    component: GrantorProjectsComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'grantor-project-detail/:id',
    component: GrantorProjectDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'ibrelleu-projects',
    component: IbrelleuProjectsComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'ibrelleu-project-detail/:id',
    component: IbrelleuProjectDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'success-stories',
    component: SuccessStoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'success-stories-detail/:id',
    component: SuccessStoriesDetailComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  { path: 'sign-up', component: SignUpExternalUserComponent },

  { path: 'accesibilidad/:id', component: ShowGenericDataComponent },

  { path: '', redirectTo: '/body', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
