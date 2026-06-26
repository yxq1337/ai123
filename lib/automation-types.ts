// AI内容自动化系统的类型定义

export interface PostData {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featuredImage?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  originalSource?: string;
  publishDate?: string;
}

export interface PublishRequest {
  apiKey: string;
  siteId: string;
  post: PostData;
  options?: {
    autoPublish: boolean;
    imageLocalization: boolean;
    seoOptimization: boolean;
  };
}

export interface PublishResponse {
  success: boolean;
  message: string;
  postId?: string;
  postUrl?: string;
  error?: string;
}

export interface AutomationConfig {
  sites: SiteConfig[];
}

export interface SiteConfig {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  active: boolean;
  contentSettings: ContentSettings;
}

export interface ContentSettings {
  categories: string[];
  defaultAuthor: string;
  autoPublish: boolean;
  postTemplate: 'tool' | 'blog' | 'review';
  minWordCount: number;
  maxWordCount: number;
}

export interface AutomationLog {
  id: string;
  timestamp: string;
  siteId: string;
  action: string;
  status: 'success' | 'error' | 'pending';
  details: string;
}
