import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CourseMySuffix } from './course-my-suffix.model';
import { CourseMySuffixPopupService } from './course-my-suffix-popup.service';
import { CourseMySuffixService } from './course-my-suffix.service';
import { LessonMySuffix, LessonMySuffixService } from '../lesson';
import { ProgramMySuffix, ProgramMySuffixService } from '../program';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-course-my-suffix-dialog',
    templateUrl: './course-my-suffix-dialog.component.html'
})
export class CourseMySuffixDialogComponent implements OnInit {

    course: CourseMySuffix;
    authorities: any[];
    isSaving: boolean;

    lessons: LessonMySuffix[];

    programs: ProgramMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private courseService: CourseMySuffixService,
        private lessonService: LessonMySuffixService,
        private programService: ProgramMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.lessonService.query()
            .subscribe((res: ResponseWrapper) => { this.lessons = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.programService.query()
            .subscribe((res: ResponseWrapper) => { this.programs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(
                this.courseService.update(this.course), false);
        } else {
            this.subscribeToSaveResponse(
                this.courseService.create(this.course), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<CourseMySuffix>, isCreated: boolean) {
        result.subscribe((res: CourseMySuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CourseMySuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'gatewayApp.course.created'
            : 'gatewayApp.course.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'courseListModification', content: 'OK'});
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

    trackLessonById(index: number, item: LessonMySuffix) {
        return item.id;
    }

    trackProgramById(index: number, item: ProgramMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-course-my-suffix-popup',
    template: ''
})
export class CourseMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursePopupService: CourseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.coursePopupService
                    .open(CourseMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.coursePopupService
                    .open(CourseMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
