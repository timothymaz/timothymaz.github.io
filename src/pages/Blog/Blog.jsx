import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiClock, FiTag, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { blogPosts, getFeaturedPosts, getAllCategories, searchPosts, filterByCategory } from './blogData';
import './Blog.css';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPosts = getFeaturedPosts();
  const categories = ['all', ...getAllCategories()];

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Apply category filter
    if (selectedCategory !== 'all') {
      posts = filterByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery);
      // Further filter by category if selected
      if (selectedCategory !== 'all') {
        posts = posts.filter(post => post.category === selectedCategory);
      }
    }

    return posts;
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="blog-page">
      {/* Header */}
      <section className="blog-header">
        <div className="container">
          <h1 className="page-title">
            Security <span className="text-gradient">Insights</span>
          </h1>
          <p className="page-description">
            Real-world lessons from managing cybersecurity for 3,500+ endpoints across 40+ clients.
            Deep dives into MSP security operations, tool evaluations, and incident response.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {!searchQuery && selectedCategory === 'all' && featuredPosts.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <h2 className="section-title">Featured Articles</h2>
            <div className="featured-grid">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="featured-card"
                >
                  <div className="featured-image">
                    <img src={post.thumbnail} alt={post.title} loading="lazy" />
                    <div className="featured-badge">Featured</div>
                  </div>
                  <div className="featured-content">
                    <div className="post-meta">
                      <span className="post-category">{post.category}</span>
                      <span className="post-date">
                        <FiCalendar /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="featured-title">{post.title}</h3>
                    <p className="featured-excerpt">{post.excerpt}</p>
                    <div className="featured-footer">
                      <span className="read-time">
                        <FiClock /> {post.readTime} min read
                      </span>
                      <span className="read-more">
                        Read More <FiArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="filter-section">
        <div className="container">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search articles by title, tags, or keywords..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category === 'all' ? 'All Articles' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <>
              <div className="results-count">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              </div>
              <div className="blog-grid">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="blog-card">
                    <Link to={`/blog/${post.slug}`} className="blog-card-link">
                      <div className="blog-card-image">
                        <img src={post.thumbnail} alt={post.title} loading="lazy" />
                        <div className="blog-card-overlay">
                          <span className="read-more-overlay">
                            Read Article <FiArrowRight />
                          </span>
                        </div>
                      </div>
                      <div className="blog-card-content">
                        <div className="post-meta">
                          <span className="post-category">{post.category}</span>
                          <span className="post-read-time">
                            <FiClock /> {post.readTime} min
                          </span>
                        </div>
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                        <div className="blog-card-footer">
                          <div className="post-tags">
                            <FiTag />
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                          </div>
                          <div className="post-date">
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <h3>No articles found</h3>
              <p>
                {searchQuery
                  ? `No articles match your search "${searchQuery}"`
                  : `No articles in the ${selectedCategory} category`
                }
              </p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
