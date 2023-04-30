import {NgModule} from '@angular/core';
import {BloodBankRoutingModule} from './bloodBank-routing.module';
import {BloodBanksComponent} from './bloodBanks.component';
import {CreateOrEditBloodBankModalComponent} from './create-or-edit-bloodBank-modal.component';
import {ViewBloodBankModalComponent} from './view-bloodBank-modal.component';
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
        BloodBanksComponent,
        CreateOrEditBloodBankModalComponent,
        ViewBloodBankModalComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule,
        TabsModule,
        BsDropdownModule,
        AppRoutingModule,
        ServiceProxyModule,
        TableModule,
        PaginatorModule, BloodBankRoutingModule  ],

})
export class BloodBankModule {
}
