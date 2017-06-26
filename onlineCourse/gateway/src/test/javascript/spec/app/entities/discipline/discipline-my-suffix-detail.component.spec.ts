import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DisciplineMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/discipline/discipline-my-suffix-detail.component';
import { DisciplineMySuffixService } from '../../../../../../main/webapp/app/entities/discipline/discipline-my-suffix.service';
import { DisciplineMySuffix } from '../../../../../../main/webapp/app/entities/discipline/discipline-my-suffix.model';

describe('Component Tests', () => {

    describe('DisciplineMySuffix Management Detail Component', () => {
        let comp: DisciplineMySuffixDetailComponent;
        let fixture: ComponentFixture<DisciplineMySuffixDetailComponent>;
        let service: DisciplineMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DisciplineMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DisciplineMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(DisciplineMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplineMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplineMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DisciplineMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.discipline).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
