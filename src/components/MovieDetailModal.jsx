import React from 'react'

const MovieDetailModal = ({ movie, onClose, trendingRank }) => {
  if (!movie) return null;

  // 兼容 Trending 数据格式 (poster_url) 和普通电影格式 (poster_path)
  const posterUrl = movie.poster_url ||
    (movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png');

  const title = movie.title || movie.searchTerm || '未知电影';
  const voteAverage = movie.vote_average;
  const voteCount = movie.vote_count;
  const releaseDate = movie.release_date;
  const originalLanguage = movie.original_language;
  const overview = movie.overview;
  const popularity = movie.popularity;
  const searchCount = movie.count; // Trending 专有字段

  // 点击遮罩层关闭
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="movie-detail-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* 热度排名徽章 */}
        {trendingRank && (
          <div className="trending-rank-badge">
            <span className="rank-number">#{trendingRank}</span>
            <span className="rank-label">热搜榜</span>
          </div>
        )}

        <div className="modal-content">
          <div className="modal-poster">
            <img src={posterUrl} alt={title} />
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{title}</h2>

            <div className="modal-meta">
              {voteAverage && (
                <div className="modal-rating">
                  <img src="star.svg" alt="Star Icon" />
                  <span>{voteAverage.toFixed(1)}</span>
                  {voteCount && <span className="vote-count">({voteCount} 票)</span>}
                </div>
              )}

              <div className="modal-details">
                {originalLanguage && (
                  <span className="detail-item">
                    <strong>语言：</strong>
                    {originalLanguage.toUpperCase()}
                  </span>
                )}
                {releaseDate && (
                  <span className="detail-item">
                    <strong>上映年份：</strong>
                    {releaseDate.split('-')[0]}
                  </span>
                )}
                {popularity && (
                  <span className="detail-item">
                    <strong>热度：</strong>
                    {popularity.toFixed(0)}
                  </span>
                )}
                {searchCount && (
                  <span className="detail-item trending-count">
                    <strong>🔥 搜索次数：</strong>
                    {searchCount}
                  </span>
                )}
              </div>
            </div>

            <div className="modal-overview">
              <h3>剧情简介</h3>
              <p>{overview || '暂无简介'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailModal

