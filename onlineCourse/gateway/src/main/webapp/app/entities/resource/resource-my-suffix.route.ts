import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResourceMySuffixComponent } from './resource-my-suffix.component';
import { ResourceMySuffixDetailComponent } from './resource-my-suffix-detail.component';
import { ResourceMySuffixPopupComponent } from './resource-my-suffix-dialog.component';
import { ResourceMySuffixDeletePopupComponent } from './resource-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const resourceRoute: Routes = [
    {
        path: 'resource-my-suffix',
        component: ResourceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resource-my-suffix/:id',
        component: ResourceMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resourcePopupRoute: Routes = [
    {
        path: 'resource-my-suffix-new',
        component: ResourceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resource-my-suffix/:id/edit',
        component: ResourceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resource-my-suffix/:id/delete',
        component: ResourceMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
