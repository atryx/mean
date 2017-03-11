import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Bookmark } from '../_models/index';

@Injectable()
export class BookmarkService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/bookmarks', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/bookmarks/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    create(bookmark: Bookmark) {
        return this.http.post(this.config.apiUrl + '/bookmarks/new', bookmark, this.jwt());
    }

    update(bookmark: Bookmark) {
        return this.http.put(this.config.apiUrl + '/bookmarks/' + bookmark._id, bookmark, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/bookmarks/' + _id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
