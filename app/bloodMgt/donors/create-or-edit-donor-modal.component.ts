import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { DonorsServiceProxy, CreateOrEditDonorDto } from '@shared/service-proxies/service-proxies';
import { IAjaxResponse, TokenService } from "@node_modules/abp-ng2-module";
import { AppConsts } from "@shared/AppConsts";

import { HttpClient } from '@angular/common/http';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'createOrEditDonorModal',
    templateUrl: './create-or-edit-donor-modal.component.html'
})
export class CreateOrEditDonorModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    donor: CreateOrEditDonorDto = new CreateOrEditDonorDto();




    //imageFileUploader: FileUploader;
    imageFileToken: string;
    imageFileName: string;
    imageFileAcceptedTypes: string = '';
    @ViewChild('Donor_imageLabel') donor_imageLabel: ElementRef;


    constructor(
        injector: Injector,
        private _donorsServiceProxy: DonorsServiceProxy,
       // private _dateTimeService: DateTimeService,
         private _tokenService: TokenService
        , private _http: HttpClient
    ) {
        super(injector);
    }

    show(donorId?: number): void {


        if (!donorId) {
            this.donor = new CreateOrEditDonorDto();
            this.donor.id = donorId;
          //  this.donor.dob = this._dateTimeService.getStartOfDay();


            this.imageFileName = null;


            this.active = true;
            this.modal.show();
        } else {
            this._donorsServiceProxy.getDonorForEdit(donorId).subscribe(result => {
                this.donor = result.donor;



                this.imageFileName = result.imageFileName;


                this.active = true;
                this.modal.show();
            });
        }


        // this.imageFileUploader = this.initializeUploader(AppConsts.remoteServiceBaseUrl + '/Donors/UploadimageFile',
        //     fileToken => this.imageFileToken = fileToken);

    }

    save(): void {
        this.saving = true;

        this.donor.imageToken = this.imageFileToken;



        this._donorsServiceProxy.createOrEdit(this.donor)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }









    onSelectImageFile(fileInput: any): void {
        let selectedFile = <File>fileInput.target.files[0];
        if (!selectedFile) {
            this.donor_imageLabel.nativeElement.innerText = this.l('ChooseAFile');
            return;
        }
        this.donor_imageLabel.nativeElement.innerText = selectedFile.name;
        // this.imageFileUploader.clearQueue();
        // this.imageFileUploader.addToQueue([selectedFile]);
        // this.imageFileUploader.uploadAll();
    }

    removeImageFile(): void {
        this.message.confirm(
            this.l('DoYouWantToRemoveTheFile'),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this._donorsServiceProxy.removeImageFile(this.donor.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.imageFileName = null;
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


        this._http.get(AppConsts.remoteServiceBaseUrl + '/donors/GetImageFileAllowedTypes')
            .subscribe((data: any) => {
                if (!data || !data.result) {
                    return;
                }

                let list = data.result as string[];
                if (list.length == 0) {
                    return;
                }

                for (let i = 0; i < list.length; i++) {
                    this.imageFileAcceptedTypes += '.' + list[i] + ',';
                }
            });

    }
}
