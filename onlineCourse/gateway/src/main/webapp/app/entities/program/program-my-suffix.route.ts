import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProgramMySuffixComponent } from './program-my-suffix.component';
import { ProgramMySuffixDetailComponent } from './program-my-suffix-detail.component';
import { ProgramMySuffixPopupComponent } from './program-my-suffix-dialog.component';
import { ProgramMySuffixDeletePopupComponent } from './program-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ProgramMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const programRoute: Routes = [
    {
        path: 'program-my-suffix',
        component: ProgramMySuffixComponent,
        resolve: {
            'pagingParams': ProgramMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.program.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'program-my-suffix/:id',
        component: ProgramMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.program.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const programPopupRoute: Routes = [
    {
        path: 'program-my-suffix-new',
        component: ProgramMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.program.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'program-my-suffix/:id/edit',
        component: ProgramMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.program.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'program-my-suffix/:id/delete',
        component: ProgramMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.program.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
