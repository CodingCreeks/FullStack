import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayDisciplineMySuffixModule } from './discipline/discipline-my-suffix.module';
import { GatewayProgramMySuffixModule } from './program/program-my-suffix.module';
import { GatewayCourseMySuffixModule } from './course/course-my-suffix.module';
import { GatewayLessonMySuffixModule } from './lesson/lesson-my-suffix.module';
import { GatewayResourceMySuffixModule } from './resource/resource-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayDisciplineMySuffixModule,
        GatewayProgramMySuffixModule,
        GatewayCourseMySuffixModule,
        GatewayLessonMySuffixModule,
        GatewayResourceMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
