import { BaseEntity } from './../../shared';

const enum Level {
    'NOVOICE',
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'PROFESSIONAL'
}

export class CourseMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public courseTitle?: string,
        public courseDescription?: string,
        public coursePrice?: number,
        public courseLevel?: Level,
        public resources?: BaseEntity[],
        public lessons?: BaseEntity[],
        public programs?: BaseEntity[],
    ) {
    }
}
