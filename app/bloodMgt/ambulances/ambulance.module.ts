import {NgModule} from '@angular/core';
import {AmbulanceRoutingModule} from './ambulance-routing.module';
import {AmbulancesComponent} from './ambulances.component';
import {CreateOrEditAmbulanceModalComponent} from './create-or-edit-ambulance-modal.component';
import {ViewAmbulanceModalComponent} from './view-ambulance-modal.component';
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
        AmbulancesComponent,
        CreateOrEditAmbulanceModalComponent,
        ViewAmbulanceModalComponent,

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
        PaginatorModule, AmbulanceRoutingModule  ],

})
export class AmbulanceModule {
}
