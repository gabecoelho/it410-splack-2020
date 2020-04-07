FROM node:12

WORKDIR /root

# copy package files to root directory
COPY ./package.json /root/package.json
COPY ./package-lock.json /root/package-lock.json

# install dependencies
RUN npm install

# copy the rest of the files
COPY ./src /root/src
COPY ./www /root/www
COPY ./openapi.yml /root/openapi.yml

EXPOSE 3000

# ENTRYPOINT [ "/bin/bash" ]
CMD ["npm", "start"]