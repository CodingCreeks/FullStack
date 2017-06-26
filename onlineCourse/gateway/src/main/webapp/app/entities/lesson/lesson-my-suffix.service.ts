import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LessonMySuffixService {

    private resourceUrl = 'api/lessons';

    constructor(private http: Http) { }

    create(lesson: LessonMySuffix): Observable<LessonMySuffix> {
        const copy = this.convert(lesson);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(lesson: LessonMySuffix): Observable<LessonMySuffix> {
        const copy = this.convert(lesson);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<LessonMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(lesson: LessonMySuffix): LessonMySuffix {
        const copy: LessonMySuffix = Object.assign({}, lesson);
        return copy;
    }
}
