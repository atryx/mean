import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Bookmark, User } from '../_models/index';
import { BookmarkService, UserService, MockService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmarks.component.html'
})

export class BookmarksComponent implements OnInit {
    currentUser: User;
    bookmarks: Bookmark[] = [];
    bookmarks_bar: Bookmark[] = [];
    other: Bookmark[] = [];

    constructor(private userService: UserService, private bookmarkService: BookmarkService, private mockService: MockService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllBookmarks();
    }

    deleteBookmark(_id: string) {
        this.bookmarkService.delete(_id).subscribe(() => { this.loadAllBookmarks() });
    }

    private loadAllBookmarks() {
        this.mockService.getAll().subscribe(bookmarks => { 
            this.bookmarks_bar = this.flatten(bookmarks.roots.bookmark_bar, null, this.bookmarks_bar); 
            this.other = this.flatten(bookmarks.roots.other, null, this.other);
            this.bookmarks = this.bookmarks_bar.concat(this.other);
            // this.bookmarks_bar.forEach( element => {
            //     this.createBookmark(element);
            // });
            // this.other.forEach( element => {
            //     this.createBookmark(element);
            // });
            console.log(this.bookmarks);
        });
    }

    private createBookmark(bookmark: Bookmark) {
        this.bookmarkService.create(bookmark).subscribe(response => {});
    }

    private flatten(array: any, parentId: number, returnArray:any) {
        var bookmark = new Bookmark();

        if(array instanceof Array) {
            array.forEach(element => { 
                for (var i = 0; i < element.length; i++) {
                    this.flatten(element[i], array[i].id, returnArray);
                }
            });
        } else if(array.children && array.children.length > 0) { 
            for (var i = 0; i < array.children.length; i++) {
                    this.flatten(array.children[i], array.id, returnArray);
                }
        } 
        else {
            bookmark._id = array.id;
            bookmark.name = array.name;
            bookmark.type = array.type;
            bookmark.date_added = array.date_added;
            bookmark.date_modified = array.date_modified;
            bookmark.parentId = parentId;
            returnArray.push(bookmark);
        }
        return returnArray;
    }
}
