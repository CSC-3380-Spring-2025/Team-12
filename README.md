# Ghost Town Guessr : Team #12
# Members
Project Manager: Hannah Lowery (HannahLowery)\
Communications Lead: Adam Brown (adambrown00)\
Git Master: Benny Ly (bly3)\
Design Lead: Truong Nguyen (TruongNguyen0607)\
Quality Assurance Tester: Layla Jones (ljon188)

# About Our Software

Ghost Town GeoGuessr website is a spooky twist on the classic Google GeoGuessr game. It is a map based guessing game of haunted abaonded locations around the world
## Platforms Tested on
- MacOS
- Windows
# Important Links
Kanban Board: https://github.com/orgs/CSC-3380-Spring-2025/projects/12
Designs: [link]\ 
Styles Guide(s): [link]

# How to Run Dev and Test Environment
npm install vite 
npm install --save-dev typescript
npm run dev

docker-compose down
docker-compose up -d
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
docker-compose up 

## Dependencies
- List all dependencies here
- Don't forget to include versions
### Downloading Dependencies
https://react.dev
https://www.docker.com

## Commands
Describe how the commands and process to launch the project on the main branch in such a way that anyone working on the project knows how to check the affects of any code they add.

In the terminal preferably VSCode run "npm install vite"
after running that run "npm install --save-dev typescript" next run "npm run dev" now you should be able to run the frontend 

To run the backend click the "+" to open a new terminal while the frontend is still running run in the new terminal you created run "docker-compose down" then run "docker-compose up -d" then run "docker-compose exec backend python manage.py makemigrations" and then run "docker-compose exec backend python manage.py migrate" and lastely run "docker-compose up"

Now go back yo your terminal with the frontend and click the link and both the frontend and backend should be working
