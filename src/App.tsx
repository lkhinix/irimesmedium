import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from './components/FileUpload';
import { PostList } from './components/PostList';
import { IntervalSettings } from './components/IntervalSettings';
import { MediumPost, ScheduledPost } from './types/medium';

function App() {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [interval, setInterval] = useState(1);

  const handleFileLoad = (loadedPosts: MediumPost[]) => {
    const scheduledPosts: ScheduledPost[] = loadedPosts.map(post => ({
      ...post,
      id: uuidv4(),
      status: 'pending'
    }));
    setPosts(scheduledPosts);
  };

  const handlePublishNow = async (post: ScheduledPost) => {
    try {
      // TODO: Implement Medium API integration
      console.log('Publishing post:', post);
      
      // Update post status
      setPosts(currentPosts =>
        currentPosts.map(p =>
          p.id === post.id
            ? { ...p, status: 'published' as const }
            : p
        )
      );
    } catch (error) {
      console.error('Failed to publish post:', error);
      
      // Update post status to failed
      setPosts(currentPosts =>
        currentPosts.map(p =>
          p.id === post.id
            ? { ...p, status: 'failed' as const }
            : p
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Medium Post Scheduler</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Upload Posts</h2>
            <FileUpload onFileLoad={handleFileLoad} />
          </section>

          {posts.length > 0 && (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Interval Settings</h2>
                <IntervalSettings
                  interval={interval}
                  onIntervalChange={setInterval}
                />
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
                <PostList
                  posts={posts}
                  onPublishNow={handlePublishNow}
                />
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;