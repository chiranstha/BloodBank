import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { BloodStocksServiceProxy, CreateOrEditBloodStockDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';


@Component({
    selector: 'createOrEditBloodStockModal',
    templateUrl: './create-or-edit-bloodStock-modal.component.html'
})
export class CreateOrEditBloodStockModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    bloodStock: CreateOrEditBloodStockDto = new CreateOrEditBloodStockDto();




    constructor(
        injector: Injector,
        private _bloodStocksServiceProxy: BloodStocksServiceProxy,
    ) {
        super(injector);
    }

    show(bloodStockId?: number): void {


        if (!bloodStockId) {
            this.bloodStock = new CreateOrEditBloodStockDto();
            this.bloodStock.id = bloodStockId;


            this.active = true;
            this.modal.show();
        } else {
            this._bloodStocksServiceProxy.getBloodStockForEdit(bloodStockId).subscribe(result => {
                this.bloodStock = result.bloodStock;



                this.active = true;
                this.modal.show();
            });
        }


    }

    save(): void {
            this.saving = true;



            this._bloodStocksServiceProxy.createOrEdit(this.bloodStock)
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
