import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'angular-tree-component';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent, BookmarkFilterPipe, SpinnerComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, BookmarkService, MockService } from './_services/index';
import { HomeComponent } from './home/index';
import { BookmarksComponent } from './bookmarks/index';
import { BookmarkComponent } from './bookmark/index';
import { MockComponent } from './mock/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HeaderComponent } from './header/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        TreeModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        BookmarkFilterPipe,
        HomeComponent,
        HeaderComponent,
        BookmarksComponent,
        BookmarkComponent,
        MockComponent,
        LoginComponent,
        RegisterComponent,
        SpinnerComponent
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