
-- To get the total number of documents indexed
-- by each database
SELECT *, COUNT(*)
FROM articles
GROUP BY articles.database;