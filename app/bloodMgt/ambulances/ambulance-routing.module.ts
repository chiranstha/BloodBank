import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AmbulancesComponent} from './ambulances.component';



const routes: Routes = [
    {
        path: '',
        component: AmbulancesComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AmbulanceRoutingModule {
}
