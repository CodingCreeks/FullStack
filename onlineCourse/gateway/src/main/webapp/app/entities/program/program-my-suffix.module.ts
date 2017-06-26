import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ProgramMySuffixService,
    ProgramMySuffixPopupService,
    ProgramMySuffixComponent,
    ProgramMySuffixDetailComponent,
    ProgramMySuffixDialogComponent,
    ProgramMySuffixPopupComponent,
    ProgramMySuffixDeletePopupComponent,
    ProgramMySuffixDeleteDialogComponent,
    programRoute,
    programPopupRoute,
    ProgramMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...programRoute,
    ...programPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProgramMySuffixComponent,
        ProgramMySuffixDetailComponent,
        ProgramMySuffixDialogComponent,
        ProgramMySuffixDeleteDialogComponent,
        ProgramMySuffixPopupComponent,
        ProgramMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProgramMySuffixComponent,
        ProgramMySuffixDialogComponent,
        ProgramMySuffixPopupComponent,
        ProgramMySuffixDeleteDialogComponent,
        ProgramMySuffixDeletePopupComponent,
    ],
    providers: [
        ProgramMySuffixService,
        ProgramMySuffixPopupService,
        ProgramMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayProgramMySuffixModule {}
