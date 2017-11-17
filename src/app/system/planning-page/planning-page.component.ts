import {Component, OnInit, OnDestroy} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {CategoryService} from "../shared/services/category.service";
import {EventService} from "../shared/services/event.service";
import {Subscription, Observable} from "rxjs";
import {Bill} from "../bill-page/models/bill.model";
import {Category} from "../shared/models/category.model";
import {WFMEvent} from "../shared/models/event.model";

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1: Subscription;
  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  constructor(
      private billService: BillService,
      private categoryService: CategoryService,
      private eventService: EventService

  ) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
        this.billService.getBill(),
        this.categoryService.getCategories(),
        this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    })

  }

  getCategoryCost(cat: Category): number{
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome')
    return catEvents.reduce((total, e) => {
      return total += e.amount;
    }, 0);
  }

  getPercent(cat: Category): number {
   const percent = (100 * this.getCategoryCost(cat))/ cat.capacity;
   return percent > 100 ? 100 : percent;

  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' :  percent >= 100 ? 'danger' : 'warning';
  }


  ngOnDestroy() {
    if(this.s1) this.s1.unsubscribe();
  }

}
