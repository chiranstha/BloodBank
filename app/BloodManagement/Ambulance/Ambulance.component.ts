import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AmbulancesServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-Ambulance',
  templateUrl: './Ambulance.component.html',
  styleUrls: ['./Ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {
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
      private _proxy:AmbulancesServiceProxy) { }
  
    ngOnInit() {
      this.createForm();
    }
  
    createForm(item: any = {}) {
      this.form = this.fb.group({
        id: [item.id ? item.id : 0],
        name: [item.name ? item.name : '', Validators.required],
        location: [item.location ? item.location : '', Validators.required],
        contactPerson: [item.contactPerson ? item.contactPerson : '', Validators.required],
        ambulanceNumber: [item.ambulanceNumber ? item.ambulanceNumber : '', Validators.required],
        phoneNo1: [item.phoneNo1 ? item.phoneNo1 : '', Validators.required],
        phoneNo2: [item.phoneNo2 ? item.phoneNo2 : '', Validators.required],
        isApproved: [item.isApproved ? item.isApproved : '', Validators.required],
       
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
      Back(){
        this.modalRef.hide();
      }
  }
  