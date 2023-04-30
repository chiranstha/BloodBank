import {NgModule} from '@angular/core';
import {DonatedBloodRoutingModule} from './donatedBlood-routing.module';
import {DonatedBloodsComponent} from './donatedBloods.component';
import {CreateOrEditDonatedBloodModalComponent} from './create-or-edit-donatedBlood-modal.component';
import {ViewDonatedBloodModalComponent} from './view-donatedBlood-modal.component';
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
        DonatedBloodsComponent,
        CreateOrEditDonatedBloodModalComponent,
        ViewDonatedBloodModalComponent,

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
        PaginatorModule, DonatedBloodRoutingModule  ],

})
export class DonatedBloodModule {
}
