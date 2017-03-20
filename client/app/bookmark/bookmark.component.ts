import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';

import {
    Bookmark,
    User
} from '../_models/index';
import {
    BookmarkService,
    UserService,
    AlertService
} from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'bookmark.component.html'
})

export class BookmarkComponent implements OnInit {
    public isRequesting: boolean;
    currentUser: User;
    bookmark: Bookmark;
    id: string;
    btnLabel: string;

    constructor(
        private userService: UserService,
        private bookmarkService: BookmarkService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.bookmark = new Bookmark;
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        if (this.id !== 'new') {
            this.getBookmark(this.id);
            this.btnLabel = 'Update';
        } else {
            this.btnLabel = 'Create';
        }
    }

    save(bookmark: Bookmark) {
        if (this.bookmark._id) {
            this.bookmarkService.update(this.bookmark).subscribe(response => {
                this.alertService.success("bookmark saved successfully!", true);
                this.router.navigate(['/bookmarks']);
            });
        } else {
            this.bookmarkService.create(bookmark).subscribe(response => {
                this.alertService.success("bookmark saved successfully!", true);
                this.router.navigate(['/bookmarks']);
            });
        }
    }


    private getBookmark(id: string) {
        this.isRequesting = true;
        this.bookmarkService.getById(id).subscribe(response => 
            this.bookmark = response,
            () => this.stopRefreshing(),
            () => this.stopRefreshing()
        );
    }

    private stopRefreshing() {
        this.isRequesting = false;
    }
}