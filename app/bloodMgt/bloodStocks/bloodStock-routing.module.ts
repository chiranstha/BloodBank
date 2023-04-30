import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BloodStocksComponent} from './bloodStocks.component';



const routes: Routes = [
    {
        path: '',
        component: BloodStocksComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BloodStockRoutingModule {
}
