import {NgForm} from "@angular/forms";
import {Component, Input, OnInit} from '@angular/core';

import {Category} from "../../shared/models/category.model";
import {WFMEvent} from "../../shared/models/event.model";
import * as momemt from "moment";
import {EventService} from "../../shared/services/event.service";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../bill-page/models/bill.model";
import {Message} from "../../../shared/models/message.model";

@Component({
    selector: 'wfm-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

    @Input() categories: Category[] = [];
    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
    ];
    message: Message;

    constructor(private eventService: EventService,
                private billService: BillService) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
    }

    showMessage(text: string) {
        this.message.text = text;
        setTimeout(() => this.message.text = '', 5000);
    }

    onSubmit(form: NgForm) {
        let {type, amount, description, category} = form.value;

        const event = new WFMEvent(type, amount, +category, momemt().format('DD.MM.YYYY HH:mm:ss'), description);
        console.log(event)
        this.billService.getBill()
            .subscribe((bill: Bill) => {
                let value = 0;
                if (type === 'outcome') {
                    if (bill.value < amount) {
                        this.showMessage(`Недостатончо денег нехватает ${amount - bill.value}`);
                    } else {
                        value = bill.value - amount;
                    }

                } else {
                    value = bill.value + amount;
                }
                this.billService.updateBill({value, currency: bill.currency})
                    .mergeMap(() => this.eventService.addEvent(event))
                    .subscribe(() => {
                        form.setValue({
                            amount: 0,
                            category: 1,
                            type: 'outcome',
                            description: ' '
                        })
                    });
            })

    }

}
