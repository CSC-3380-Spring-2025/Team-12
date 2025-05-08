# Ghost Town Guessr – Team #12

## Team Members
- **Project Manager:** Hannah Lowery (@HannahLowery)  
- **Communications Lead:** Adam Brown (@adambrown00)  
- **Git Master:** Benny Ly (@bly3)  
- **Design Lead:** Truong Nguyen (@TruongNguyen0607)  
- **Quality Assurance Tester:** Layla Jones (@ljon188)  
- **Quality Assurance Tester:** Malachi Fowler (@malachi50)

## About the Project
**Ghost Town GeoGuessr** is a web-based game with a spooky twist on Google's GeoGuessr. Players are challenged to guess haunted and abandoned locations using visual and geographic clues on a map.

## Platforms Tested
- macOS  
- Windows

## Important Links
- **Kanban Board:** https://github.com/orgs/CSC-3380-Spring-2025/projects/12  
- **Design Prototypes:** https://www.figma.com/files/project/329596291  
- **Code Style Guide:** https://google.github.io/styleguide/tsguide.html

## Running the Development and Test Environments

### Prerequisites
Make sure the following tools are installed:
- Node.js and npm
- Docker Desktop
- Python 3.13.2

### Frontend Setup

#### Frontend Dependencies
- `@react-google-maps/api`: ^2.20.6  
- `leaflet`: ^1.9.4  
- `react`: ^18.2.0  
- `react-dom`: ^18.2.0  
- `react-icons`: ^5.5.0  
- `react-leaflet`: ^4.2.1  
- `react-router`: ^7.4.1  
- `react-router-dom`: ^7.4.1  
- `@vitejs/plugin-react`: ^4.0.3  
- `@types/leaflet`: ^1.9.17  
- `@types/node`: ^22.14.1  
- `@types/react`: ^18.3.18  
- `@types/react-dom`: ^18.3.5  
- `eslint`: ^8.45.0  
- `eslint-plugin-react`: ^7.32.2  
- `eslint-plugin-react-hooks`: ^4.6.0  
- `eslint-plugin-react-refresh`: ^0.4.3  
- `typescript`: ^5.8.3  
- `vite`: ^4.5.14  

#### Installation and Run
1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd home-page
   npm install
   npm run dev
   ```
2. A development link will appear in the terminal. Open it in your browser to access the application.

### Backend Setup

#### Backend Dependencies
- `asgiref==3.8.1`  
- `Django==5.1.7`  
- `django-cors-headers==4.7.0`  
- `mysqlclient==2.2.7`  
- `sqlparse==0.5.3`

#### Installation and Run
1. Make sure Docker Desktop is running.
2. In a new terminal, navigate to the backend directory:
   ```bash
   cd registerlogin
   docker-compose down
   docker-compose up -d
   docker-compose exec backend python manage.py migrate
   docker-compose up
   ```
3. The backend server will now be running and connected to the frontend.

## Additional Resources
- [Docker Installation Guide](https://docs.docker.com/get-started/get-docker/)  
- [React Installation Guide](https://react.dev/learn/installation)  
- [Django Documentation](https://www.djangoproject.com)

