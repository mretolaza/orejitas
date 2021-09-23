FROM node:14.17-alpine

# Setting working directory
WORKDIR /app

EXPOSE 5000
EXPOSE 5222

# Copying source files
COPY . .

# install app dependencies
RUN npm install

# Running the app
CMD [ "npm", "start" ]