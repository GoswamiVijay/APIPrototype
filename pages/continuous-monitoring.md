---
permalink: /continuous-monitoring/
layout: default
title: Continuous Monitoring
---

## Overview

We leveraged  Platform as a Service (PaaS) cloud model for hosting the application on Amazon Elastic Beanstalk. Utilizing a PaaS model comes with following benefits

1.  Higher level of abstraction compared to OS/infrastructure as a service (IaaS) based models
2.  Built in mechanisms for scaling, monitoring and healing
3.  Cost effeciences
4.  Faster time to market

Our continuous monitoring model consists of following elements
1.  Healthcheck, notification and scaling configurations
2.  Monitoring platform generated metrics
3.  Logging and monitoring system and environment changes
4.  Running analysis scripts/jobs on logs saved to Amazon S3 (tbd)

The following screenshots provide an overview of the healthcheck and monitoring configuration and metrics


[AWS CloudTrail](http://aws.amazon.com/cloudtrail/) keeps an audit logs of all the API calls to the AWS cloud platform. These logs provide a record of how, when and by whom cloud platform configuration changes were effected.

###CloudTrail logs viewable in the console
---

<img src="{{ site.baseurl }}/images/monitoring-and-support/cloudtrail-console-logs.png" width="100%" alt="" />

###CloudTrail logs stored in S3
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/cloudtrail-logs-s3.png" width="100%" alt="" />


###Application platform alarms - 1
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-alarms-1.png" width="100%" alt="" />

###Application platform alarms - 2
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-alarms-2.png" width="100%" alt="" />

###Platform health events
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-events.png" width="100%%" alt="" />

###Platform health
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-health.png" width="100%" alt="" />

###Platform logs can be downloaded from console
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-logs.png" width="100%" alt="" />

###Platform logs contents
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-logs-expanded.png" width="100%" alt="" />


#####Application platform metrics - 1
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-metrics-1.png" width="100%" alt="" />

###Application platform metrics - 2
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-metrics-2.png" width="100%" alt="" />

###Email notification configuration
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-console-environment-Notification.png" width="100%" alt="" />

###Email notification on platform change
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/eb-environment-change-notification-email.png" width="100%" alt="" />

###Load balancer logs saved to S3 - 1
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/lb-s3-logs-1.png" width="100%" alt="" />

###Load balancer logs saved to S3 - 2
---
<img src="{{ site.baseurl }}/images/monitoring-and-support/lb-s3-logs-2.png" width="100%" alt="" />



