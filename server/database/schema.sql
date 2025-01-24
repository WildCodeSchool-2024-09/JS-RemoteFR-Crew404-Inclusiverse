CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO role (id, name)
VALUES
  (1, 'admin'),
  (2, 'user');

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  lastname VARCHAR(100),
  birthday DATE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255),
  biography TEXT,
  role_id INT DEFAULT 2,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

INSERT INTO user (name, lastname, birthday, email, password, role_id, profile_photo, biography)
VALUES
  ('toto', 'yaya', '1990-01-01', 'toto@gmail.com', 'querty', 1, 'profile1.jpg', 'J\'aime les frites'),
  ('tata', 'yoyo', '1992-05-15', 'tata@gmail.com', 'azerty', 2, 'profile2.jpg', 'J\'aime les burgers');

CREATE TABLE publication (
  id INT AUTO_INCREMENT PRIMARY KEY,
  publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  content TEXT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO publication (content, user_id)
VALUES
  ('J\'aime aussi les burgers.', 1),
  ('J\'aime aussi les frites.', 2);

CREATE TABLE likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  publication_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (publication_id) REFERENCES publication(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO likes (publication_id, user_id)
VALUES
  (1, 2), 
  (2, 1); 

CREATE TABLE commentaire (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  post_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  publication_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (publication_id) REFERENCES publication(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO commentaire (content, publication_id, user_id)
VALUES
  ('Great post!', 1, 2),
  ('Thank you!', 2, 1);
