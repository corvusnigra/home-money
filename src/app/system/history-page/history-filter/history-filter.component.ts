import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Category} from "../../shared/models/category.model";

@Component({
    selector: 'wfm-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

    @Output() onFilterCancel = new EventEmitter<any>();
    @Output() onFilterApply = new EventEmitter<any>();
    @Input() categories: Category[] = [];
    selectedTypes = [];
    selectedCategories = [];
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
        this.selectedTypes = [];
        this.selectedCategories = [];
        this.selectedPeriod = 'd';
        this.onFilterCancel.emit();
    }

    private calculateInputParams(field: string, value: string, checked: boolean) {
        if(checked){
            this[field].indexOf(value)=== -1 ? this[field].push(value) : null;
        } else {
            this[field] = this[field].filter(i => i !== value)
        }
    }

    handleChangeType({checked, value}) {
        this.calculateInputParams('selectedTypes', value, checked);
    }

    handleChangeCategory({checked, value}) {
        this.calculateInputParams('selectedCategories', value, checked)
    }

    filterApply() {
        this.onFilterApply.emit({
            period: this.selectedPeriod,
            types: this.selectedTypes,
            categories: this.selectedCategories
        })
    }

    ngOnInit() {
    }

}
