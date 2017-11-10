import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {BillService} from "../shared/services/bill.service";
import {Bill} from "./models/bill.model";

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  constructor(
      private billService: BillService
  ) { }

  ngOnInit() {
    Observable.combineLatest(
        this.billService.getBill(),
        this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
        console.log(data)
    })
  }

}
