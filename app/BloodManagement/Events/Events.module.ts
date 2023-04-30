import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './Events.component';
import { EventsRoutingModule } from './Events-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    
  ],
  declarations: [EventsComponent]
})
export class EventsModule { }
