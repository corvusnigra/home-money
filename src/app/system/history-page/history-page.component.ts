import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {CategoryService} from "../shared/services/category.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {WFMEvent} from "../shared/models/event.model";
import {Category} from "../shared/models/category.model";

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
            this.calculateDataChart();
            this.isLoaded = true;
        });
    }

    calculateDataChart(): void {
        this.categories.forEach((cat) => {
            const catEvents = this.events.filter((e: WFMEvent) => e.category === cat.id && e.type === 'outcome');

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

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }

    }


}
