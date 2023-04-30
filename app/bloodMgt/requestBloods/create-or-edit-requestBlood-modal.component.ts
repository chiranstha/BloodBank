import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOrEditRequestBloodDto, RequestBloodsServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';




@Component({
    selector: 'createOrEditRequestBloodModal',
    templateUrl: './create-or-edit-requestBlood-modal.component.html'
})
export class CreateOrEditRequestBloodModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    requestBlood: CreateOrEditRequestBloodDto = new CreateOrEditRequestBloodDto();




    constructor(
        injector: Injector,
        private _requestBloodsServiceProxy: RequestBloodsServiceProxy,
    ) {
        super(injector);
    }

    show(requestBloodId?: number): void {


        if (!requestBloodId) {
            this.requestBlood = new CreateOrEditRequestBloodDto();
            this.requestBlood.id = requestBloodId;
           // this.requestBlood.date = this._dateTimeService.getStartOfDay();


            this.active = true;
            this.modal.show();
        } else {
            this._requestBloodsServiceProxy.getRequestBloodForEdit(requestBloodId).subscribe(result => {
                this.requestBlood = result.requestBlood;



                this.active = true;
                this.modal.show();
            });
        }


    }

    save(): void {
            this.saving = true;



            this._requestBloodsServiceProxy.createOrEdit(this.requestBlood)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }













    close(): void {
        this.active = false;
        this.modal.hide();
    }

     ngOnInit(): void {

     }
}
