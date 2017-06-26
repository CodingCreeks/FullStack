import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DisciplineMySuffix } from './discipline-my-suffix.model';
import { DisciplineMySuffixPopupService } from './discipline-my-suffix-popup.service';
import { DisciplineMySuffixService } from './discipline-my-suffix.service';
import { ProgramMySuffix, ProgramMySuffixService } from '../program';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-discipline-my-suffix-dialog',
    templateUrl: './discipline-my-suffix-dialog.component.html'
})
export class DisciplineMySuffixDialogComponent implements OnInit {

    discipline: DisciplineMySuffix;
    authorities: any[];
    isSaving: boolean;

    programs: ProgramMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private disciplineService: DisciplineMySuffixService,
        private programService: ProgramMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.programService.query()
            .subscribe((res: ResponseWrapper) => { this.programs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.discipline.id !== undefined) {
            this.subscribeToSaveResponse(
                this.disciplineService.update(this.discipline), false);
        } else {
            this.subscribeToSaveResponse(
                this.disciplineService.create(this.discipline), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<DisciplineMySuffix>, isCreated: boolean) {
        result.subscribe((res: DisciplineMySuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: DisciplineMySuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'gatewayApp.discipline.created'
            : 'gatewayApp.discipline.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'disciplineListModification', content: 'OK'});
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
    selector: 'jhi-discipline-my-suffix-popup',
    template: ''
})
export class DisciplineMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disciplinePopupService: DisciplineMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.disciplinePopupService
                    .open(DisciplineMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.disciplinePopupService
                    .open(DisciplineMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
