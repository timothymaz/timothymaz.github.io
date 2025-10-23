import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCalendar, FiTag, FiShare2, FiCheck } from 'react-icons/fi';
import { getPostBySlug, getRelatedPosts } from './blogData';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const foundPost = getPostBySlug(slug);
    if (foundPost) {
      setPost(foundPost);
      setRelatedPosts(getRelatedPosts(foundPost));
      // Scroll to top when post loads
      window.scrollTo(0, 0);
    } else {
      // Post not found, redirect to blog listing
      navigate('/blog');
    }
  }, [slug, navigate]);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    };

    // Try to use native Web Share API first
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (!post) {
    return (
      <div className="blog-post-loading">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Back Button */}
      <div className="back-button-wrapper">
        <div className="container">
          <Link to="/blog" className="back-button">
            <FiArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>

      {/* Post Header */}
      <header className="post-header">
        <div className="container">
          <div className="post-header-content">
            <div className="post-category-badge">{post.category}</div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>

            <div className="post-meta-info">
              <div className="meta-left">
                <div className="meta-item">
                  <FiCalendar />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="meta-item">
                  <FiClock />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="meta-item author">
                  By {post.author}
                </div>
              </div>

              <button className="share-button" onClick={handleShare}>
                {copied ? <FiCheck /> : <FiShare2 />}
                {copied ? 'Link Copied!' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="featured-image-wrapper">
        <div className="container">
          <div className="featured-image">
            <img src={post.featuredImage} alt={post.title} />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <article className="post-content-wrapper">
        <div className="container">
          <div className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Tags */}
      <div className="post-tags-section">
        <div className="container">
          <div className="tags-wrapper">
            <FiTag className="tags-icon" />
            <div className="tags-list">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag-item">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-posts-section">
          <div className="container">
            <h2 className="related-posts-title">Related Articles</h2>
            <div className="related-posts-grid">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="related-post-card"
                >
                  <div className="related-post-image">
                    <img src={relatedPost.thumbnail} alt={relatedPost.title} loading="lazy" />
                  </div>
                  <div className="related-post-content">
                    <div className="related-post-category">{relatedPost.category}</div>
                    <h3 className="related-post-title">{relatedPost.title}</h3>
                    <p className="related-post-excerpt">{relatedPost.excerpt}</p>
                    <div className="related-post-meta">
                      <span className="related-read-time">
                        <FiClock /> {relatedPost.readTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="post-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want to discuss security strategies?</h2>
            <p>Let's connect and talk about cybersecurity challenges in MSP environments.</p>
            <Link to="/contact" className="cta-button">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
