import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { BloodBanksServiceProxy, BloodBankDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditBloodBankModalComponent } from './create-or-edit-bloodBank-modal.component';

import { ViewBloodBankModalComponent } from './view-bloodBank-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './bloodBanks.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class BloodBanksComponent extends AppComponentBase {


    @ViewChild('createOrEditBloodBankModal', { static: true }) createOrEditBloodBankModal: CreateOrEditBloodBankModalComponent;
    @ViewChild('viewBloodBankModalComponent', { static: true }) viewBloodBankModal: ViewBloodBankModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    primengTableHelper: any;
    message: any;
    notify: any;
    _fileDownloadService: any;






    constructor(
        injector: Injector,
        private _bloodBanksServiceProxy: BloodBanksServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
    ) {
        super(injector);
    }

    getBloodBanks(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._bloodBanksServiceProxy.getAll(
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

    createBloodBank(): void {
        this.createOrEditBloodBankModal.show();
    }


    deleteBloodBank(bloodBank: BloodBankDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._bloodBanksServiceProxy.delete(bloodBank.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
    l(arg0: string): any {
        throw new Error('Method not implemented.');
    }

    exportToExcel(): void {
        this._bloodBanksServiceProxy.getBloodBanksToExcel(
        this.filterText,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }





                 getDownloadUrl(id: string): string {
                     return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
                 }

}
