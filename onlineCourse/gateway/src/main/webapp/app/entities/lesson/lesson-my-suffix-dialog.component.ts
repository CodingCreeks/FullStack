import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixPopupService } from './lesson-my-suffix-popup.service';
import { LessonMySuffixService } from './lesson-my-suffix.service';
import { CourseMySuffix, CourseMySuffixService } from '../course';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lesson-my-suffix-dialog',
    templateUrl: './lesson-my-suffix-dialog.component.html'
})
export class LessonMySuffixDialogComponent implements OnInit {

    lesson: LessonMySuffix;
    authorities: any[];
    isSaving: boolean;

    courses: CourseMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private lessonService: LessonMySuffixService,
        private courseService: CourseMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lesson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lessonService.update(this.lesson), false);
        } else {
            this.subscribeToSaveResponse(
                this.lessonService.create(this.lesson), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<LessonMySuffix>, isCreated: boolean) {
        result.subscribe((res: LessonMySuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: LessonMySuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'gatewayApp.lesson.created'
            : 'gatewayApp.lesson.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'lessonListModification', content: 'OK'});
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

    trackCourseById(index: number, item: CourseMySuffix) {
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
    selector: 'jhi-lesson-my-suffix-popup',
    template: ''
})
export class LessonMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lessonPopupService: LessonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.lessonPopupService
                    .open(LessonMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.lessonPopupService
                    .open(LessonMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
