FROM node

USER node
WORKDIR /home/node

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# RUN npm install -g @angular/cli

# RUN npm install -g @feathersjs \
#         && npm install -g express-generator

EXPOSE 3000

ADD . /home/node

RUN cd /home/node && npm install

#CMD npm install /home/node/app
RUN cd /home/node
CMD npm start /home/node