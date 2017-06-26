import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProgramMySuffix } from './program-my-suffix.model';
import { ProgramMySuffixPopupService } from './program-my-suffix-popup.service';
import { ProgramMySuffixService } from './program-my-suffix.service';
import { CourseMySuffix, CourseMySuffixService } from '../course';
import { DisciplineMySuffix, DisciplineMySuffixService } from '../discipline';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-program-my-suffix-dialog',
    templateUrl: './program-my-suffix-dialog.component.html'
})
export class ProgramMySuffixDialogComponent implements OnInit {

    program: ProgramMySuffix;
    authorities: any[];
    isSaving: boolean;

    courses: CourseMySuffix[];

    disciplines: DisciplineMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private programService: ProgramMySuffixService,
        private courseService: CourseMySuffixService,
        private disciplineService: DisciplineMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.disciplineService.query()
            .subscribe((res: ResponseWrapper) => { this.disciplines = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.program.id !== undefined) {
            this.subscribeToSaveResponse(
                this.programService.update(this.program), false);
        } else {
            this.subscribeToSaveResponse(
                this.programService.create(this.program), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<ProgramMySuffix>, isCreated: boolean) {
        result.subscribe((res: ProgramMySuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ProgramMySuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'gatewayApp.program.created'
            : 'gatewayApp.program.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'programListModification', content: 'OK'});
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

    trackDisciplineById(index: number, item: DisciplineMySuffix) {
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
    selector: 'jhi-program-my-suffix-popup',
    template: ''
})
export class ProgramMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private programPopupService: ProgramMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.programPopupService
                    .open(ProgramMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.programPopupService
                    .open(ProgramMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
