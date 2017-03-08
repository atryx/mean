import { Component, OnInit } from '@angular/core';

import { Bookmark, User } from '../_models/index';
import { BookmarkService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmark.component.html'
})

export class BookmarkComponent implements OnInit{
    currentUser: User;
    bookmark: Bookmark;
    id: string = "53";

    constructor(private userService: UserService, private bookmarkService: BookmarkService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // this.getBookmark(this.id);
    }

    private getBookmark(id: string) {
        this.bookmarkService.getById(id).subscribe(response => { this.bookmark = response;});
    }

    private createBookmark(bookmark: Bookmark) {
        this.bookmarkService.create(bookmark).subscribe(response => {console.log(response)});
    }
    
}