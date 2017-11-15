import {Injectable} from "@angular/core";

import {BaseApi} from "../../../shared/core/base-api";
import {Http} from "@angular/http";
import {WFMEvent} from "../models/event.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EventService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    addEvent(event: WFMEvent): Observable<WFMEvent> {
        return this.post('events', event);
    }
}