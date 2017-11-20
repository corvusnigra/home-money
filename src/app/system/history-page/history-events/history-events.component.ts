import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {WFMEvent} from "../../shared/models/event.model";

@Component({
    selector: 'wfm-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

    @Input() categories: Category[] = [];
    @Input() events: WFMEvent[] = [];
    serchValue = '';
    serchPlaceholder = 'Cумма';
    searchField = 'amount'


    constructor() {
    }

    ngOnInit() {
        this.events.forEach((e) => {
            e.catName = this.categories.find(c => c.id === e.category).name;
        })
    }

    getEventClass(e: WFMEvent) {
        return {
            'label': true,
            'label-danger': e.type === 'outcome',
            'label-success': e.type === 'income'
        };
    }

    changeCriteria(field: string) {
        const nameMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип'
        }

        this.serchPlaceholder = nameMap[field];
        this.searchField = field
    }

}
