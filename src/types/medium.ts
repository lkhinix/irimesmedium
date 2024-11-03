export interface MediumPost {
  title: string;
  content: string;
  contentFormat: 'html' | 'markdown';
  tags: string[];
  publishStatus: 'public' | 'draft' | 'unlisted';
  license?: string;
  canonicalUrl?: string;
  scheduledTime: string;
}

export interface ScheduledPost extends MediumPost {
  id: string;
  status: 'pending' | 'published' | 'failed';
}