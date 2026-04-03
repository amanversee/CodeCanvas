# AI Resume Builder

A modern, full-stack resume builder powered by AI. Generate professional resumes in minutes with intelligent suggestions and beautiful templates.

## 🚀 Features

- **AI-Powered Generation**: Instantly generate resume content from your basic details.
- **Multiple Templates**: Choose from several professional resume templates.
- **Save & Edit**: Manage your resumes in your personal dashboard.
- **Portfolio Ready**: Host your resume and share it with recruiters.
- **Responsive Design**: Built with React and Tailwind CSS for a seamless experience on all devices.

## 🛠 Tech Stack

- **Frontend**: [React.js](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **AI Engine**: [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- **Storage**: [Cloudinary](https://cloudinary.com/) (for profile images/resumes)

## 📦 Getting Started

To get the project running locally:

1. **Clone the project**
   ```bash
   git clone <your-repo-link>
   cd ai-resume-builder
   ```

2. **Install Dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the `backend/` directory with the following variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret key for authentication.
   - `JWT_EXPIRE`: Token expiration (e.g., 30d).
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key.
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
   - `GEMINI_API_KEY`: Your Google Gemini API Key.

4. **Run the Project**
   ```bash
   npm start
   ```
   This will start both the backend (port 5000) and frontend (port 5173).

## 📄 License

This project is licensed under the [MIT License](LICENSE).
