import {AppConsts} from "@shared/AppConsts";
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetRequestBloodForViewDto, RequestBloodDto , BloodGroup} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/app-component-base";


@Component({
    selector: 'viewRequestBloodModal',
    templateUrl: './view-requestBlood-modal.component.html'
})
export class ViewRequestBloodModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetRequestBloodForViewDto;
    bloodGroup = BloodGroup;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetRequestBloodForViewDto();
        this.item.requestBlood = new RequestBloodDto();
    }

    show(item: GetRequestBloodForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }
    
    

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
