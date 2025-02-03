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
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  birthday DATE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  biography TEXT,
  role_id INT DEFAULT 2,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);


# User 1: email: admin@gmail.com password: password
# User 2: email: user@gmail.com password: password
INSERT INTO user (name, lastname, birthday, email, password, role_id, avatar, biography)
VALUES
  ('anthony', 'leg', '1990-01-01', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$x6eH0px8Ev13rYR3gYBfGg$Lihy2+tpPTjCI/9PlmjL/XHDGY8MLC3HRXwhImji/BA', 1, 'default.jpg', 'J\'aime les frites'),
  ('nabil', 'leg', '1992-05-15', 'user@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$C1pKBbZBtH7Wpz/u9kYiaw$0GXRcphq+Td4cbP4QRO+gsdBci01l+dLOU5JnfQKUAE', 2, 'default.jpg', 'J\'aime les burgers');

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
