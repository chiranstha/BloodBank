import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AmbulancesServiceProxy, AmbulanceDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditAmbulanceModalComponent } from './create-or-edit-ambulance-modal.component';

import { ViewAmbulanceModalComponent } from './view-ambulance-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { filter as _filter } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './ambulances.component.html',
    // encapsulation: ViewEncapsulation.None,
    // animations: [appModuleAnimation()]
})
export class AmbulancesComponent extends AppComponentBase {


    @ViewChild('createOrEditAmbulanceModal', { static: true }) createOrEditAmbulanceModal: CreateOrEditAmbulanceModalComponent;
    @ViewChild('viewAmbulanceModalComponent', { static: true }) viewAmbulanceModal: ViewAmbulanceModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    primengTableHelper: any;






    constructor(
        injector: Injector,
        private _ambulancesServiceProxy: AmbulancesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
    ) {
        super(injector);
    }

    getAmbulances(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._ambulancesServiceProxy.getAll(
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

    createAmbulance(): void {
        this.createOrEditAmbulanceModal.show();
    }


    deleteAmbulance(ambulance: AmbulanceDto): void {

                    this._ambulancesServiceProxy.delete(ambulance.id)
                        .subscribe(() => {
                            this.reloadPage();
                           // this.notify.success(this.l('SuccessfullyDeleted'));
                        });

    }

    exportToExcel(): void {
        this._ambulancesServiceProxy.getAmbulancesToExcel(
        this.filterText,
        )
        .subscribe(result => {
           // this._fileDownloadService.downloadTempFile(result);
         });
    }





}
