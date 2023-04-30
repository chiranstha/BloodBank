import {AppConsts} from "@shared/AppConsts";
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetDonatedBloodForViewDto, DonatedBloodDto , DonationType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'viewDonatedBloodModal',
    templateUrl: './view-donatedBlood-modal.component.html'
})
export class ViewDonatedBloodModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetDonatedBloodForViewDto;
    donationType = DonationType;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetDonatedBloodForViewDto();
        this.item.donatedBlood = new DonatedBloodDto();
    }

    show(item: GetDonatedBloodForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }



    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
