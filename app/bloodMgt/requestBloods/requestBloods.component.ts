import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestBloodsServiceProxy, RequestBloodDto, BloodGroup } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditRequestBloodModalComponent } from './create-or-edit-requestBlood-modal.component';

import { ViewRequestBloodModalComponent } from './view-requestBlood-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './requestBloods.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class RequestBloodsComponent extends AppComponentBase {


    @ViewChild('createOrEditRequestBloodModal', { static: true }) createOrEditRequestBloodModal: CreateOrEditRequestBloodModalComponent;
    @ViewChild('viewRequestBloodModalComponent', { static: true }) viewRequestBloodModal: ViewRequestBloodModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';

    bloodGroup = BloodGroup;





    constructor(
        injector: Injector,
        private _requestBloodsServiceProxy: RequestBloodsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
    ) {
        super(injector);
    }

    getRequestBloods(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._requestBloodsServiceProxy.getAll(
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

    createRequestBlood(): void {
        this.createOrEditRequestBloodModal.show();
    }


    deleteRequestBlood(requestBlood: RequestBloodDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._requestBloodsServiceProxy.delete(requestBlood.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._requestBloodsServiceProxy.getRequestBloodsToExcel(
            this.filterText,
        )
            .subscribe(result => {
               // this._fileDownloadService.downloadTempFile(result);
            });
    }





}
