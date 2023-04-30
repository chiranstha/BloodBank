import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { DonatedBloodsServiceProxy, CreateOrEditDonatedBloodDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'createOrEditDonatedBloodModal',
    templateUrl: './create-or-edit-donatedBlood-modal.component.html'
})
export class CreateOrEditDonatedBloodModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    donatedBlood: CreateOrEditDonatedBloodDto = new CreateOrEditDonatedBloodDto();




    constructor(
        injector: Injector,
        private _donatedBloodsServiceProxy: DonatedBloodsServiceProxy,
    ) {
        super(injector);
    }

    show(donatedBloodId?: number): void {


        if (!donatedBloodId) {
            this.donatedBlood = new CreateOrEditDonatedBloodDto();
            this.donatedBlood.id = donatedBloodId;
           // this.donatedBlood.date = this._dateTimeService.getStartOfDay();


            this.active = true;
            this.modal.show();
        } else {
            this._donatedBloodsServiceProxy.getDonatedBloodForEdit(donatedBloodId).subscribe(result => {
                this.donatedBlood = result.donatedBlood;



                this.active = true;
                this.modal.show();
            });
        }


    }

    save(): void {
            this.saving = true;



            this._donatedBloodsServiceProxy.createOrEdit(this.donatedBlood)
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
