import {
    Component,
    OnInit
} from '@angular/core';
import {
    Observable
} from 'rxjs/Rx';
import {
    Router
} from '@angular/router';

import {
    Bookmark,
    User
} from '../_models/index';
import {
    BookmarkService,
    UserService
} from '../_services/index';
import {
    SpinnerComponent
} from '../_directives/spinner.component';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmarks.component.html',
})

export class BookmarksComponent implements OnInit {
    public isRequesting: boolean;
    currentUser: User;
    bookmarks: Bookmark[] = [];

    constructor(
        private userService: UserService,
        private bookmarkService: BookmarkService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllBookmarks();
    }
    onSelect(bookmark: Bookmark) {
        this.router.navigate(['/bookmarks', bookmark._id]);
    }

    deleteBookmark(_id: string) {
        this.bookmarkService.delete(_id).subscribe(() => {
            this.loadAllBookmarks()
        });
    }

    private loadAllBookmarks() {
        this.isRequesting = true;
        this.bookmarkService.getAll().subscribe(bookmarks =>
            this.bookmarks = bookmarks,
            () => this.stopRefreshing(),
            () => this.stopRefreshing()
        );
    }

    private stopRefreshing() {
        this.isRequesting = false;
    }
}