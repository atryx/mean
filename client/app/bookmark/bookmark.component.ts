import { Component, OnInit } from '@angular/core';

import { Bookmark, User } from '../_models/index';
import { BookmarkService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmark.component.html'
})

export class BookmarkComponent implements OnInit{
    currentUser: User;
    bookmark: Bookmark = {_id: "1",name: "the name of the bookmark", url: "test", desc: "something bla bla", 
    type: "url", date_added: null, date_modified: null, parentId: null };

    constructor(private userService: UserService, private bookmarkService: BookmarkService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.createBookmark(this.bookmark);
    }

    private createBookmark(bookmark: Bookmark) {
        this.bookmarkService.create(bookmark).subscribe(response => {console.log(response)});
    }
    
}