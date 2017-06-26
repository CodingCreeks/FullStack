import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { ResourceMySuffix } from './resource-my-suffix.model';
import { ResourceMySuffixPopupService } from './resource-my-suffix-popup.service';
import { ResourceMySuffixService } from './resource-my-suffix.service';

@Component({
    selector: 'jhi-resource-my-suffix-delete-dialog',
    templateUrl: './resource-my-suffix-delete-dialog.component.html'
})
export class ResourceMySuffixDeleteDialogComponent {

    resource: ResourceMySuffix;

    constructor(
        private resourceService: ResourceMySuffixService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resourceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resourceListModification',
                content: 'Deleted an resource'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('gatewayApp.resource.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-resource-my-suffix-delete-popup',
    template: ''
})
export class ResourceMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resourcePopupService: ResourceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resourcePopupService
                .open(ResourceMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
