import { Document } from 'mongoose';

export interface IJob extends Document {
    title: string,
    company: string,
    location?: string,
    salary?: string,
    technologies: string[],
    url: string,
    source: 'dou.ua' | 'djinni.co' | 'other',
    postedAt?: Date,
    notified: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}