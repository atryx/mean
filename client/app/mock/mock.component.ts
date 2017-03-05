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
        this.mockService.getAll().map(response  => { 
            console.log(response);
            console.log(response.people);
            this.people = response; });
    }
}