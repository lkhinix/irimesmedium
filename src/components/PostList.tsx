import { useState } from 'react';
import { format } from 'date-fns';
import { ScheduledPost } from '../types/medium';

interface PostListProps {
  posts: ScheduledPost[];
  onPublishNow: (post: ScheduledPost) => void;
}

export function PostList({ posts, onPublishNow }: PostListProps) {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                Scheduled: {format(new Date(post.scheduledTime), 'PPpp')}
              </p>
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onPublishNow(post)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Publish Now
            </button>
          </div>
          <button
            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
            className="text-sm text-blue-500 mt-2"
          >
            {expandedPost === post.id ? 'Show less' : 'Show more'}
          </button>
          {expandedPost === post.id && (
            <div className="mt-4 prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}