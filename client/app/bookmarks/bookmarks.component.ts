import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Bookmark, User } from '../_models/index';
import { BookmarkService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmarks.component.html'
})

export class BookmarksComponent implements OnInit {
    currentUser: User;
    bookmarks: Bookmark[] = [];
    bookmarks_bar: Bookmark[] = [];
    other: Bookmark[] = [];

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
        this.bookmarkService.delete(_id).subscribe(() => { this.loadAllBookmarks() });
    }

    private loadAllBookmarks() {
        this.bookmarkService.getAll().subscribe(bookmarks => { 
            this.bookmarks = bookmarks;
        });
    }
}
