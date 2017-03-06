import { Component, OnInit } from '@angular/core';

import { Bookmark, User } from '../_models/index';
import { BookmarkService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmarks.component.html'
})

export class BookmarksComponent implements OnInit {
    currentUser: User;
    bookmarks: Bookmark[] = [];

    constructor(private userService: UserService, private bookmarkService: BookmarkService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllBookmarks();
    }

    deleteBookmark(_id: string) {
        this.bookmarkService.delete(_id).subscribe(() => { this.loadAllBookmarks() });
    }

    private loadAllBookmarks() {
        this.bookmarkService.getAll().subscribe(bookmarks => { this.bookmarks = bookmarks; });
    }
}
