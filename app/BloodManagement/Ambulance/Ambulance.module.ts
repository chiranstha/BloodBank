import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbulanceComponent } from './Ambulance.component';
import { AmbulanceRoutingModule } from './Ambulance-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmbulanceRoutingModule
  ],
  declarations: [AmbulanceComponent]
})
export class AmbulanceModule { }
