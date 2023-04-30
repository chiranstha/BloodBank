import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestBloodsComponent} from './requestBloods.component';



const routes: Routes = [
    {
        path: '',
        component: RequestBloodsComponent,
        pathMatch: 'full'
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RequestBloodRoutingModule {
}
