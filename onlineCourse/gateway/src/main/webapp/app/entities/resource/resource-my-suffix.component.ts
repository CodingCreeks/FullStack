import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ResourceMySuffix } from './resource-my-suffix.model';
import { ResourceMySuffixService } from './resource-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-resource-my-suffix',
    templateUrl: './resource-my-suffix.component.html'
})
export class ResourceMySuffixComponent implements OnInit, OnDestroy {
resources: ResourceMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resourceService: ResourceMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resourceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resources = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResources();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResourceMySuffix) {
        return item.id;
    }
    registerChangeInResources() {
        this.eventSubscriber = this.eventManager.subscribe('resourceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
