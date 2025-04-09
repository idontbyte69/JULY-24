CREATE DATABASE IF NOT EXISTS july24_db;
USE july24_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'victim', 'family', 'volunteer', 'organization') NOT NULL,
  organization_name VARCHAR(255),
  address TEXT,
  emergency_contact VARCHAR(255),
  verification_method ENUM('email', 'phone') NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
); 