import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'; 
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './User/register/register.component';
import { LoginComponent } from './User/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule} from '@angular/material/select';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatRadioModule } from '@angular/material/radio'; 
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
import { SuccessStoriesComponent } from './successStories/success-stories/success-stories.component';
import { SuccessStoriesDetailComponent } from './successStories/success-stories-detail/success-stories-detail.component';
import { SignUpExternalUserComponent } from './sign-up-external-user/sign-up-external-user.component';
export function HttpLoaderFactory(http: HttpClient) { return new TranslateHttpLoader(http);}

@NgModule({
  declarations: [
    AppComponent,
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
    SignUpExternalUserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,

    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSelectModule,
    CdkAccordionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    HttpClientModule, 
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] }})
  ],

  providers: [
    provideAnimationsAsync()
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
