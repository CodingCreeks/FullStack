import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { CourseMySuffix } from './course-my-suffix.model';
import { CourseMySuffixPopupService } from './course-my-suffix-popup.service';
import { CourseMySuffixService } from './course-my-suffix.service';

@Component({
    selector: 'jhi-course-my-suffix-delete-dialog',
    templateUrl: './course-my-suffix-delete-dialog.component.html'
})
export class CourseMySuffixDeleteDialogComponent {

    course: CourseMySuffix;

    constructor(
        private courseService: CourseMySuffixService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.courseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'courseListModification',
                content: 'Deleted an course'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('gatewayApp.course.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-course-my-suffix-delete-popup',
    template: ''
})
export class CourseMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursePopupService: CourseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.coursePopupService
                .open(CourseMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
