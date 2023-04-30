import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { DonatedBloodsServiceProxy, DonatedBloodDto , DonationType } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditDonatedBloodModalComponent } from './create-or-edit-donatedBlood-modal.component';

import { ViewDonatedBloodModalComponent } from './view-donatedBlood-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './donatedBloods.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class DonatedBloodsComponent extends AppComponentBase {


    @ViewChild('createOrEditDonatedBloodModal', { static: true }) createOrEditDonatedBloodModal: CreateOrEditDonatedBloodModalComponent;
    @ViewChild('viewDonatedBloodModalComponent', { static: true }) viewDonatedBloodModal: ViewDonatedBloodModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';

    donationType = DonationType;
    primengTableHelper: any;





    constructor(
        injector: Injector,
        private _donatedBloodsServiceProxy: DonatedBloodsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
    ) {
        super(injector);
    }

    getDonatedBloods(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._donatedBloodsServiceProxy.getAll(
            this.filterText,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createDonatedBlood(): void {
        this.createOrEditDonatedBloodModal.show();
    }


    deleteDonatedBlood(donatedBlood: DonatedBloodDto): void {

                    this._donatedBloodsServiceProxy.delete(donatedBlood.id)
                        .subscribe(() => {
                            this.reloadPage();
                            //this.notify.success(this.l('SuccessfullyDeleted'));
                        });

    }

    exportToExcel(): void {
        this._donatedBloodsServiceProxy.getDonatedBloodsToExcel(
        this.filterText,
        )
        .subscribe(result => {
           // this._fileDownloadService.downloadTempFile(result);
         });
    }





}
