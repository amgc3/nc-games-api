const db = require("./");

const createTables = () => {
  return db
    .query(
      `
    CREATE TABLE categories (
        slug VARCHAR(50) PRIMARY KEY,
        description VARCHAR(250)
    );
  `
    )
    .then(() => {
      return db.query(`
        CREATE TABLE users (
            username VARCHAR(150) PRIMARY KEY,
            avatar_url VARCHAR(300),
            name VARCHAR(250) NOT NULL
        );
        `);
    })
    .then(() => {
      return db
        .query(
          `
        CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            title VARCHAR(250) NOT NULL,
            review_body VARCHAR(500) NOT NULL,
            designer VARCHAR(150),
            review_img_url VARCHAR(300),
            votes INT,
            category VARCHAR(50) REFERENCES categories(slug) NOT NULL,
            owner VARCHAR(150) REFERENCES users(username) NOT NULL
        )
        `
        )
        .then(() => {
          return db.query(`
            CREATE TABLE comments(
                comment_id SERIAL PRIMARY KEY,
                author VARCHAR(150) REFERENCES users(username) NOT NULL,
                review_id INT REFERENCES reviews(review_id) NOT NULL,
                votes INT,
                created_at DATE NOT NULL,
                body VARCHAR(300) NOT NULL
            )
            `);
        });
    });
};

const dropTables = () => {
  return db.query(`DROP TABLE IF EXISTS comments, reviews, users, categories;`);
};

module.exports = { createTables, dropTables };
