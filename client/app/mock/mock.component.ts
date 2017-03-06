import { Component, OnInit } from '@angular/core';

import { MockService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'mock.component.html'
})

export class MockComponent implements OnInit {
    people: any;

    constructor(private mockService: MockService) { }

    ngOnInit() {
        this.loadFakeData();
    }

    private loadFakeData() {
        this.mockService.getAll().subscribe(mock => { this.people = mock.roots.bookmark_bar.children; });
    }
}
