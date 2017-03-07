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
}