---
permalink: /security/
layout: default
title: Security
---

* [Application Security](#application-security)
* [Infrastructure Security](#infrastructure-security)

## <a name="application-security"></a>Application Security
My Medication List application does not store any PII data nor does it store any user credentials. Users are provided a unique hyperlink to the list they created. This hyperlink is unique even when 2 list contain the same information/items. Updating the list after it has been created, either by adding more items or removing items creates another unique hyperlink. 

The unique hyperlink to the saved medication list is a hased uuid.

To prevent bots from saving medication lists and flooding the database, the application utilizes reCaptcha.

The OpenFDA API key, database server name, reCaptcha secret key is configured as an environment variable to the container. 

Future enhancements will include
1.  Implement caching for search requests in nginx
2.  Implement configuratin to prevent http flooding in nginx
3.  Implement database back schedule


## <a name="infrastructure-security"></a>Infrastructure Security
Each of the environments hosted on AWS is created in it's own VPC. Each VPC has been configured to allow incoming traffic on HTTP and HTTPS ports only. The mongo database has instance level firewall that accepts traffic only from within the subnet. 

Future enhancements will include
1.  Setup a VPC for jump server and configure access to hosted subnets from the jump server subnet
