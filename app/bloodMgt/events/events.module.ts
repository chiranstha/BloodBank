import {NgModule} from '@angular/core';
import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {CreateOrEditEventsModalComponent} from './create-or-edit-events-modal.component';
import {ViewEventsModalComponent} from './view-events-modal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';



@NgModule({
    declarations: [
        EventsComponent,
        CreateOrEditEventsModalComponent,
        ViewEventsModalComponent,

    ],
    imports: [CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule,
        TabsModule,
        BsDropdownModule,
        AppRoutingModule,
        ServiceProxyModule,
        TableModule,
        PaginatorModule, EventsRoutingModule  ],

})
export class EventsModule {
}
