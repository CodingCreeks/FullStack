import { BaseEntity } from './../../shared';

const enum Language {
    'ENGLISH',
    'SPANISH',
    'GERMAN'
}

export class LessonMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public lessonTitle?: string,
        public lessonDescription?: string,
        public language?: Language,
        public resources?: BaseEntity[],
        public courses?: BaseEntity[],
    ) {
    }
}
