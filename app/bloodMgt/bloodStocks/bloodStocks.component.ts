import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { BloodStocksServiceProxy, BloodStockDto , BloodGroup } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditBloodStockModalComponent } from './create-or-edit-bloodStock-modal.component';

import { ViewBloodStockModalComponent } from './view-bloodStock-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { filter as _filter } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './bloodStocks.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class BloodStocksComponent extends AppComponentBase {


    @ViewChild('createOrEditBloodStockModal', { static: true }) createOrEditBloodStockModal: CreateOrEditBloodStockModalComponent;
    @ViewChild('viewBloodStockModalComponent', { static: true }) viewBloodStockModal: ViewBloodStockModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';

    bloodGroup = BloodGroup;





    constructor(
        injector: Injector,
        private _bloodStocksServiceProxy: BloodStocksServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
    ) {
        super(injector);
    }

    getBloodStocks(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._bloodStocksServiceProxy.getAll(
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

    createBloodStock(): void {
        this.createOrEditBloodStockModal.show();
    }


    deleteBloodStock(bloodStock: BloodStockDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._bloodStocksServiceProxy.delete(bloodStock.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._bloodStocksServiceProxy.getBloodStocksToExcel(
        this.filterText,
        )
        .subscribe(result => {
           // this._fileDownloadService.downloadTempFile(result);
         });
    }





}
