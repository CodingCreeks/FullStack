import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ProgramMySuffix } from './program-my-suffix.model';
import { ProgramMySuffixService } from './program-my-suffix.service';

@Component({
    selector: 'jhi-program-my-suffix-detail',
    templateUrl: './program-my-suffix-detail.component.html'
})
export class ProgramMySuffixDetailComponent implements OnInit, OnDestroy {

    program: ProgramMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private programService: ProgramMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrograms();
    }

    load(id) {
        this.programService.find(id).subscribe((program) => {
            this.program = program;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrograms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'programListModification',
            (response) => this.load(this.program.id)
        );
    }
}
