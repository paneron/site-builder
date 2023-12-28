FROM node:18.16.1
ARG project_path
RUN corepack enable
RUN corepack prepare yarn@stable --activate
WORKDIR ${project_path:?}
COPY . .
RUN yarn help
CMD ["yarn", "run", "typescript-language-server", "--stdio"]
