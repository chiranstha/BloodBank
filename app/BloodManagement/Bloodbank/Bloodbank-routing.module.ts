import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BloodbankComponent } from './Bloodbank.component';



const routes: Routes = [
    {
        path: '',
        component: BloodbankComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BloodbankRoutingModule {
}
