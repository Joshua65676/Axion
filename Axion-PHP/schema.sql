CREATE TABLE IF NOT EXISTS users (
  user_id BIGINT UNSIGNED NOT NULL,
  screen_name VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  secret VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS bookmark (
  user_id BIGINT UNSIGNED NOT NULL,
  tweet_id BIGINT UNSIGNED NOT NULL,
  username VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  tweet_url TEXT NOT NULL,
  profile_pic TEXT NOT NULL,
  tweet_text MEDIUMTEXT NOT NULL,
  media MEDIUMTEXT NOT NULL,
  video TEXT NOT NULL,
  comments VARCHAR(64) NOT NULL,
  retweets VARCHAR(64) NOT NULL,
  likes VARCHAR(64) NOT NULL,
  views VARCHAR(64) NOT NULL,
  category VARCHAR(255) NOT NULL,
  is_verified TINYINT(1) NOT NULL DEFAULT 0,
  stickers MEDIUMTEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (user_id, tweet_id),
  KEY idx_bookmark_tweet_id (tweet_id),
  KEY idx_bookmark_user_category (user_id, category),
  CONSTRAINT fk_bookmark_user FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS search_historys (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  term VARCHAR(255) NOT NULL,
  searched_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_search_history_user_term (user_id, term),
  KEY idx_search_history_user_time (user_id, searched_at),
  CONSTRAINT fk_search_history_user FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;