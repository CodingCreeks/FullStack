import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { DisciplineMySuffix } from './discipline-my-suffix.model';
import { DisciplineMySuffixService } from './discipline-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-discipline-my-suffix',
    templateUrl: './discipline-my-suffix.component.html'
})
export class DisciplineMySuffixComponent implements OnInit, OnDestroy {
disciplines: DisciplineMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private disciplineService: DisciplineMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.disciplineService.query().subscribe(
            (res: ResponseWrapper) => {
                this.disciplines = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDisciplines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DisciplineMySuffix) {
        return item.id;
    }
    registerChangeInDisciplines() {
        this.eventSubscriber = this.eventManager.subscribe('disciplineListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
