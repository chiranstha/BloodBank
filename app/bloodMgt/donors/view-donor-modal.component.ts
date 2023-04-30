import {AppConsts} from "@shared/AppConsts";
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetDonorForViewDto, DonorDto , BloodGroup, Gender} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'viewDonorModal',
    templateUrl: './view-donor-modal.component.html'
})
export class ViewDonorModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetDonorForViewDto;
    bloodGroup = BloodGroup;
    gender = Gender;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetDonorForViewDto();
        this.item.donor = new DonorDto();
    }

    show(item: GetDonorForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }


                 getDownloadUrl(id: string): string {
                     return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
                 }


    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
