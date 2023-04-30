import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EventsComponent } from './Events.component';



const routes: Routes = [
    {
        path: '',
        component: EventsComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventsRoutingModule {
}