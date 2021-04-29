\c nc_games_test

SELECT reviews.* , COUNT(comments.review_id) AS comments_count FROM reviews 
LEFT JOIN comments on reviews.review_id = comments.review_id
WHERE reviews.review_id = 2
GROUP BY reviews.review_id;
