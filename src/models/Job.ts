import { IJob } from "../types/job";

import mongoose, { Schema } from 'mongoose';

const JobSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  technologies: {
    type: [String],
    default: []
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    enum: ['dou.ua', 'djinni.co', 'others']
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  notified: {
    type: Boolean,
    default: false,
  }
}, 
{
  timestamps: true
});

JobSchema.index({ title: 'text', company: 'text', description: 'text', technologies: 'text' });
JobSchema.index({ url: 1 });
JobSchema.index({ source: 1, postedAt: -1 });
JobSchema.index({ notified: 1, postedAt: -1 });

const JobModel = mongoose.model<IJob>('Job', JobSchema);

export default JobModel;