import {NgModule} from '@angular/core';
import {BloodStockRoutingModule} from './bloodStock-routing.module';
import {BloodStocksComponent} from './bloodStocks.component';
import {CreateOrEditBloodStockModalComponent} from './create-or-edit-bloodStock-modal.component';
import {ViewBloodStockModalComponent} from './view-bloodStock-modal.component';
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
        BloodStocksComponent,
        CreateOrEditBloodStockModalComponent,
        ViewBloodStockModalComponent,

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
        PaginatorModule,
        BloodStockRoutingModule  ],

})
export class BloodStockModule {
}
