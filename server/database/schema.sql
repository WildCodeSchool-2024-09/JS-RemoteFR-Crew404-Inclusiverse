  CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50)
  );

INSERT INTO role (id, name)
VALUES
  (1, "admin"),
  (2, "user");

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  lastname VARCHAR(100),
  birthday DATE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50),
  profile_photo VARCHAR(255),
  biography TEXT
);


CREATE TABLE publication (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  content TEXT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


CREATE TABLE likes (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  publication_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (publication_id) REFERENCES publication(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


CREATE TABLE commentaire (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  content TEXT,
  post_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  publication_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (publication_id) REFERENCES publication(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);



INSERT INTO user (id, name, lastname, birthday, email, password, role, profile_photo, biography)
VALUES
  (1, "toto", "yaya", "1990-01-01", "toto@gmail.com", "querty", "admin", "profile1.jpg", "J'aime les frites "),
  (2, "tata", "yoyo", "1992-05-15", "tata@gmail.com", "azerty", "user", "profile2.jpg", "Jaime les burgers");


INSERT INTO publication (id, publication_date, content, user_id)
VALUES
  (1, CURRENT_TIMESTAMP, "Jaime aussi les burgers.", 1),
  (2, CURRENT_TIMESTAMP, "j'aime aussi les frite.", 2);


INSERT INTO likes (id, publication_id, user_id)
VALUES
  (1, 1, 2), 
  (2, 2, 1); 


INSERT INTO commentaire (id, content, post_date, publication_id, user_id)
VALUES
  (1, "Great post!", CURRENT_TIMESTAMP, 1, 2),
  (2, "Thank you!", CURRENT_TIMESTAMP, 2, 1); 

