CREATE DATABASE IF NOT EXISTS july24_db;
USE july24_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'victim', 'family', 'volunteer', 'organization') NOT NULL,
  phone VARCHAR(20),
  organization_name VARCHAR(255),
  address TEXT,
  emergency_contact VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_role ON users(role); 