import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { BookmarksComponent } from './bookmarks/index';
import { BookmarkComponent } from './bookmark/index';
import { MockComponent } from './mock/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] },
    { path: 'bookmark/:id', component: BookmarkComponent, canActivate: [AuthGuard] },
    { path: 'bookmarks/new', component: BookmarkComponent, canActivate: [AuthGuard] },
    { path: 'mock', component: MockComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);