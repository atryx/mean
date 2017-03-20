import { Component, OnInit } from '@angular/core';

import { Menu } from '../_models/menu';


@Component({
    moduleId: module.id,
    selector: 'my-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    menus: Menu[];

    constructor() {
        this.menus = [{id: 1, name:"Users", address: "/users", active: false},
        {id: 1, name: 'Bookmarks', address: "/bookmarks", active: true}];
    }

    ngOnInit() {
    }
}