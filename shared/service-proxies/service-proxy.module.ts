import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.AmbulancesServiceProxy,
        ApiServiceProxies.EventsServiceProxy,
        ApiServiceProxies.DonatedBloodsServiceProxy,
        ApiServiceProxies.RequestBloodsServiceProxy,
        ApiServiceProxies.DonorsServiceProxy,
        ApiServiceProxies.BloodBanksServiceProxy,
        ApiServiceProxies.BloodStocksServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
