import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AmbulanceComponent } from './Ambulance.component';



const routes: Routes = [
    {
        path: '',
        component: AmbulanceComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AmbulanceRoutingModule {
}
