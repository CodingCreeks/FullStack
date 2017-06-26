import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CourseMySuffixComponent } from './course-my-suffix.component';
import { CourseMySuffixDetailComponent } from './course-my-suffix-detail.component';
import { CourseMySuffixPopupComponent } from './course-my-suffix-dialog.component';
import { CourseMySuffixDeletePopupComponent } from './course-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class CourseMySuffixResolvePagingParams implements Resolve<any> {

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

export const courseRoute: Routes = [
    {
        path: 'course-my-suffix',
        component: CourseMySuffixComponent,
        resolve: {
            'pagingParams': CourseMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'course-my-suffix/:id',
        component: CourseMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coursePopupRoute: Routes = [
    {
        path: 'course-my-suffix-new',
        component: CourseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course-my-suffix/:id/edit',
        component: CourseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course-my-suffix/:id/delete',
        component: CourseMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
