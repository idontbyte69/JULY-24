# JULY 24 Project

A comprehensive web platform dedicated to documenting and managing information about the events of July 24, providing support to victims and their families, and facilitating coordination between various stakeholders.

## 🌟 Features

### Public Features
- **Victim Memorial**: Browse and search through victim profiles
- **News & Updates**: Latest news and articles about the events
- **Gallery**: Photo and video documentation
- **Donation System**: Multiple ways to contribute and support
- **Contact & Support**: Various channels for assistance and information

### Dashboard Features
- **Victim Records Management**: Track and manage victim information
- **Case Management**: Track and manage support cases
- **Support Requests**: Handle various types of support requests
- **Resource Management**: Manage and distribute resources
- **Content Approval**: Review and approve articles and media
- **Security & Audit**: Monitor system security and user activities
- **Settings**: Configure system parameters and preferences

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14.1.0
- **Language**: TypeScript 5.3.3
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 3.4.1
- **CSS Processing**: PostCSS 8.4.35, Autoprefixer 10.4.17

### Backend
- **Runtime**: Node.js
- **Database**: MySQL (mysql2 3.14.0)
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2

### Development Tools
- **Type Checking**: TypeScript
- **Code Quality**: ESLint
- **Version Control**: Git

## 🛠️ Setup Instructions

1. **Prerequisites**
   - Node.js (v18 or higher)
   - MySQL (v8.0 or higher)
   - Git

2. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/july-24.git
   cd july-24
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Database Setup**
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Run the schema file
   source schema.sql
   ```

5. **Environment Configuration**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL=mysql://username:password@localhost:3306/july24_db
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   
   # Next.js
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📁 Project Structure

```
july-24/
├── src/
│   ├── app/                 # App router pages and API routes
│   ├── components/          # Reusable React components
│   └── lib/                 # Utility functions and database connections
├── public/                  # Static assets
├── schema.sql              # Database schema
└── ...config files
```

## 🔐 Authentication & Authorization

The project uses JWT-based authentication with the following roles:
- Admin
- Victim
- Family
- Volunteer
- Organization

## 📊 Database Schema

The database includes the following main tables:
- `users`: User accounts and profiles
- `cases`: Victim cases and their status
- `support_requests`: Various types of support requests
- `resources`: Available resources and services

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Developers

- [Tanveer](https://github.com/idontbyte69)
- [Sayed](https://github.com/yourusername)

## 🙏 Acknowledgments

- All contributors and supporters
- The community for their continuous support
- Various open-source projects that made this possible

---