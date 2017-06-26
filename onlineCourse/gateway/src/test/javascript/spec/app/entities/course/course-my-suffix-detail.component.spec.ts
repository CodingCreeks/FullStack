import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CourseMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/course/course-my-suffix-detail.component';
import { CourseMySuffixService } from '../../../../../../main/webapp/app/entities/course/course-my-suffix.service';
import { CourseMySuffix } from '../../../../../../main/webapp/app/entities/course/course-my-suffix.model';

describe('Component Tests', () => {

    describe('CourseMySuffix Management Detail Component', () => {
        let comp: CourseMySuffixDetailComponent;
        let fixture: ComponentFixture<CourseMySuffixDetailComponent>;
        let service: CourseMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CourseMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CourseMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(CourseMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CourseMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.course).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
