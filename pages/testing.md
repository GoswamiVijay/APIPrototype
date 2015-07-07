---
permalink: /testing/
layout: default
title: Testing
---

Testing can be performed either locally (on your workstation) using docker images or on the hosted test server.

The test server is available at [https://test.mymedlookup.org](https://test.mymedlookup.org)

Testing the application on your workstation involves pulling the application images and running them. The production application runs 2 web containers load balanced by nginx server, you can either run a simple configuration with one web server and database server or simulate the production environment with 1 nginx server connected to 2 web servers. The webservers are connected to the database server.
## <a name="top"></a>Jump to ###


* [Pull docker images](#pull-docker-images)
* [Run simple configuration](#run-simple-configuration)
* [Run production configuration](#run-production-configuration)

## <a name="pull-docker-images"></a>Pull docker images ###
You can test the application locally on your box by pulling down [docker](https://hub.docker.com/ "docker") images. A docker image build is triggered when changes are pushed to the github repository. Docker images are available for following branches

1. [develop](https://github.com/GoswamiVijay/APIPrototype/tree/develop)
2. [dev-integration](https://github.com/GoswamiVijay/APIPrototype/tree/dev-integration)
3. [master](https://github.com/GoswamiVijay/APIPrototype/tree/master)
4. [test](https://github.com/GoswamiVijay/APIPrototype/tree/test)


The following images are publicly available on docker hub [API Prototype Images](https://registry.hub.docker.com/u/goswamivijay/)

1. Images built from develop branch
  * [goswamivijay/apiprototype-web-develop](https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-test/) 
  * [goswamivijay/apiprototype-nginx-develop](https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-develop/) 
  * [goswamivijay/apiprototype-db-develop](https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-develop/) 

2. Images built from dev-integration branch
  * [goswamivijay/apiprototype-nginx-devint](https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-devint/) 
  * [goswamivijay/apiprototype-web-devint](https://registry.hub.docker.com/u/goswamivijay/apiprototype-web-devint/) 

3. Images built from test branch
  * [goswamivijay/apiprototype-web-test](https://registry.hub.docker.com/u/goswamivijay/apiprototype-web-test/) 
  * [goswamivijay/apiprototype-nginx-test](https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-test/) 
  * [goswamivijay/apiprototype-db-test](https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-test/) 

4. Images built from master branch
  * [goswamivijay//apiprototype-web-prod](https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-testgoswamivijay/apiprototype-web-prod/) 
  * [goswamivijay//apiprototype-nginx-prod](https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-testgoswamivijay/apiprototype-nginx-prod/) 

You can install any of the above images on your workstation to test the application.
Please ensure you have docker installed on your workstation. You can follow the instructions [here](https://docs.docker.com/installation/mac/) for installing boot2docker on mac and [here](https://docs.docker.com/installation/windows/) for installing boot2docker on windows. The following instructions assume docker is installed on your box (or you are in docker VM if you are using docker tools such as [boot2docker](http://boot2docker.io/).

To perform testing on the latest checkins from development branch

## <a name="run-simple-configuration"></a>Run simple configuration ###
Pull the web, nginx and db images on your box 


```
$ docker pull goswamivijay/apiprototype-web-develop
$ docker pull goswamivijay/apiprototype-nginx-develop
$ docker pull goswamivijay/apiprototype-db-develop
```
## Testing the application without nginx

Run database server

```
docker run -p 27017:27017 --name mymedlookupdb -d goswamivijay/apiprototype-db-develop
```
*please note the container id that is displayed after you run the command, we will refer to it as the database container id.*

Run web  server

```
docker run -p 4000:4000 --name mymedlookupweb1 -d --link mymedlookupdb:mymedlookupdb goswamivijay/apiprototype-web-develop 
```
*please note the container id that is displayed after you run the command, we will refer to it as the web container id.*

Navigate to http://\<*server address*\>:4000/ in your browser

To find the \<*server address*\> if you are running boot2docker, enter the following command

```
$ boot2docker ip 
```

To stop the containers, run the following command

```
$ docker stop <web container id>
$ docker stop <db container id>
```

*the web container id and the web container id are the ids that were diplayed when you used the run command.*
If you don't have the container id, you can query the conatiner id by running the following command

```
$ docker stop ps
```
The container id will be listed with the corresponding name of the container (mymedlookupweb1 for web and mymedlookupdb for database)

## <a name="run-production-configuration"></a>Run Production configuration ###
*if you have already run the steps in [Run simple configuration](#run-simple-configuration) then you have to either remove the container using the following commands* 

```
$ docker rm <web container id>
$ docker rm <db container id>
```

*or  substitute the run commands with __docker start__ command. The following instructions assume you haven't run the steps in [Run simple configuration](#run-simple-configuration) or you have removed the existing containers. i.e. you don't have any containers with same name either in running or stopped mode*

Run database server

```
docker run -p 27017:27017 --name mymedlookupdb -d goswamivijay/apiprototype-db-develop
```
*please note the container id that is displayed after you run the command, we will refer to it as the database container id.*

Run web  server - 1

```
docker run -p 4000 --name mymedlookupweb1 -d --link mymedlookupdb:mymedlookupdb goswamivijay/apiprototype-web-develop
```
*please note the container id that is displayed after you run the command, we will refer to it as the web container id.*

Run web  server - 2

```
docker run -p 4000 --name mymedlookupweb2 -d --link mymedlookupdb:mymedlookupdb goswamivijay/apiprototype-web-develop 
```
*please note the container id that is displayed after you run the command, we will refer to it as the web container id.*

Run nginx server

```
docker run -p 8090:80  --name mymedlookupproxy -d --link mymedlookupweb1:mymedlookupweb1 --link mymedlookupweb2:mymedlookupweb2 goswamivijay/apiprototype-nginx-develop
```
*please note the container id that is displayed after you run the command, we will refer to it as the web container id.*

Navigate to http://\<*server address*\>:8090/ in your browser

To find the \<*server address*\> if you are running boot2docker, enter the following command

```
$ boot2docker ip 
```

To stop the containers, run the following command

```
$ docker stop <mymedlookupproxy container id>
$ docker stop <mymedlookupweb1 container id>
$ docker stop <mymedlookupweb2 container id>
$ docker stop <mymedlookupdb container id>
```

*the web container id and the web container id are the ids that were diplayed when you used the run command.*
If you don't have the container id, you can query the container id by running the following command which will return stopped containers.

```
$ docker ps
```

To get a list of running containers, use the following command

```
$ docker ps
```

The container id will be listed with the corresponding name of the container (mymedlookupproxy for nginx server, mymedlookupweb1 for web and mymedlookupdb for database server)




