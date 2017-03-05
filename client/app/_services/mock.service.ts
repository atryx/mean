import {
    Injectable
} from '@angular/core';
import {
    Http,
    Headers,
    RequestOptions,
    Response
} from '@angular/http';

import {
    AppConfig
} from '../app.config';

@Injectable()
export class MockService {
    constructor(private http: Http, private config: AppConfig) {   }

    getAll() {
        return this.http.get("https://jsonblob.com/80dbcde8-01d5-11e7-a0ba-b5835a5173da").map(res => res.json());
    }
}