import {NgModule} from '@angular/core';
import {DonorRoutingModule} from './donor-routing.module';
import {DonorsComponent} from './donors.component';
import {CreateOrEditDonorModalComponent} from './create-or-edit-donor-modal.component';
import {ViewDonorModalComponent} from './view-donor-modal.component';
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
        DonorsComponent,
        CreateOrEditDonorModalComponent,
        ViewDonorModalComponent,

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
        PaginatorModule, DonorRoutingModule  ],

})
export class DonorModule {
}
