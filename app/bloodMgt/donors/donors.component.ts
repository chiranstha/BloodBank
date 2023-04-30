import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { DonorsServiceProxy, DonorDto , BloodGroup, Gender } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditDonorModalComponent } from './create-or-edit-donor-modal.component';

import { ViewDonorModalComponent } from './view-donor-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './donors.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class DonorsComponent extends AppComponentBase {


    @ViewChild('createOrEditDonorModal', { static: true }) createOrEditDonorModal: CreateOrEditDonorModalComponent;
    @ViewChild('viewDonorModalComponent', { static: true }) viewDonorModal: ViewDonorModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';

    bloodGroup = BloodGroup;
    gender = Gender;
    primengTableHelper: any;





    constructor(
        injector: Injector,
        private _donorsServiceProxy: DonorsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
    ) {
        super(injector);
    }

    getDonors(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._donorsServiceProxy.getAll(
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

    createDonor(): void {
        this.createOrEditDonorModal.show();
    }


    deleteDonor(donor: DonorDto): void {

                    this._donorsServiceProxy.delete(donor.id)
                        .subscribe(() => {
                            this.reloadPage();
                            //this.notify.success(this.l('SuccessfullyDeleted'));
                        });

    }

    exportToExcel(): void {
        this._donorsServiceProxy.getDonorsToExcel(
        this.filterText,
        )
        .subscribe(result => {
            //this._fileDownloadService.downloadTempFile(result);
         });
    }





                 getDownloadUrl(id: string): string {
                     return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
                 }

}
