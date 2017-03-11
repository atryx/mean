import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bookmark, User } from '../_models/index';
import { BookmarkService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmark.component.html'
})

export class BookmarkComponent implements OnInit{
    currentUser: User;
    bookmark: Bookmark;
    id: string;

    constructor(private userService: UserService, private bookmarkService: BookmarkService, private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.bookmark = new Bookmark;
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.getBookmark(this.id);
    }

    private getBookmark(id: string) {
        this.bookmarkService.getById(id).subscribe(response => { this.bookmark = response; console.log(this.bookmark);});
    }

    private createBookmark(bookmark: Bookmark) {
        this.bookmarkService.create(bookmark).subscribe(response => {console.log(response)});
    }
    
}