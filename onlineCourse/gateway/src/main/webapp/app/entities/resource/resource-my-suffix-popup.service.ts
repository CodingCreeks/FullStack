import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResourceMySuffix } from './resource-my-suffix.model';
import { ResourceMySuffixService } from './resource-my-suffix.service';

@Injectable()
export class ResourceMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resourceService: ResourceMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resourceService.find(id).subscribe((resource) => {
                this.resourceModalRef(component, resource);
            });
        } else {
            return this.resourceModalRef(component, new ResourceMySuffix());
        }
    }

    resourceModalRef(component: Component, resource: ResourceMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resource = resource;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
