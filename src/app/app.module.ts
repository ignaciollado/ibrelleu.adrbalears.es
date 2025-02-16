import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { I18nModule } from './i18n/i18n.module';

import { RegisterComponent } from './User/register/register.component';
import { LoginComponent } from './User/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { ProtectedComponent } from './Protected/protected/protected.component';
import { HeaderComponent } from './Header/header/header.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { BodyComponent } from './Body/body/body.component';
import { AccountComponent } from './Protected/account/account.component';
import { ContactsComponent } from './Protected/contacts/contacts.component';
import { ContactDetailComponent } from './Protected/contact-detail/contact-detail.component';
import { AccountDetailComponent } from './Protected/account-detail/account-detail.component';
import { FileUploadComponent } from './Protected/file-upload/file-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SuccessStoriesComponent } from './success-stories/success-stories/success-stories.component';
import { SuccessStoriesDetailComponent } from './success-stories/success-stories-detail/success-stories-detail.component';
import { SignUpExternalUserComponent } from './sign-up-external-user/sign-up-external-user.component';
import { ShowGenericDataComponent } from './generic/show-generic-data/show-generic-data.component';
import { GrantorProjectsComponent } from './Protected/grantor-projects/grantor-projects.component';

// Locale para el formateo de Date y de Currency
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { GrantorProjectDetailComponent } from './Protected/grantor-project-detail/grantor-project-detail.component';
import { DocumentComponent } from './Protected/document/document.component';
import { IbrelleuProjectsComponent } from './Protected/ibrelleu-projects/ibrelleu-projects.component';
import { IbrelleuProjectDetailComponent } from './Protected/ibrelleu-project-detail/ibrelleu-project-detail.component';
import { InterestComponent } from './Protected/interest/interest.component';
import { InterestDetailComponent } from './Protected/interest-detail/interest-detail.component';
import { AdvertisementsComponent } from './Protected/advertisements/advertisements.component';
import { AdvertisementDetailComponent } from './Protected/advertisement-detail/advertisement-detail.component';

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// Locale para el formateo de Date y de Currency
registerLocaleData(localeES, 'es-ES');

@NgModule({
  declarations: [
    AppComponent,
    SelectLanguageComponent,
    RegisterComponent,
    LoginComponent,
    ProtectedComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    AccountComponent,
    ContactsComponent,
    ContactDetailComponent,
    AccountDetailComponent,
    FileUploadComponent,
    SuccessStoriesComponent,
    SuccessStoriesDetailComponent,
    SignUpExternalUserComponent,
    ShowGenericDataComponent,
    GrantorProjectsComponent,
    GrantorProjectDetailComponent,
    DocumentComponent,
    IbrelleuProjectsComponent,
    IbrelleuProjectDetailComponent,
    InterestComponent,
    InterestDetailComponent,
    AdvertisementsComponent,
    AdvertisementDetailComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,

    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSelectModule,
    MatAutocompleteModule,
    CdkAccordionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    CdkMenuModule,
    CdkMenuTrigger,
    MatProgressBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    I18nModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [
          'datalogger.industrialocalsostenible.com',
          'jwt.idi.es',
        ],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
    RouterModule.forRoot([]),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [provideAnimationsAsync()],

  bootstrap: [AppComponent],
})
export class AppModule { }
