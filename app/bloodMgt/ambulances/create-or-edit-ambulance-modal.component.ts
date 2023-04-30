import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AmbulancesServiceProxy, CreateOrEditAmbulanceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';



@Component({
    selector: 'createOrEditAmbulanceModal',
    templateUrl: './create-or-edit-ambulance-modal.component.html'
})
export class CreateOrEditAmbulanceModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    ambulance: CreateOrEditAmbulanceDto = new CreateOrEditAmbulanceDto();




    constructor(
        injector: Injector,
        private _ambulancesServiceProxy: AmbulancesServiceProxy,
    ) {
        super(injector);
    }

    show(ambulanceId?: number): void {


        if (!ambulanceId) {
            this.ambulance = new CreateOrEditAmbulanceDto();
            this.ambulance.id = ambulanceId;


            this.active = true;
            this.modal.show();
        } else {
            this._ambulancesServiceProxy.getAmbulanceForEdit(ambulanceId).subscribe(result => {
                this.ambulance = result.ambulance;



                this.active = true;
                this.modal.show();
            });
        }


    }

    save(): void {
            this.saving = true;



            this._ambulancesServiceProxy.createOrEdit(this.ambulance)
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
