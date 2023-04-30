import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-Bloodbank',
  templateUrl: './Bloodbank.component.html',
  styleUrls: ['./Bloodbank.component.css']
})
export class BloodbankComponent implements OnInit {
  form: FormGroup;
course: any;
id: any;
containerClass: any;
modalRef?: BsModalRef;
  constructor(private modalService: BsModalService,    private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(item: any = {}) {
    this.form = this.fb.group({
      id: [item.id ? item.id : this.id],
      name: [item.name ? item.name : '', Validators.required],
      logoUrl: [item.logoUrl ? item.logoUrl : '', Validators.required],
      logoToken: [item.logoToken, Validators.required],
      isCompanyRegistered: [item.isCompanyRegistered ? item.isCompanyRegistered : false],
      location: [item.location ? item.location : '', Validators.required],
      noOfEmployee: [item.noOfEmployee ? item.noOfEmployee : '', Validators.required],
      annualTurnOver: [item.annualTurnOver ? item.annualTurnOver : '', Validators.required],
      monthlyTurnOver: [item.monthlyTurnOver ? item.monthlyTurnOver : '', Validators.required],
      serviceDescription: [item.serviceDescription ? item.serviceDescription : '', Validators.required],
      description: [item.description ? item.description : '', Validators.required],
      businessOperationDate: [item.businessOperationDate ? item.businessOperationDate : '', Validators.required],
      cardTurnOver: [item.cardTurnOver ? item.cardTurnOver : 0, Validators.required],
      cashTurnOver: [item.cashTurnOver ? item.cashTurnOver : 0, Validators.required],
      eftTurnOver: [item.eftTurnOver ? item.eftTurnOver : 0, Validators.required],
      bankId: [item.bankId ? item.bankId : '', Validators.required],
      industryId: [item.industryId ? item.industryId : '', Validators.required],
      businessPhaseId: [item.businessPhaseId ? item.businessPhaseId : '', Validators.required],
    });
  }
  save(){}
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
}
