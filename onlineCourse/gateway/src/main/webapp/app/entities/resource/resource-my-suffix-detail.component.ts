import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResourceMySuffix } from './resource-my-suffix.model';
import { ResourceMySuffixService } from './resource-my-suffix.service';

@Component({
    selector: 'jhi-resource-my-suffix-detail',
    templateUrl: './resource-my-suffix-detail.component.html'
})
export class ResourceMySuffixDetailComponent implements OnInit, OnDestroy {

    resource: ResourceMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resourceService: ResourceMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResources();
    }

    load(id) {
        this.resourceService.find(id).subscribe((resource) => {
            this.resource = resource;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResources() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resourceListModification',
            (response) => this.load(this.resource.id)
        );
    }
}
