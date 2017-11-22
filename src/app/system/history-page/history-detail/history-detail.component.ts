import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventService} from "../../shared/services/event.service";
import {WFMEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {CategoryService} from "../../shared/services/category.service";

@Component({
    selector: 'wfm-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {
    event: WFMEvent;
    category: Category;
    isLoaded = false;

    constructor(private route: ActivatedRoute,
                private eventService: EventService,
                private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.route.params
            .mergeMap((params: Params) => {
                return this.eventService.getEventById(params['id']);
            }).mergeMap((event: WFMEvent) => {
            this.event = event;
            return this.categoryService.getCategoryById(event.category);
        }).subscribe((category: Category) => {
            this.category = category;
            this.isLoaded = true;
        });
    }



}
