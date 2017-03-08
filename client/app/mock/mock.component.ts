import {
    Component,
    OnInit
} from '@angular/core';

import {
    MockService
} from '../_services/index';

@Component({
    selector: 'app',
    template: '<tree-root [nodes]="nodes"></tree-root>'
})

export class MockComponent implements OnInit {
    nodes: any[];

    constructor(private mockService: MockService) {}

    ngOnInit() {
        this.loadFakeData();
    }

    private loadFakeData() {
        this.mockService.getAll().subscribe(mock => {
            // this.nodes = this.flatten(mock.roots.bookmark_bar.children, null, []);
            this.nodes = mock.roots.bookmark_bar.children;
        });
    }

    //     private flatten(array: any, parentId: number, returnArray:any) {
    //     var bookmark = new Bookmark();

    //     if(array instanceof Array) {
    //         array.forEach(element => { 
    //             for (var i = 0; i < element.length; i++) {
    //                 this.flatten(element[i], array[i].id, returnArray);
    //             }
    //         });
    //     } else if(array.children && array.children.length > 0) { 
    //         for (var i = 0; i < array.children.length; i++) {
    //                 this.flatten(array.children[i], array.id, returnArray);
    //             }
    //     } 
    //     else {
    //         bookmark._id = array.id;
    //         bookmark.name = array.name;
    //         bookmark.type = array.type;
    //         bookmark.date_added = array.date_added;
    //         bookmark.date_modified = array.date_modified;
    //         bookmark.parentId = parentId;
    //         returnArray.push(bookmark);
    //     }
    //     return returnArray;
    // }
}