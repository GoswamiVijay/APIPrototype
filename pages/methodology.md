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


### <a name="top"></a>Jump to 

* [Agile Workflow](#agile-workflow)
* [Stories, tasks and bugs](#stories)
* [Jira, Confluence and Github](#jira)
* [Continuous Integration](#continuous-integration)

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


