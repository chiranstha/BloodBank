import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodbankComponent } from './Bloodbank.component';
import { BloodbankRoutingModule } from './Bloodbank-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BloodbankRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BloodbankComponent]
})
export class BloodbankModule { }
