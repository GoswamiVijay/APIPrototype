---
permalink: /continuous-integration/
layout: default
title: Continuous Integration (CI)
---

## Overview
We use [Codeship](https://codeship.com) for implemeting continuous build, test and deployment of My Medication List application. We chose Codeship for it's ability to deploy passed builds to Elastic Beanstalk which other CI tools were lacking. Codeship, however, does not provide the ability to select the branches that will be unit tested which is a shortcoming. 
The current CI workflow is as follows
1.  Codeship has been configured to watch the github repository
2.  Changes pushed to the repsoitory trigger a build and running of unit tests
3.  If a build passes, the deployment pipeline for that branch is executed and the environment associated with that pipeline is updated with latest code. The following table shows the mapping between branches in github and the deployment pipeline associated with that branch.

| Github branch   | Codeship deployment pipeline | Application environment |
|-----------------|------------------------------|-------------------------|
| master          | master                       | www.mymedlookup.org     |
| test            | test                         | test.mymedlookup.org    |
| dev-integration | dev-integration              | production              |




###dev-integration branch deployment settings
---
<img src="{{ site.baseurl }}/images/continuous-integration/ci-dev-integration-deployment-pipeline.png" width="100%" alt="dev-integration branch deployment settings" />



###master/production branch deployment settings
---
<img src="{{ site.baseurl }}/images/continuous-integration/ci-master-deployment-pipeline.png" width="100%" alt="master/production branch deployment settings" />



###test branch deployment settings
---
<img src="{{ site.baseurl }}/images/continuous-integration/ci-test-integration-deployment-pipeline.png" width="100%" alt="test branch deployment settings" />



###Build results 
---

<img src="{{ site.baseurl }}/images/continuous-integration/ci-build-results.png" width="100%" alt="build results" />


