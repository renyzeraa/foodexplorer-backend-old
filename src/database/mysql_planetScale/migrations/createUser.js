const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  );
`;

module.exports = createUsers;
