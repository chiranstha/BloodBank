import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AmbulancesServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize, Subject, takeUntil } from 'rxjs';
import { threadId } from 'worker_threads';

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
  filterText: any;
  sorting: any;
  skipCount: any;
  itemSize: any;
  totalCount: any;
  AmbulanceData: any;
  public destroy$ = new Subject<void>();
    constructor(private modalService: BsModalService,    private fb: FormBuilder,
      private _proxy:AmbulancesServiceProxy) { }
  
    ngOnInit() {
      this.createForm();
      this.getAmbulanceData();
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
            this.modalRef.hide();
                  this.notify.success('Saved Successfully');
            
              
          });
  }
  // edit(template: TemplateRef<any>, id: number) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign({}, { class: 'gray modal-lg' })
  //   );
  //   this._proxy.getAmbulanceForEdit(id).subscribe(res=>{
  //     this.createForm(res);
  //   });
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

      delete(){}
      getAmbulanceData(){
        this._proxy.getAll(this.filterText, this.sorting, this.skipCount, this.itemSize).subscribe(res => {
          this.totalCount = res.totalCount;
          this.AmbulanceData = res.items;
        })
      }
  }
  