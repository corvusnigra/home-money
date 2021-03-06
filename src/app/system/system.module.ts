import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SystemRoutngModule} from "./system-routing.module";
import {SystemComponent} from "./sysrem.component";
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { AsideComponent } from './shared/components/aside/aside.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import {BillService} from "./shared/services/bill.service";
import {MomentPipe} from "./shared/pipes/moment.pipe";
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import {SharedModule} from "../shared/shared.module";
import {CategoryService} from "./shared/services/category.service";
import {EventService} from "./shared/services/event.service";
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import {FilterPipe} from "./shared/pipes/filter.pipe";

@NgModule({

    declarations: [
        SystemComponent,
        BillPageComponent,
        HistoryPageComponent,
        PlanningPageComponent,
        RecordsPageComponent,
        AsideComponent,
        HeaderComponent,
        DropdownDirective,
        BillCardComponent,
        CurrencyCardComponent,
        MomentPipe,
        AddEventComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        HistoryChartComponent,
        HistoryEventsComponent,
        HistoryDetailComponent,
        HistoryFilterComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        SystemRoutngModule
    ],
    providers: [
        BillService,
        CategoryService,
        EventService
    ]
})

export class SystemModule {

}