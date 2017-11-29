import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {CategoryService} from "../shared/services/category.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {WFMEvent} from "../shared/models/event.model";
import {Category} from "../shared/models/category.model";
import * as moment from 'moment';

@Component({
    selector: 'wfm-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    s1: Subscription;
    categories: Category[];
    events: WFMEvent[];
    isLoaded = false;
    dataChart = [];
    isFilterVisible = false;
    filteredEvents: WFMEvent[] = [];


    constructor(private eventService: EventService,
                private categoryService: CategoryService) {
    }


    ngOnInit() {
        this.s1 = Observable.combineLatest(
            this.categoryService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data: [Category[], WFMEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];
            this.setOriginEvents();
            this.calculateDataChart();
            this.isLoaded = true;
        });
    }

    calculateDataChart(): void {
        this.categories.forEach((cat) => {
            const catEvents = this.filteredEvents.filter((e: WFMEvent) => e.category === cat.id && e.type === 'outcome');

            this.dataChart.push({
                name: cat.name,
                value: catEvents.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)

            });
        })
    }

    toggleFilterVisibility(dir: boolean) {
        this.isFilterVisible = dir;
    }

    private setOriginEvents() {
        this.filteredEvents = this.events.slice();
    }

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.setOriginEvents();
        this.calculateDataChart();
    }

    onFilterApply(filterData) {
        this.toggleFilterVisibility(false);
        this.setOriginEvents();

        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');

        this.filteredEvents = this.filteredEvents
            .filter((e) => {
                return  filterData.types.indexOf(e.type) !== -1;
            })
            .filter((e) => {
                return filterData.categories.indexOf(e.category.toString()) !== -1;
            })
            .filter((e) => {
                const momemtDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
                return momemtDate.isBetween(startPeriod, endPeriod);
            });
    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }

    }


}
