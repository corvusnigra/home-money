import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {BillService} from "../shared/services/bill.service";
import {Bill} from "./models/bill.model";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'wfm-bill-page',
    templateUrl: './bill-page.component.html',
    styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
    sub1: Subscription;
    sub2: Subscription;
    currency: any;
    bill: Bill;
    isLoaded = false;

    constructor(private billService: BillService) {
    }

    ngOnInit() {
        this.sub1 = Observable.combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency()
        ).subscribe((data: [Bill, any]) => {
            this.currency = data[1];
            this.bill = data[0];
            this.isLoaded = true;
        });
    }

    onRefresh() {
        this.isLoaded = false;
        this.billService.getCurrency()
            .delay(2000)
            .subscribe((currency: any) => {
                this.currency = currency;
                this.isLoaded = true;
            });

    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
    }


}
