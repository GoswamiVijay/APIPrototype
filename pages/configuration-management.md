---
permalink: /configuration-management/
layout: default
title: Configuration Management
---

## Overview ##
We use git for source code and system artifact version control and configuration management. All versioned project artifacts are hosted on [Github](https://github.com/). Github provides a web based interface for interacting with git hosted on the server. Additional benefits include, collaboration using issues and wiki as well as providing metrics on usage by team members. Third party hooks available in Github such as notification when changes are pushed enable continous integration and integration with third party issue management system such as Jira.

While using the command line tool can be used for performing checkins and push to Github repository, we suggest using [SourceTree](https://www.sourcetreeapp.com/) tool for working with Github. Sourcetree is available for Mac and Windows platforms. 

Our branching model is based on [gitflow](https://github.com/nvie/gitflow). Details on the using the gitflow workflow can be found [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

### Branches ###
The repository contains the following primary branches

1.  master -- all releases and deployment to production is based on this branch. 
2.  develop -- all active development happens on this branch.
3.  test -- this branch is used to deploy pre-release and uat version of the app for user and interal team testing. this beanch is based on develop branch.
4.  dev-integration -- this branch is used performing developer integration testing, the code is synchronized on a schedule and deployed to dev-integration platform

Secondary branches are created in response to bug fixes with a deployed version, feature development etc.
1.  release -- this branch is created from develop in preparation for release, configuration changes specifc to production environment are made and checked in before merging with master branch.
2.  feature-branch -- feature branches are created for functional requirements that are independent of current code base and for features that will span multiple sprints.

### Branching & Merging ###
We recommend using SourceTree for performing merge and branch operations. We make one person responsible for working with master, test and dev-integration branches. Development team members are free to create feature branches.

The Dockerfile file in each of the branch is specific to that environment. When merging branches please ensure that the Dockerfile file does not get overwritten/merged with another branch. This is just a precaution, the environment settings in the Dockerfile file is overridden by the environment settings configured in the Elastic Beanstalk environment.


