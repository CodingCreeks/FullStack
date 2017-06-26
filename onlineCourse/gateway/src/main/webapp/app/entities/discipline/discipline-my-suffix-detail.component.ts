import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { DisciplineMySuffix } from './discipline-my-suffix.model';
import { DisciplineMySuffixService } from './discipline-my-suffix.service';

@Component({
    selector: 'jhi-discipline-my-suffix-detail',
    templateUrl: './discipline-my-suffix-detail.component.html'
})
export class DisciplineMySuffixDetailComponent implements OnInit, OnDestroy {

    discipline: DisciplineMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private disciplineService: DisciplineMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDisciplines();
    }

    load(id) {
        this.disciplineService.find(id).subscribe((discipline) => {
            this.discipline = discipline;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDisciplines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'disciplineListModification',
            (response) => this.load(this.discipline.id)
        );
    }
}
