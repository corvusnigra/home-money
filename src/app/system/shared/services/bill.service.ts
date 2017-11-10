import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

import {Bill} from "../../bill-page/models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";


@Injectable()
export class BillService extends BaseApi{
    constructor(
        public http: Http
    ){
        super(http);
    }


    getBill(): Observable<Bill>{
        return this.get('bill');
    }

    getCurrency(base: string = 'RUB'): Observable<any>{
        return this.http.get(`https://api.fixer.io/latest?base=${base}`)
            .map((response: Response) => response.json())
    }
}