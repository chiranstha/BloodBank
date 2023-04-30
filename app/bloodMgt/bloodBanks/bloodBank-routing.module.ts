import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BloodBanksComponent} from './bloodBanks.component';



const routes: Routes = [
    {
        path: '',
        component: BloodBanksComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BloodBankRoutingModule {
}
