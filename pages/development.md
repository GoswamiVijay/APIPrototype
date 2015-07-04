---
permalink: /development/
layout: default
title: Development
---
### <a name="top"></a>Jump to 

* [Setting up development workstation](#setting-up-development-workstation)
* [Prerequisites for developing the application](#prerequisites)
* [Repository branches](#repository-branches)
* [Development workflow](#development-workflow)
* [Building docker images](#building-docker-images)
* [Running the application](#running-the-application)
* [Running the application with docker](#running-the-application-with-docker)
* [Documentation](#user-stories)

### <a name="setting-up-development-workstation"></a>Setting up development workstation
The development workstation can be either Mac or Windows based. The team uses bothe, Apple Mac (Mac) and Windows workstation for developing the application. A Mac is preferred due to low friction in getting the prerequisites installed, availability of package manager for installing applications. The following instructions assume you have a Mac based workstation. Instructions that are windows specific will be pointed out (???todo???)

### Basic setup 
0.  Install XCode and OS X Command Line Tools
reference - https://developer.apple.com/xcode/downloads/

1.  Use the instructions from here https://github.com/18F/laptop to setup your developer box with the required software 
$ curl --remote-name https://raw.githubusercontent.com/18F/laptop/master/mac
$ bash mac 2>&1 | tee ~/laptop.log

2.  Install mongo

```
$ brew install mongodb
```
reference - http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

3. Install Sourcetree 
reference - https://www.sourcetreeapp.com/download/

4. Install Virtual box

reference - https://www.virtualbox.org/wiki/Downloads

5. Install boot2docker

reference - http://boot2docker.io/
Instructions - https://docs.docker.com/installation/mac/

6. Install Textwrangler

reference - http://www.barebones.com/products/textwrangler/

7. Install mongo gui client

reference - http://robomongo.org/

Install VirtualBox - https://www.virtualbox.org/wiki/Downloads

8.  Install ruby gems for working on documentation branch (gh-pages)

```
$ gem install jekyll
$ gem install kramdown
```

9. Install grunt

```
$ npm install -g grunt-cli
```

reference - https://github.com/cfpb/DOCter/blob/gh-pages/README.md

Optional - You can use [sublime](http://www.sublimetext.com/) , [TextWrangler](http://www.barebones.com/products/textwrangler/) or [webstorm](https://www.jetbrains.com/webstorm/)


*If you find yourself having to use sudo for running node, please see this page on how to resolve the issue http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo*

If you haven't done so already, please create an account on github, dockerhub 
The project administrator should also add you to the project team on github, dockerhub, codeship, Jira, confluence and Amazon Cloud


## <a name="prerequisites"></a>Prerequisites for developing the application 

It is assumed you have the editor, and development environment mentioned above already setup.
If you are new to git please use the following resources to learn git and gitflow
[git](https://git-scm.com/book/en/v1/Getting-Started)
[gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
[github pages](https://help.github.com/articles/using-jekyll-with-pages/)
[git branching](http://blog.sourcetreeapp.com/2012/08/01/smart-branching-with-sourcetree-and-git-flow/)

*if you are using the command line to work with github, please use good judgement before merging and/or rebasing. [Google](https://www.google.com/) or [SO](http://stackoverflow.com/) are your friends.*


## <a name="repository-branches"></a>Repository branches
Please refer to [Configuration Management - branches]({{ site.baseurl }}/configuration-management/#branches) for details source code branching. 

Use the develop branch for development, bug fixes and enhancement unless you are working on a feature or a patch in which case a branch will be created for you by the scrum master or configuration manager. 

The master branch is used for releasing to production. Please do not check in code into this branch. Sprint testing and UAT is done on the test branch. Code is deployed daily to dev-integration branch. Please use the dev-integration branch to verify development is complete before closing the ticket.


## <a name="development-workflow"></a>Development workflow

The development workflow is pretty simple

1.  If you are working on a an issue, please make sure the the issue is recorded in Jira or Github issues list and is in the current sprint (if not, create the ticket/issue and and/or move it to current sprint)

2.  When closing the issue, reference the ticket number in the commit message, this allows for referencing the files that were modified when the issue was resolved.

3.  Only check in working code, use [stash](http://git-scm.com/docs/git-stash) to switch work branches or suspend the current activity.

4.  Err on the side of more documentation. If there are configuration settings your are adding or dependecies or steps for building or testing the application, pleas record it in confluence and/or github pages


## <a name="building-docker-images"></a>Building docker images
The following instructions for building the docker images assume you have checked out the develop branch on your workstation and in terminal/command prompt in that folder. If you are running boot2docker, it is assumed you are in the boot2docker shell (run boot2docker from Application folder on mac). Substitute your account name with goswamivijay when building or running the images

__Build mongo db image__

Navigate to Docker-db folder (this is one level down from the application folder)


```
$ cd Docker-db
```

run the following command to build the image

```
$ docker build -t goswamivijay/apiprototype-db-develop .
```

Verify image exist by running the following command. You should see the image listed.

````
$ docker images
```

__Build webapp images__

Navigate to application folder (this is the folder where you checked out the repository)

```
$ docker build -t goswamivijay/apiprototype-web-develop .
```

Verify image exist by running

```
$ docker images
```

Navigate to Docker-nginx folder (this is one level down from the application folder)

```
$ cd Docker-nginx
```

run the following command to build the image

```
$ docker build -t goswamivijay/apiprototype-nginx-develop .
```

Verify image exist by running the following command. You should see the image listed.

````
$ docker images
```

Once you have the docker images you can run the images

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

Refer to {{ site.baseurl }}/testing/ for details on running the docker images. Use the following references to learn more about running docker images locally.

https://docs.docker.com/userguide/
https://docs.docker.com/reference/builder/


Alternatively, you can use the docker-compose command to build all the images.

## <a name="running-the-application"></a>Running the application

## <a name="running-the-application-with-docker"></a>Running the application with docker

## <a name="user-stories"></a>Documentation


