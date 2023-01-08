FROM node:19

# Move package.json into a tmp directory
ADD package.json /tmp/package.json

# Remove the old build directory
RUN rm -rf build

# Install the dependencies
RUN cd /tmp && npm install -q

# Add current directory content to source
ADD ./ /src

# Copy to dependencies to the source directory
RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src/

# Set the working directory
WORKDIR /src

# Build the appliction
RUN npm run build

# Run the built application
CMD ["node", "build"]