# base image
FROM node:latest

# set working directory
RUN mkdir /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

RUN npm run build


# start app
CMD ["npm", "start"]
