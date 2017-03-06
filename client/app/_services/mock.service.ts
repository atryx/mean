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
        return this.http.get("https://api.myjson.com/bins/orke1").map((response: Response) =>  response.json());
    }
}
