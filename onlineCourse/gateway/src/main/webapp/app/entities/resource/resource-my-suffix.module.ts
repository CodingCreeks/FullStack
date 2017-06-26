import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ResourceMySuffixService,
    ResourceMySuffixPopupService,
    ResourceMySuffixComponent,
    ResourceMySuffixDetailComponent,
    ResourceMySuffixDialogComponent,
    ResourceMySuffixPopupComponent,
    ResourceMySuffixDeletePopupComponent,
    ResourceMySuffixDeleteDialogComponent,
    resourceRoute,
    resourcePopupRoute,
} from './';

const ENTITY_STATES = [
    ...resourceRoute,
    ...resourcePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResourceMySuffixComponent,
        ResourceMySuffixDetailComponent,
        ResourceMySuffixDialogComponent,
        ResourceMySuffixDeleteDialogComponent,
        ResourceMySuffixPopupComponent,
        ResourceMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ResourceMySuffixComponent,
        ResourceMySuffixDialogComponent,
        ResourceMySuffixPopupComponent,
        ResourceMySuffixDeleteDialogComponent,
        ResourceMySuffixDeletePopupComponent,
    ],
    providers: [
        ResourceMySuffixService,
        ResourceMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayResourceMySuffixModule {}
