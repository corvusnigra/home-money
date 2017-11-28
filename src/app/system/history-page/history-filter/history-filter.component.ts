import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'wfm-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

    @Output() onFilterCancel = new EventEmitter<any>();
    @Output() onFilterApply = new EventEmitter<any>();
    timePeriods = [
        {type: 'd', label: 'День'},
        {type: 'w', label: 'Неделя'},
        {type: 'M', label: 'Месяц'}
    ];
    selectedPeriod = 'd';

    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
        ]

    constructor() {
    }

    filterClose() {
        this.onFilterCancel.emit();
    }

    handleChangeType(target) {

    }

    ngOnInit() {
    }

}
