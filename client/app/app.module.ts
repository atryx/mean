import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, BookmarkService, MockService } from './_services/index';
import { HomeComponent } from './home/index';
import { BookmarksComponent } from './bookmarks/index';
import { MockComponent } from './mock/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        BookmarksComponent,
        MockComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        BookmarkService,
        MockService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }