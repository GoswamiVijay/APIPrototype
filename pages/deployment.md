---
permalink: /deployment/
layout: default
title: Deployment
---
## Overview ##
My Medication List web application (application) is hosted on [Amazon Elastic BeanStalk](http://aws.amazon.com/elasticbeanstalk/) (EB). EB is a cloud platform form that provides Platform as a Service (PaaS) model for cloud computing. PaaS services provide a higher level of abstraction for cloud applications than traditional deployment on OS platforms. Some of the benefits of using PaaS include elastic scalibility, reliability, application health monitoring and cost. 
 
The application on EB is deployed in 3 environments
1.  [mymedlookup-dev-env](http://mymedlookup-dev-env.elasticbeanstalk.com) 
2.  [mymedlookup-prod-env](http://mymedlookup-prod-env.elasticbeanstalk.com)
3.  [mymedlookup-test-env](http://mymedlookup-test-env.elasticbeanstalk.com)

Each of the above environments uses [Amazon Elastic Load Balancer](http://aws.amazon.com/elasticloadbalancing/) to direct traffic to the environments.
The following table shows the mapping of load balancer end points to the respective EB environments

| No | Load Balancer endpoint                                                         | EB environment url                               | EB environment name  | Hosting mode          | Github branch |
|----|--------------------------------------------------------------------------------|--------------------------------------------------|----------------------|-----------------------|---------------|
|  1 | http://awseb-e-e-AWSEBLoa-86H1H9G12GM9-2031228343.us-east-1.elb.amazonaws.com  | http://mymedlookup-dev-env.elasticbeanstalk.com  | mymedlookup-dev-env  | Developer Integration | develop       |
|  2 | http://awseb-e-w-AWSEBLoa-17QCCHNB5MY4W-1581895741.us-east-1.elb.amazonaws.com | http://mymedlookup-prod-env.elasticbeanstalk.com | mymedlookup-prod-env | Production            | master        |
|  3 | http://awseb-e-q-AWSEBLoa-186S0I28Y2KIK-3464553.us-east-1.elb.amazonaws.com    | http://mymedlookup-test-env.elasticbeanstalk.com | mymedlookup-test-env | Testing               | test          |

### <a name="top"></a>Jump to ###


* [Hosted environments](#vision)
* [Setting up development environment on Elastic Beanstalk](#user-stories)
* [Setting up test environment on Elastic Beanstalk](#user-stories)
* [Setting up production environment on Elastic Beanstalk](#user-stories)
* [Domain name mapping](#user-stories)
* [Reverting to previous version](#user-stories)
* [Scalibility settings](#user-stories)
* [Logging](#user-stories)
* [Rule of 2](#user-stories)
* [Checklist for manual deployment](#user-stories)

### <a name="vision"></a>Vision ###

### <a name="user-stories"></a>User Stories ###

