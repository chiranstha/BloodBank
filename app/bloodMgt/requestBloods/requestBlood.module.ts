import {NgModule} from '@angular/core';
import {RequestBloodRoutingModule} from './requestBlood-routing.module';
import {RequestBloodsComponent} from './requestBloods.component';
import {CreateOrEditRequestBloodModalComponent} from './create-or-edit-requestBlood-modal.component';
import {ViewRequestBloodModalComponent} from './view-requestBlood-modal.component';
import { SharedModule } from 'primeng/api';
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
        RequestBloodsComponent,
        CreateOrEditRequestBloodModalComponent,
        ViewRequestBloodModalComponent,
    ],
    imports: [RequestBloodRoutingModule, SharedModule,
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
        PaginatorModule,]
})
export class RequestBloodModule {
}
