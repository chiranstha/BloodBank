import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DonatedBloodsComponent} from './donatedBloods.component';



const routes: Routes = [
    {
        path: '',
        component: DonatedBloodsComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DonatedBloodRoutingModule {
}
