---
permalink: /methodology/
layout: default
title: Methodology
---
## Overview
As with all of our projects, we used Agile methodology for developing My Medication List prototype. There is lot of documentation available on Agile, use the following references to absorb the spirit of Agile if you are switching from another methodology

1.  http://agilemanifesto.org/
2.  https://en.wikipedia.org/wiki/Agile_software_development
3.  http://www.amazon.com/Essential-Scrum-Practical-Addison-Wesley-Signature/dp/0137043295/

We recommend attending a scrum master or agile workshop to get a good understanding of some of the important concepts that you have to deal with everyday, user story and story points for example.


* [Agile Workflow](#agile-workflow)
* [Stories, tasks and bugs](#stories)
* [Jira, Confluence and Github](#jira)
* [Continuous Integration](#continuous-integration)
* [U.S. Digital Services Plays](#digital-services-play)


## <a name="agile-workflow"></a>Agile Workflow
We use the following workflow for working on projects
1. A backlog of user stories, tasks and bugs (Work-items) were maintained in Jira
2. Work-items were prioritized during the sprint prioritization meeting and moved to the sprint
3. Work-item artifacts were checked into github referencing the Jira ticket in the commit message
4. Work-items were marked as done in Jira
5. Documentation or knowledge base if any was updated in confluence
6. Jira agile sprint board reflected the current status of the sprint which was used during scrum calls
7. After sprint was closed, a sprint retrospective meeting was done and notes of the meeting saved in confluence

We switched to Github pages and github issues after RFQ questions were posted. The uncertain nature of the RFQ closing date and updates to the RFQ allowed us to adapt to changing schedule and requirements.

## <a name="stories"></a>Stories, tasks and bugs
All stories, tasks and bugs are logged in [Jira](https://xfinion.atlassian.net/secure/RapidBoard.jspa?rapidView=19&projectKey=AGILEBPA)

More information on stories is available at [about]({{ site.baseurl }}/about#stories)

## <a name="continuous-integration"></a>Continuous Integration
We used [Codeship](https://codeship.com/projects) to implement continuous integration and deployment from repository branches. Codeships support for deployment on Elastic Beanstalk was why we used it over Travis CI. 


## <a name="digital-services-play"></a>U.S. Digital Services Plays
(??? overview)

### <a name="play-1"></a>Play - 1 Understand what people need

reference - https://playbook.cio.gov/#play1
After the RFQ was announced, the development team lead went through the entire RFQ noting the requirements of the RFQ. The lead assembled a team of developers who would build the prototype of the application utilizing the [OpenFDA API](https://open.fda.gov/). The team brainstormed ideas on how best to develop a prototype that would best project the capabilities and expertise of the team as well as the company. Given the short time frame and amount of work involved, the team was split between developing a prototype that met the basic requirements of the RFQ or build an application that would fill a need for potential users of the application. The team lead made the decision to go ahead with the idea of building an application that allows users to keep the list of medications they take online. The application would provide interface points for external parties (such as physicans and emergency care professionals) with whom the user can share the medication list they are on. The receiving party would then be able to make decisions on providing care to the user based on the medication facts that are known to him/her.
Future versions of the application would provide notifications to the user when medications they are using are recalled and a printed card version of the hyperlink in the form of a barcode or QR code for easy integration with other applications. Spending time braninstorming and picking the right idea turned out to be a good judgement call as the response period was extended and the team was excited on working on the idea that that the potential to be a production in real world. The team picked the .org domain name to reflect the open and benefitial nature of the idea and the prototype. The team developed initial mockups in [Balsamiq](https://balsamiq.com/) viewable [here](https://xfinion.mybalsamiq.com/projects/demo/MyMedicationList-Main Screen) and with one team member representing the user community expressed tasks they would want to accomplish as well as concerns with using the application such as privacy which drove the technical decisions. A priortitized list of user-stories was created to attain a mimimum viable product assuming the original timeline for the RFQ.


### <a name="play-7"></a> Play - 7 Bring in experienced teams

reference - https://playbook.cio.gov/#play7
Based on the vision and usage of the application a development team was assembled. The collective development team has had experience in the following areas
1.  Developing applications using open source technologies
2.  Experience with cloud platforms
3.  Experience handling highly visible projects.

Some of the experience included the following
1.  Acting as system architect and tech lead in delivering the http://travel.state.gov website (~500k visitors per day) 
2.  Developing public datasets and API for Department of State
3.  Designing cloud infrastructure platform for deploying enterprise scale applications available across all countries and timezones


### <a name="play-8"></a> Play - 8 Choose a modern technology stack

reference - https://playbook.cio.gov/#play8

The development team made the decision to use only open source technologies for buildign the prototype based on the requirements of the RFQ. The team originally used Jira and Confluence tools but moved to Githup pages and issues feature after the RFQ questions were made available. 
The prototype makes use of following technologies

1.  [Node.js](https://nodejs.org/)
2.  Javascript - implementation of ECMAScript language standard 
3.  [MongoDB](https://www.mongodb.com/)
4.  [Ruby](https://www.ruby-lang.org/en/) - for generating this documentation
5.  [Jekyll](http://jekyllrb.com/)
6.  [Docker](https://www.docker.com/)

The application itself uses the following frameworks

1.  [locomotive](http://locomotivejs.org/)
2.  [bootable](https://github.com/jaredhanson/bootable)
3.  [bootable-environment](https://github.com/jaredhanson/bootable-environment)
4.  [express](http://expressjs.com/)
5.  [connect-powered-by](https://github.com/jaredhanson/connect-powered-by)
6.  [ejs](http://www.embeddedjs.com/)
7.  [underscore](http://underscorejs.org/)
8.  [mongoose](http://docs.mongodb.org/ecosystem/drivers/node-js/)
9.  [request](https://github.com/request/request)
10.  [grunt](https://www.npmjs.com/package/grunt-cli)
11.  [Mocha](http://mochajs.org/)

### <a name="play-9"></a> Play - 9 Deploy in a flexible hosting environment

reference - https://playbook.cio.gov/#play9
The development team used Amazon cloud services to deploy the application using Amazon Elastic BeanStalk which provides Platform as a Service (PaaS) cloud model. The application itself uses Amazon EC2 Container service. Deploying on cloud platform allowed use to rapidly build the development and production environment while keeping the cost low. The cloud environment will also benefit testing application scalibility features when it is made available at internet scale. The following Amazon cloud services were utilized

1.  [Amazon EC2](http://aws.amazon.com/ec2/)
2.  [Amazon S3](http://aws.amazon.com/s3/)
3.  [Amazon VPC](http://aws.amazon.com/vpc/)
4.  [AWS Elastic Beanstalk](http://aws.amazon.com/elasticbeanstalk/)
5.  [AWS CloudTrail](http://aws.amazon.com/cloudtrail/)
6.  [Amazon SNS](http://aws.amazon.com/sns/)
7.  [Amazon EC2 Container Service](http://aws.amazon.com/ecs/)
8.  [Amazon Route 53](http://aws.amazon.com/route53/)
9.  [AWS Identity and Access Management (IAM)](http://aws.amazon.com/iam/)

In addition to the PaaS service. The prototype also utilized the following Software as a Service (Saas) cloud model
1.  [Codeship](https://codeship.com/)

### <a name="play-10"></a> Play - 10 Automate testing and deployments

reference - https://playbook.cio.gov/#play10

The development team utilized [Mocha](http://mochajs.org/) for creating unit tests. An integration environment was also built for doing functional and user acceptance testing (UAT). A continuous integration process was implemented using Codeship to perform application build, perform unit testing and deploying the application on the respective test, development-integration and production environment.

### <a name="play-4"></a>Play - 4 Build the service using agile and iterative practices

reference - https://playbook.cio.gov/#play4

The development team used an iterative approach to develop the prototype. User stories were created and added to backlog, the stories were then prioritized for implementation of the sprint (which was compressed to meet RFQ deadline). 
The team deployed the minimum viable project after 3 days of the RFQ and kept adding incremental value and functionality to the project, all the while keeping a product that could be used as an evidence for the RFQ submission.

The team originally utilized Jira and Confluence along with Github, but moved to github pages and issues after an update to the RFQ was posted. 

The team performed scrum calls and sprint retrospective meetings which was recorded in Confluence. The team was proactive in picking up additional tickets and working on them in the interest of meeting the RFQ deadline.



### <a name="play-6"></a> Play - 6 Assign one leader and hold that person accountable

reference - https://playbook.cio.gov/#play6
The team assigned Vijay Goswami as the Product Owner. Mr. Goswami also played the role technical architect and devops engineer on the project. While being in the dual role of Product Owner and developer is not ideal, the team had to work with the available resources it had. As a product owner, Mr. Goswami prioritized the list of features and assigned tasks to team members.

### <a name="play-12"></a> Play - 12 Use data to drive decisions

reference - https://playbook.cio.gov/#play12

The development team implemented monitoring and alert for the deployed system. Google Analytics was integrated to provide realtime usage of the application. Application healthcheck and audit log archiving were configured as well as evidenced [here]( {{site.baseurl}}/continuous-monitoring/)

### <a name="play-13"></a>  Play - 12 Default to open

reference - https://playbook.cio.gov/#play13

The team has open sourced the repository and provided public access to it's Jira project site. The licensing statement in the repository reflects that. 



