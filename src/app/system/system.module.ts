import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SystemRoutngModule} from "./system-routing.module";
import {SystemComponent} from "./sysrem.component";
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
@NgModule({

    declarations: [
        SystemComponent,
        BillPageComponent,
        HistoryPageComponent,
        PlanningPageComponent,
        RecordsPageComponent
    ],
    imports: [
        CommonModule,
        SystemRoutngModule
    ]
})

export class SystemModule {

}