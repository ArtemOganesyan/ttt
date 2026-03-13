CREATE TABLE IF NOT EXISTS registration_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gender VARCHAR(10) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    day_of_birth VARCHAR(2) NOT NULL,
    month_of_birth VARCHAR(2) NOT NULL,
    year_of_birth VARCHAR(4) NOT NULL,
    email VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    newsletter BOOLEAN NOT NULL DEFAULT TRUE,
    password VARCHAR(100) NOT NULL
);

INSERT INTO registration_data (gender, first_name, last_name, day_of_birth, month_of_birth, year_of_birth, email, company, newsletter, password)
VALUES
    ('Male', 'Artem', 'Oganesyan', '8', '5', '1983', 'artem.oganesyan@example.com', 'Test Company Inc.', FALSE, 'Abc12345!'),
    ('Female', 'Elena', 'Petrova', '15', '11', '1990', 'elena.petrova@example.com', 'Global Tech LLC', TRUE, 'Secure99#'),
    ('Male', 'James', 'Wilson', '22', '3', '1985', 'james.wilson@example.com', 'Bright Solutions Corp.', TRUE, 'Pass2024$');
