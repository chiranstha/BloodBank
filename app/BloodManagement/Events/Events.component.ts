import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmbulancesServiceProxy, EventsServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil, finalize } from 'rxjs';

@Component({
  selector: 'app-Events',
  templateUrl: './Events.component.html',
  styleUrls: ['./Events.component.css']
})
export class EventsComponent implements OnInit {
  form: FormGroup;
  course: any;
  id: any;
  containerClass: any;
  modalRef?: BsModalRef;
  active = false;
  saving = false;
  notify: any;
  emptyguId: any;
  public destroy$ = new Subject<void>();
    constructor(private modalService: BsModalService,    private fb: FormBuilder,
      private _proxy:EventsServiceProxy) { }
  
    ngOnInit() {
      this.createForm();
    }
  
    createForm(item: any = {}) {
      this.form = this.fb.group({
        id: [item.id ? item.id : 0],
        title: [item.title ? item.title : '', Validators.required],
        location: [item.location ? item.location : '', Validators.required],
        description: [item.description ? item.description : '', Validators.required],
        contactNo: [item.contactNo ? item.contactNo : '', Validators.required],
        // date: [item.date ? item.date : '', Validators.required],
        // time: [item.time ? item.time : '', Validators.required],
        isApproved: [item.isApproved ? item.isApproved : '', Validators.required],
        // image: [item.image ? item.image : '', Validators.required],
        // imageToken: [item.imageToken, Validators.required],
       
      });
    }
    
    save() {
      this.saving = true;
      this._proxy
          .createOrEdit(this.form.getRawValue())
          .pipe(
              takeUntil(this.destroy$),
              finalize(() => (this.saving = false))
          )
          .subscribe((data) => {
      
                  this.notify.success('Saved Successfully');
                  this.modalRef.hide();
              
          });
  }
  //   save() {
  //     if (this.form.valid) {

  //       this._proxy.createOrEdit(this.form.getRawValue()).subscribe(() => {
  //         this.active = false;
  //         this.saving = false;
  //         this.form.reset();
  //         this.modalRef.hide();
  //         this.modalRef.onHide.emit(null);
  //         // this.notify.success('Saved Successfully' + res);
  //         // this.router.navigate(['/app/main/EnterpreneurAssessment/', res ]);
  //       });
  //     } else {
  //       this.saving = false;
  //       this.notify.error('Form is invalid!!');
  //     }
  // }
    openModalWithClass(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }
    deletecourse(arg0: any) {
    }
    createCourseCategory() {
      throw new Error('Method not implemented.');
      }
      updateOptionSelected(control: AbstractControl, value: boolean) {
        control.setValue(value);
      }
  }
  