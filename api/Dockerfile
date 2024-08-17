FROM node:18
WORKDIR /app

#RUN npm install

COPY dist/  ./dist
COPY package.json ./
COPY .env.d ./.env
COPY node_modules ./node_modules

#RUN npm installls
EXPOSE 80 
CMD ["node", "dist/index.js"]
