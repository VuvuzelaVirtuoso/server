FROM library/node:latest
WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm install --omit=dev
COPY . /src
CMD ["npm", "start"]
