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

The application uses [Amazon Route 53 service](http://aws.amazon.com/route53/) to provide DNS service for mymedlookup.org domain. Amazon Route 53 service provides user friendly and scalable domain name management services especially if the application servicing the domain is hosted on Amazon cloud infrastructure (AWS). One of the benefits of AWS Route 53 service is that it provides convenient services to do A/B testing for new services that will be deployed. Having this ability is critical for getting realtime feedback on new features before they are made available to all users of the application. The following table lists the A record mapping for mymedlookup domain and the EB load balancer to which it points.

| No. | Url endpoint                                                                                                               | Load Balancer endpoint                                                         | EB environment url                               | EB environment name  | Hosting mode          | Github branch |
|-----|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|--------------------------------------------------|----------------------|-----------------------|---------------|
| 1   | http://dev.mymedlookup.org  http://dev.mymedlookup.org                                                                     | http://awseb-e-e-AWSEBLoa-86H1H9G12GM9-2031228343.us-east-1.elb.amazonaws.com  | http://mymedlookup-dev-env.elasticbeanstalk.com  | mymedlookup-dev-env  | Developer Integration | develop       |
| 2   | http://www.mymedlookup.org  http://www.mymedlookup.org http://prod.mymedlookup.org https://prod.mymedlookup.org            | http://awseb-e-w-AWSEBLoa-17QCCHNB5MY4W-1581895741.us-east-1.elb.amazonaws.com | http://mymedlookup-prod-env.elasticbeanstalk.com | mymedlookup-prod-env | Production            | master        |
| 3   | http://test.mymedlookup.org http://test.mymedlookup.org                                                                    | http://awseb-e-q-AWSEBLoa-186S0I28Y2KIK-3464553.us-east-1.elb.amazonaws.com    | http://mymedlookup-test-env.elasticbeanstalk.com | mymedlookup-test-env | Testing               | test          |

To support HTTPS, wildcard SSL certificates have been deployed on the load balancers. The load balancers accepts both HTTP and HTTPS traffic. Production load balancer will be reconfigured to direct HTTP traffic to HTTPS endpoint when the application goes live. 

The load balancers have also been configured to save access logs on [Amazon S3](http://aws.amazon.com/s3/). Storing the logs on S3 provides couple of benefits, the logs can either be downloaded to process them or can be run thru Elastic Map Reduce Jobs to generate reports or trigger notifications based on events.

Notes: For setting up storage of load balancer logs to S3, you need to setup a bucket on S3 and add bucket policy that will allow load balancer to store the logs. The following policy has been applied for mymedlookup application. Substitute xxAWSAccountNumberxx with the AWS account number.

```
{
	"Version": "2012-10-17",
	"Id": "Policy1435854988205",
	"Statement": [
		{
			"Sid": "mymedlookup-1435855633164",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::127311923021:root"
			},
			"Action": "s3:PutObject",
			"Resource": "arn:aws:s3:::mymedlookuplogs/devlblogs/AWSLogs/xxAWSAccountNumberxx/*"
		},
		{
			"Sid": "mymedlookup-1435855633165",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::127311923021:root"
			},
			"Action": "s3:PutObject",
			"Resource": "arn:aws:s3:::mymedlookuplogs/prodlblogs/AWSLogs/xxAWSAccountNumberxx/*"
		},
		{
			"Sid": "mymedlookup-1435855633166",
			"Effect": "Allow",
			"Principal": {
				"AWS": "arn:aws:iam::127311923021:root"
			},
			"Action": "s3:PutObject",
			"Resource": "arn:aws:s3:::mymedlookuplogs/testlblogs/AWSLogs/xxAWSAccountNumberxx/*"
		}
	]
}
```

[Codeship](https://codeship.com/) is used for continous integration and deployment on the EB environments. For Codeship to deploy, you need to setup a user account in IAM (Amazon Identity and Access Management) (codeship) and add it to group with following permissions/policy

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1435632464000",
            "Effect": "Allow",
            "Action": [
                "ecs:RegisterTaskDefinition"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}

```
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "elasticbeanstalk:CreateApplicationVersion",
                "elasticbeanstalk:DescribeEnvironments",
                "elasticbeanstalk:DeleteApplicationVersion",
                "elasticbeanstalk:UpdateEnvironment"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": [
                "elasticloadbalancing:DescribeInstanceHealth",
                "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
                "elasticloadbalancing:RegisterInstancesWithLoadBalancer"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": [
                "sns:CreateTopic",
                "sns:GetTopicAttributes",
                "sns:ListSubscriptionsByTopic",
                "sns:Subscribe"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:sns:us-east-1:065907742841:*"
        },
        {
            "Action": [
                "autoscaling:SuspendProcesses",
                "autoscaling:DescribeScalingActivities",
                "autoscaling:ResumeProcesses",
                "autoscaling:DescribeAutoScalingGroups"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": [
                "cloudformation:GetTemplate",
                "cloudformation:DescribeStackResource",
                "cloudformation:UpdateStack"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:cloudformation:us-east-1:065907742841:*"
        },
        {
            "Action": [
                "ec2:DescribeImages",
                "ec2:DescribeKeyPairs"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:ListBucket",
                "s3:DeleteObject",
                "s3:GetBucketPolicy"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:s3:::elasticbeanstalk:us-east-1:065907742841",
                "arn:aws:s3:::elasticbeanstalk:us-east-1:065907742841/*"
            ]
        }
    ]
}
```

### <a name="top"></a>Jump to ###

* [VPC Information](#vpc-info)
* [Deployment Setup](#deployment-setup)
* [Database Setup](#database-setup)
* [Creating EB Application and production environment](#creating-eb-application)
* [Application configuration](#application-configuration)
* [Reverting to previous version](#reverting-to-previous-version)
* [Scalibility settings](#scalibility-settings)
* [Logging](#logging)
* [AWS Docker configuration](#aws-docker-configuration)
* [Rule of 2](#rule-of-2)


### <a name="vpc-info"></a>VPC Information
The production, dev-integration and test environments are deployed in their own VPC. The following table provides a mapping of the environment and the VPC cidr.

| VPC name         | VPC cidr    | Environment mode |
|------------------|-------------|------------------|
| mymedlookup_test | 60.0.0.0/16 | test             |
| mymedlookup_dev  | 70.0.0.0/16 | dev-integration  |
| mymedlookup_prod | 50.0.0.0/16 | production       |

Each of the application environments described below are deployed in their respective VPC

### <a name="deployment-setup"></a>Deployment Setup ###
The application uses [Amazon Elastic BeanStalk](http://aws.amazon.com/elasticbeanstalk/) and [Amazon EC2 Container service](http://aws.amazon.com/ecs/) PaaS services to host the application in docker containers. The docker images are pulled from [docker hub](https://hub.docker.com/). Automated docker image build has been configured for dev-integration, test and production branches of the repository. Changes to any of these branches triggers a docker image build. 
The following table shows the mapping of repository branches to docker image builds

| No. | Github branch                                                     | Application component | Docker image name                       | Image endpoint                                                                                           | Application mode |
|-----|-------------------------------------------------------------------|-----------------------|-----------------------------------------|----------------------------------------------------------------------------------------------------------|------------------|
| 1   | https://github.com/GoswamiVijay/APIPrototype/tree/develop         | web                   | goswamivijay/apiprototype-web-develop   | https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-test/                                  | develop          |
| 2   | https://github.com/GoswamiVijay/APIPrototype/tree/develop         | nginx                 | goswamivijay/apiprototype-nginx-develop | https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-develop/                               | develop          |
| 3   | https://github.com/GoswamiVijay/APIPrototype/tree/develop         | database              | goswamivijay/apiprototype-db-develop    | https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-develop/                                  | develop          |
| 4   | https://github.com/GoswamiVijay/APIPrototype/tree/master          | web                   | goswamivijay//apiprototype-web-prod     | https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-testgoswamivijay/apiprototype-web-prod/   | production       |
| 5   | https://github.com/GoswamiVijay/APIPrototype/tree/master          | nginx                 | goswamivijay//apiprototype-nginx-prod   | https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-testgoswamivijay/apiprototype-nginx-prod/ | production       |
| 6   | https://github.com/GoswamiVijay/APIPrototype/tree/test            | web                   | goswamivijay/apiprototype-web-test      | https://registry.hub.docker.com/u/goswamivijay/apiprototype-web-test/                                    | test             |
| 7   | https://github.com/GoswamiVijay/APIPrototype/tree/test            | nginx                 | goswamivijay/apiprototype-nginx-test    | https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-test/                                  | test             |
| 8   | https://github.com/GoswamiVijay/APIPrototype/tree/test            | database              | goswamivijay/apiprototype-db-test       | https://registry.hub.docker.com/u/goswamivijay/apiprototype-db-test/                                     | test             |
| 9   | https://github.com/GoswamiVijay/APIPrototype/tree/dev-integration | web                   | goswamivijay/apiprototype-nginx-devint  | https://registry.hub.docker.com/u/goswamivijay/apiprototype-nginx-devint/                                | dev integration  |
| 10  | https://github.com/GoswamiVijay/APIPrototype/tree/dev-integration | nginx                 | goswamivijay/apiprototype-web-devint    | https://registry.hub.docker.com/u/goswamivijay/apiprototype-web-devint/                                  | dev integration  |



### <a name="database-setup"></a>Database Setup ###
The application uses [mongodb](https://www.mongodb.org/) for persisting data. Each of the hosted environment (dev-integration, test and production) has it's own database instance deployed on [Amazon EC2](http://aws.amazon.com/ec2/). Since each of the environment is deployed in it's own [Amazon Virtual Private Cloud](http://aws.amazon.com/vpc/) (VPC), connections to the database is restricted to instances in that VPC using the subnet IP address. To further secure the environments, the VPC only allows inbound network traffic on port 80 and 443. Before the application go live date, a jump will be provisioned in the VPC that will be used for administering the database server and to diagnose issue on the container instances. The jump server will be switched off when not needed. Database replication will be setup to provide high availability and reliability at the database tier.

###<a name="creating-eb-application"></a>Creating EB Application and production environment ###
1.  Sign in to AWS console
2.  Select the Elastic Beanstalk service https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1
3.  Select the Create New Application link from top right of the page
4.  Enter mymedlookup for Application name: and click Next
5.  In the New Environment page, select Create web server button
6.  In the Permissions popup, select aws-elasticbeanstalk-ec2-role
7.  In the Environment Type page, select Multi-container Docker option for the Predefined configuration field and Load balancing, auto scaling option for Environment type: field
8.  On the Application Version page, for source field, select the S3 URL radio button and enter the following location for production S3 application package https://s3.amazonaws.com/mymedlookup/app/production/mymedlookup.zip
For Deployment Limits, use the default setting (30%) and click Next
9.  On the Environment Information page, enter mymedlookup-dev-env for Environment name: and click Next
10.  On the Additional Resources page, check the box for Create this environment inside a VPC and click Next
11.  In the Configuration Details page, use the following settings
Instance Type: m4.large
EC2 key pair: use production key pair
Email address: support@xfinion.com
Application health check URL: /
Use default options for rest of the fields.
12.  Click Next on the Environment Tags page
13.  Confirm the information on the Review page and click Launch
Your application is now launching and it will take few minutes for the application to be completely setup

For test and dev-integration environments, navigate to the [applicaiton page](https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/applications?applicationNameFilter=) and in the Actions drop down box (top right), select Launch New Environment and follow the above steps for creating the production environment. Substitute the S3 url on step 8 above with https://s3.amazonaws.com/mymedlookup/app/development/mymedlookup.zip for dev-integration environment and https://s3.amazonaws.com/mymedlookup/app/test/mymedlookup.zip for test environment

### <a name="application-configuration"></a>Application configuration
After the application environments have been launched, you can now set the environment configuration settings for each environment. These environment settings are used by the application and are specific to each environment. The environement variables also allow keeping seetings such as API key and reCaptcha keys secure. These application settings can be changed and deployed without doing an application rebuild. This is particularly important due to restrictions on the number of API calls that can be made per minute. New API key can be requested and updated for the environment should the API key be disabled due to excessive use. The team intends to configure caching on nginx server to save on API calls to OpenFDA endpoint.
__Environment Properties__
applicationMode  production
captchaSecretKey xxxxx
captchaUrl  xxxx
databaseServer  xxxx
openFDAAPIKey  xxxx
searchResultLimit  xxxx


### <a name="reverting-to-previous-version"></a>Reverting to previous version ###
Previous versions of the applications can be deployed to elastic beanstalk using 3 methods

1.  We use Codeship for continous integration. Codeship uploads the deployment package to AWS S3 endpoint when all unit tests succeed. Each application package uploaded to S3 by Codeship is availble for subsequent deployment by manually uploading it to elastic beansalk.
2.  A specific commit in github can be checked out, the content compressed and can be manually deployed to elastic beanstalk
3.  Previous versions of the application can be manually selected for deployment within elastic beanstalk

### <a name="scalibility-settings"></a>Scalibility settings ###
The production environment has been configured to auto scale based on CPU utilization. The following settings provide the configured values for auto scaling
Minimum instance count: 1
Maximum instance count: 4
Scaling cooldown: 300 seconds
Trigger measurement: CPUUtilization
Trigger statistic: Average
Unit of measurement: Percent
Measurement period: 5 minutes
Breach duration: 2 minutes
Upper threshold: 80
Upper breach scale increment: 10%
Lower threshold: 60 percent
Lower breach scale increment: 30%


### <a name="logging"></a>Logging ###
The production environment has been configured to publish service logs to S3. To set the logging options, navigate to the environment for which logging needs to be configured, select Configuration from the left menu panel, click on the settings gear on the Software Configuration panel in the content area, on the Container Options page, select the box for Enable log file rotation to Amazon S3. If checked, service logs are published to S3.

### <a name="aws-docker-configuration"></a>AWS Docker configuration
AWS Elastic Beanstalk uses the Dockerrun.aws.json file for setting up and configuring the docker containers. Following is the content of the Dockerrun.aws.json for production environment

```
{
  "AWSEBDockerrunVersion": 2,
  "volumes": [
    {
      "name": "APIPrototype",
      "host": {
        "sourcePath": "/var/app/current"
      }
    },
    {
      "name": "nginx-proxy-conf",
      "host": {
        "sourcePath": "/var/app/current/Docker-nginx"
      }
    }  
  ],
  "containerDefinitions": [
    {
      "name": "mymedlookupweb1",
      "image": "goswamivijay/apiprototype-web-prod",
      "essential": true,
      "memory": 1024,
      "portMappings": [
        {
          "hostPort": 4040,
          "containerPort": 4000
        }
      ],
      "mountPoints": [
        {
          "sourceVolume": "APIPrototype",
          "containerPath": "/src",
          "readOnly": true
        }
      ]
    },
    {
      "name": "mymedlookupweb2",
      "image": "goswamivijay/apiprototype-web-prod",
      "essential": true,
      "memory": 1024,
      "portMappings": [
        {
          "hostPort": 4050,
          "containerPort": 4000
        }
      ],
      "mountPoints": [
        {
          "sourceVolume": "APIPrototype",
          "containerPath": "/src",
          "readOnly": true
        }
      ]
    },
    {
      "name": "nginx-proxy",
      "image": "goswamivijay/apiprototype-nginx-prod",
      "essential": true,
      "memory": 1024,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        }
      ],
      "links": [
        "mymedlookupweb1",
        "mymedlookupweb2"
      ],
      "mountPoints": [
        {
          "sourceVolume": "nginx-proxy-conf",
          "containerPath": "/etc/nginx",
          "readOnly": true
        },
        {
          "sourceVolume": "awseb-logs-nginx-proxy",
          "containerPath": "/var/log/nginx"
        }
      ]
    }
  ]
}
```




### <a name="rule-of-2"></a>Rule of 2 ###
When doing a manual deployment, please follow the deployment steps (???link). It is advisable to have 2 people doing manual deployments.


