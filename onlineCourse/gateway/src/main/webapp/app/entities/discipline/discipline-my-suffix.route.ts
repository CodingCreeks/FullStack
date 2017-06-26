import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DisciplineMySuffixComponent } from './discipline-my-suffix.component';
import { DisciplineMySuffixDetailComponent } from './discipline-my-suffix-detail.component';
import { DisciplineMySuffixPopupComponent } from './discipline-my-suffix-dialog.component';
import { DisciplineMySuffixDeletePopupComponent } from './discipline-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const disciplineRoute: Routes = [
    {
        path: 'discipline-my-suffix',
        component: DisciplineMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discipline.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'discipline-my-suffix/:id',
        component: DisciplineMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discipline.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const disciplinePopupRoute: Routes = [
    {
        path: 'discipline-my-suffix-new',
        component: DisciplineMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discipline.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discipline-my-suffix/:id/edit',
        component: DisciplineMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discipline.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discipline-my-suffix/:id/delete',
        component: DisciplineMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discipline.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
