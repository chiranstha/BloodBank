import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { BloodBanksServiceProxy, CreateOrEditBloodBankDto } from '@shared/service-proxies/service-proxies';

import { IAjaxResponse, TokenService } from "@node_modules/abp-ng2-module";
import { AppConsts } from "@shared/AppConsts";

import { HttpClient } from '@angular/common/http';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'createOrEditBloodBankModal',
    templateUrl: './create-or-edit-bloodBank-modal.component.html'
})
export class CreateOrEditBloodBankModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    bloodBank: CreateOrEditBloodBankDto = new CreateOrEditBloodBankDto();




   // logoFileUploader: FileUploader;
    logoFileToken: string;
    logoFileName: string;
    logoFileAcceptedTypes: string = '';
    @ViewChild('BloodBank_logoLabel') bloodBank_logoLabel: ElementRef;


    constructor(
        injector: Injector,
        private _bloodBanksServiceProxy: BloodBanksServiceProxy,
        private _tokenService: TokenService
        , private _http: HttpClient
    ) {
        super(injector);
    }

    show(bloodBankId?: number): void {


        if (!bloodBankId) {
            this.bloodBank = new CreateOrEditBloodBankDto();
            this.bloodBank.id = bloodBankId;


            this.logoFileName = null;


            this.active = true;
            this.modal.show();
        } else {
            this._bloodBanksServiceProxy.getBloodBankForEdit(bloodBankId).subscribe(result => {
                this.bloodBank = result.bloodBank;



                this.logoFileName = result.logoFileName;


                this.active = true;
                this.modal.show();
            });
        }


        // this.logoFileUploader = this.initializeUploader(AppConsts.remoteServiceBaseUrl + '/BloodBanks/UploadlogoFile',
        //     fileToken => this.logoFileToken = fileToken);

    }

    save(): void {
        this.saving = true;

        this.bloodBank.logoToken = this.logoFileToken;



        this._bloodBanksServiceProxy.createOrEdit(this.bloodBank)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }









    onSelectLogoFile(fileInput: any): void {
        let selectedFile = <File>fileInput.target.files[0];
        if (!selectedFile) {
            this.bloodBank_logoLabel.nativeElement.innerText = this.l('ChooseAFile');
            return;
        }
        this.bloodBank_logoLabel.nativeElement.innerText = selectedFile.name;
        // this.logoFileUploader.clearQueue();
        // this.logoFileUploader.addToQueue([selectedFile]);
        // this.logoFileUploader.uploadAll();
    }

    removeLogoFile(): void {
        this.message.confirm(
            this.l('DoYouWantToRemoveTheFile'),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this._bloodBanksServiceProxy.removeLogoFile(this.bloodBank.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.logoFileName = null;
                    });
                }
            }
        );
    }



    // initializeUploader(url: string, onSuccess: (fileToken: string) => void): FileUploader {
    //     let uploader = new FileUploader({ url: url });

    //     let _uploaderOptions: FileUploaderOptions = {};
    //     _uploaderOptions.autoUpload = false;
    //     _uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
    //     _uploaderOptions.removeAfterUpload = true;

    //     uploader.onAfterAddingFile = (file) => {
    //         file.withCredentials = false;
    //     };

    //     uploader.onSuccessItem = (item, response, status) => {
    //         const resp = <IAjaxResponse>JSON.parse(response);
    //         if (resp.success && resp.result.fileToken) {
    //             onSuccess(resp.result.fileToken);
    //         } else {
    //             this.message.error(resp.result.message);
    //         }
    //     };

    //     uploader.setOptions(_uploaderOptions);
    //     return uploader;
    // }



    getDownloadUrl(id: string): string {
        return AppConsts.remoteServiceBaseUrl + '/File/DownloadBinaryFile?id=' + id;
    }


    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {


        this._http.get(AppConsts.remoteServiceBaseUrl + '/bloodBanks/GetLogoFileAllowedTypes')
            .subscribe((data: any) => {
                if (!data || !data.result) {
                    return;
                }

                let list = data.result as string[];
                if (list.length == 0) {
                    return;
                }

                for (let i = 0; i < list.length; i++) {
                    this.logoFileAcceptedTypes += '.' + list[i] + ',';
                }
            });

    }
}
