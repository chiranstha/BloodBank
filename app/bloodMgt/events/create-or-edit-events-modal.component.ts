import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { EventsServiceProxy, CreateOrEditEventsDto } from '@shared/service-proxies/service-proxies';
import { IAjaxResponse, TokenService } from "@node_modules/abp-ng2-module";
import { AppConsts } from "@shared/AppConsts";
import { HttpClient } from '@angular/common/http';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'createOrEditEventsModal',
    templateUrl: './create-or-edit-events-modal.component.html'
})
export class CreateOrEditEventsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    events: CreateOrEditEventsDto = new CreateOrEditEventsDto();




    //imageFileUploader: FileUploader;
    imageFileToken: string;
    imageFileName: string;
    imageFileAcceptedTypes: string = '';
    @ViewChild('Events_imageLabel') events_imageLabel: ElementRef;


    constructor(
        injector: Injector,
        private _eventsServiceProxy: EventsServiceProxy,
         private _tokenService: TokenService
        , private _http: HttpClient
    ) {
        super(injector);
    }

    show(eventsId?: number): void {


        if (!eventsId) {
            this.events = new CreateOrEditEventsDto();
            this.events.id = eventsId;
            //this.events.date = this._dateTimeService.getStartOfDay();


            this.imageFileName = null;


            this.active = true;
            this.modal.show();
        } else {
            this._eventsServiceProxy.getEventsForEdit(eventsId).subscribe(result => {
                this.events = result.events;



                this.imageFileName = result.imageFileName;


                this.active = true;
                this.modal.show();
            });
        }


        // this.imageFileUploader = this.initializeUploader(AppConsts.remoteServiceBaseUrl + '/Events/UploadimageFile',
        //     fileToken => this.imageFileToken = fileToken);

    }

    save(): void {
        this.saving = true;

        this.events.imageToken = this.imageFileToken;



        this._eventsServiceProxy.createOrEdit(this.events)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }









    // onSelectImageFile(fileInput: any): void {
    //     let selectedFile = <File>fileInput.target.files[0];
    //     if (!selectedFile) {
    //         this.events_imageLabel.nativeElement.innerText = this.l('ChooseAFile');
    //         return;
    //     }
    //     this.events_imageLabel.nativeElement.innerText = selectedFile.name;
    //     this.imageFileUploader.clearQueue();
    //     this.imageFileUploader.addToQueue([selectedFile]);
    //     this.imageFileUploader.uploadAll();
    // }

    removeImageFile(): void {
        this.message.confirm(
            this.l('DoYouWantToRemoveTheFile'),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this._eventsServiceProxy.removeImageFile(this.events.id).subscribe(() => {
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


        this._http.get(AppConsts.remoteServiceBaseUrl + '/events/GetImageFileAllowedTypes')
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
