import { AppConsts } from "@shared/AppConsts";
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetEventsForViewDto, EventsDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'viewEventsModal',
    templateUrl: './view-events-modal.component.html'
})
export class ViewEventsModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetEventsForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetEventsForViewDto();
        this.item.events = new EventsDto();
    }

    show(item: GetEventsForViewDto): void {
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
