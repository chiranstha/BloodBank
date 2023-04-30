import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AmbulancesServiceProxy, EventsServiceProxy, GetEventsForViewDto } from '@shared/service-proxies/service-proxies';
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
  public showEditModal = false;
  id: any;
  containerClass: any;
  modalRef?: BsModalRef;
  active = false;
  saving = false;
  notify: any;
  emptyguId: any;
  totalCount: any;
  eventData:GetEventsForViewDto[];
  filterText: any;
  sorting: any;
  skipCount: any;
  itemSize: any;
  public destroy$ = new Subject<void>();
  private readonly _OnDestroy$: Subject<void> = new Subject<void>();
  message: any;
    constructor(private modalService: BsModalService,    private fb: FormBuilder, private route: ActivatedRoute,
      private _proxy:EventsServiceProxy) { }
  
    ngOnInit() {
      this.createForm();
      this. getAllEvents();
    }
  getAllEvents(){
    this._proxy.getAll(this.filterText, this.sorting, this.skipCount, this.itemSize).subscribe(res => {
      this.totalCount = res.totalCount;
      this.eventData = res.items;
      console.log('EbentData: ', res);
    });
  }
    createForm(item: any = {}) {
      this.form = this.fb.group({
        id: [item.id ? item.id : 0],
        title: [item.title ? item.title : '', Validators.required],
        description: [item.description ? item.description : '', Validators.required],
        location: [item.location ? item.location : '', Validators.required],
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
            this.modalRef.hide();
                  this.notify.success('Saved Successfully');
                 
              
          });
  }

    openModalWithClass(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }

    edit(template: TemplateRef<any>, id: number) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg' })
      );
      this._proxy.getEventsForEdit(id).subscribe(res=>{
        this.createForm(res);
      });
    }
  
    createCourseCategory() {
      throw new Error('Method not implemented.');
      }
      updateOptionSelected(control: AbstractControl, value: boolean) {
        control.setValue(value);
      }
     
      delete(id) {
        this._proxy.delete(id).subscribe(() => {
          this.getAllEvents();
        })
        // this.message.confirm('', 'Are you sure you want to Delete ?', (isConfirm) => {
        //   if (isConfirm) {
        //     this._proxy
        //       .delete(id)
        //       .pipe(takeUntil(this._OnDestroy$))
        //       .subscribe(() => {
        //         this.getAllEvents();
        //         this.notify.success('Successfully Deleted');
        //       });
        //   }
        // });
      }
  }
  