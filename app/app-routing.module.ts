import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    {
                        path: 'bloodMgt/ambulances',
                        loadChildren: () => import('./bloodMgt/ambulances/ambulance.module').then(m => m.AmbulanceModule),
                        data: { permission: 'Pages.Ambulances' }
                    },


                    {
                        path: 'bloodMgt/events',
                        loadChildren: () => import('./bloodMgt/events/events.module').then(m => m.EventsModule),
                        data: { permission: 'Pages.Events' }
                    },


                    {
                        path: 'bloodMgt/donatedBloods',
                        loadChildren: () => import('./bloodMgt/donatedBloods/donatedBlood.module').then(m => m.DonatedBloodModule),
                        data: { permission: 'Pages.DonatedBloods' }
                    },


                    {
                        path: 'bloodMgt/requestBloods',
                        loadChildren: () => import('./bloodMgt/requestBloods/requestBlood.module').then(m => m.RequestBloodModule),
                        data: { permission: 'Pages.RequestBloods' }
                    },


                    {
                        path: 'bloodMgt/donors',
                        loadChildren: () => import('./bloodMgt/donors/donor.module').then(m => m.DonorModule),
                        data: { permission: 'Pages.Donors' }
                    },


                    {
                        path: 'bloodMgt/bloodBanks',
                        loadChildren: () => import('./bloodMgt/bloodBanks/bloodBank.module').then(m => m.BloodBankModule),
                        data: { permission: 'Pages.BloodBanks' }
                    },


                    {
                        path: 'bloodMgt/bloodStocks',
                        loadChildren: () => import('./bloodMgt/bloodStocks/bloodStock.module').then(m => m.BloodStockModule),
                        data: { permission: 'Pages.BloodStocks' }
                    },
                   
                    {
                        path: 'bloodBank',
                        loadChildren: () => import('./BloodManagement/Bloodbank/Bloodbank.module').then(m => m.BloodbankModule),
                        data: { permission: 'Pages.BloodStocks' }
                    },
                    {
                        path: 'Ambulance',
                        loadChildren: () => import('./BloodManagement/Ambulance/Ambulance.module').then(m => m.AmbulanceModule),
                        data: { permission: 'Pages.BloodStocks' }
                    },
                    {
                        path: 'Events',
                        loadChildren: () => import('./BloodManagement/Events/Events.module').then(m => m.EventsModule),
                        data: { permission: 'Pages.BloodStocks' }
                    },

                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
