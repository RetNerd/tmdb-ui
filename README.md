# TMDB-UI  
This is a minimalist solution to query the tmdb graphql database and display its content. The application also includes searching through the wikipedia API.

## Usage
Clone this repository and choose one of the following approaches.
### Direct
This requires nodejs 16.14.2 installed on your computer.  
Run
```
npm install && npm start
```

The development server should be available on http://localhost:3000  
### Docker
This requires docker installed on your computer, and will provide a production ready image based on nginx:alpine  
Run
```
docker build -t <image_name> .
docker run -p <host_port>:<container_port> --env PORT=<container_port> <image_name>
```
<image_name> - image name of your choosing  
<host_port> - the port you would like the application to be available on your machine  
<container_port> - the port you would like the application to listen on, by default this is set to 8080.  
Even if you leave the container port as is, the -p switch is mandatory for the application to be reachable.

## Known issues
Movie list loads slowly: This could be solved by querying reviews and cast in separate graphql queries for only the specific movie.  
Tests: Oh boy...

