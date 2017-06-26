import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProgramMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/program/program-my-suffix-detail.component';
import { ProgramMySuffixService } from '../../../../../../main/webapp/app/entities/program/program-my-suffix.service';
import { ProgramMySuffix } from '../../../../../../main/webapp/app/entities/program/program-my-suffix.model';

describe('Component Tests', () => {

    describe('ProgramMySuffix Management Detail Component', () => {
        let comp: ProgramMySuffixDetailComponent;
        let fixture: ComponentFixture<ProgramMySuffixDetailComponent>;
        let service: ProgramMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ProgramMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProgramMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProgramMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProgramMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgramMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProgramMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.program).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
