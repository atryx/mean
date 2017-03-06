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

    private flatten(array: any, parentId: number, returnArray:any) {
        var bookmark = {
            id: Number,
            name: String,
            type: String,
            date_added: Date,
            date_modified: Date,
            parentId: Number
        };
        if (array.length > 0) {
            for (var index = 0; index < array.length; index++) {
                bookmark.id = array[index].id;
                bookmark.name = array[index].name;
                bookmark.type = array[index].type;
                bookmark.date_added = array[index].date_added;
                bookmark.date_modified = array[index].date_modified;
                //  bookmark.parentId = parentId;
                returnArray.push(bookmark);
                if (array[index].children && array[index].children.length > 0) {
                    for (var i = 0; i < array[index].children.length; i++) {
                        this.flatten(array[index].children[i], array[index].id, returnArray);
                    }
                }

            }
        }
        return returnArray;
    }
}