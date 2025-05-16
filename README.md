**Calmpus E-Commerce**

Calmpus was created to provide a vibrant, user-friendly e-commerce platform for campus students in Lagos, Nigeria, offering affordable products with a seamless shopping experience. It reflects my passion for building impactful solutions, simplifying online shopping with secure authentication and efficient inventory management.

**What Was Built**
Calmpus is a modern e-commerce platform with user authentication, profile management, and robust inventory tools. Users can log in, manage profiles, browse products, and make purchases. The platform features a dynamic UI with an Interactive Campus Constellation hero section, optimized for mobile and desktop.

**How It Was Built**
Frontend: Built with React and Vite for fast development, using React Router for smooth navigation.

Styling: Powered by Chakra UI for accessible, responsive design, with Framer Motion for engaging animations.

Authentication: Integrated Auth0 (v2.2.4) for secure login and Supabase for backend auth and PostgreSQL for user and inventory data.

Backend: Uses Axios for API calls and dotenv for secure environment variables, with Supabase’s PostgreSQL for data management.

Testing: Configured with Jest and Testing Library for component and integration tests.

**Key Features:**
Secure user login and profile management via Auth0 and Supabase.
Real-time inventory management with PostgreSQL.
Mobile-optimized UI with animated constellation hero section.
Seamless product browsing and checkout.
Tech Stack: React, Vite, Chakra UI, Framer Motion, Auth0, Supabase, PostgreSQL, Axios, Jest.

**CI/CD Pipeline**
Automated workflows ensure code quality and seamless deployment:

Continuous Integration: On every push/pull request to main, GitHub Actions runs:
Unit and integration tests using Jest.
Build validation to ensure production-ready code.

Continuous Deployment: On successful CI, the app is automatically deployed to Netlify

Live Site: (https://calmpus.netlify.app)
