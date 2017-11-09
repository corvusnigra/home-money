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
@NgModule({

    declarations: [
        SystemComponent,
        BillPageComponent,
        HistoryPageComponent,
        PlanningPageComponent,
        RecordsPageComponent,
        AsideComponent,
        HeaderComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule,
        SystemRoutngModule
    ]
})

export class SystemModule {

}