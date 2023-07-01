FROM node:19

# Set the working directory
WORKDIR /src

# Add current directory content to source
COPY . .

# Install the dependencies
RUN npm install

# Build the appliction
RUN npm run build

# Run the built application
CMD ["npm", "run", "serve"]