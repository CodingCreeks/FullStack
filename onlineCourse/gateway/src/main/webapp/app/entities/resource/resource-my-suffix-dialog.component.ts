import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResourceMySuffix } from './resource-my-suffix.model';
import { ResourceMySuffixPopupService } from './resource-my-suffix-popup.service';
import { ResourceMySuffixService } from './resource-my-suffix.service';
import { DisciplineMySuffix, DisciplineMySuffixService } from '../discipline';
import { ProgramMySuffix, ProgramMySuffixService } from '../program';
import { CourseMySuffix, CourseMySuffixService } from '../course';
import { LessonMySuffix, LessonMySuffixService } from '../lesson';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-resource-my-suffix-dialog',
    templateUrl: './resource-my-suffix-dialog.component.html'
})
export class ResourceMySuffixDialogComponent implements OnInit {

    resource: ResourceMySuffix;
    authorities: any[];
    isSaving: boolean;

    disciplines: DisciplineMySuffix[];

    programs: ProgramMySuffix[];

    courses: CourseMySuffix[];

    lessons: LessonMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resourceService: ResourceMySuffixService,
        private disciplineService: DisciplineMySuffixService,
        private programService: ProgramMySuffixService,
        private courseService: CourseMySuffixService,
        private lessonService: LessonMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.disciplineService.query()
            .subscribe((res: ResponseWrapper) => { this.disciplines = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.programService.query()
            .subscribe((res: ResponseWrapper) => { this.programs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.lessonService.query()
            .subscribe((res: ResponseWrapper) => { this.lessons = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resource.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resourceService.update(this.resource), false);
        } else {
            this.subscribeToSaveResponse(
                this.resourceService.create(this.resource), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<ResourceMySuffix>, isCreated: boolean) {
        result.subscribe((res: ResourceMySuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResourceMySuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'gatewayApp.resource.created'
            : 'gatewayApp.resource.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'resourceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackDisciplineById(index: number, item: DisciplineMySuffix) {
        return item.id;
    }

    trackProgramById(index: number, item: ProgramMySuffix) {
        return item.id;
    }

    trackCourseById(index: number, item: CourseMySuffix) {
        return item.id;
    }

    trackLessonById(index: number, item: LessonMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-resource-my-suffix-popup',
    template: ''
})
export class ResourceMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resourcePopupService: ResourceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resourcePopupService
                    .open(ResourceMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.resourcePopupService
                    .open(ResourceMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
