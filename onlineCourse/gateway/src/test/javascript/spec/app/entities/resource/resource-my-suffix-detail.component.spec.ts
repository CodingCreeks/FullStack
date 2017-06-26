import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResourceMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/resource/resource-my-suffix-detail.component';
import { ResourceMySuffixService } from '../../../../../../main/webapp/app/entities/resource/resource-my-suffix.service';
import { ResourceMySuffix } from '../../../../../../main/webapp/app/entities/resource/resource-my-suffix.model';

describe('Component Tests', () => {

    describe('ResourceMySuffix Management Detail Component', () => {
        let comp: ResourceMySuffixDetailComponent;
        let fixture: ComponentFixture<ResourceMySuffixDetailComponent>;
        let service: ResourceMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ResourceMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResourceMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ResourceMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResourceMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResourceMySuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ResourceMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resource).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
