---
permalink: /
layout: default
title: Introduction
---

My Medication List application prototype was created in response to the AgileBPA RFQ. The RFQ document is available [here]( {{ site.baseurl }}/images/rfq-documents/ADS-RFQ-Revised-Modification-5.pdf). The RFQ requires vendors to submit a working prototype along with evidence of meeting the critera outlined in the RFQ. 

This site/documentation serves to provide all the information that accompanies the prototype for understanding the application idea and design as well as information that will aid the user in contributing to the development of the application or utilizing the components of the applications for their own projects. 

## Product Vision

The use case or business pitch for the application is as follows - During a doctor visit or in an emergency condition it's beneficial for the care provider to have access to medications that the patient is on to aid the care giver in making important medical decisions. MyMedlookup.org is a website that allows users to create a list of medications that they take. The website generates a unique url based on the list of medications that have been populated by the user. The user can share the url with their physician or carry it as a printed card which would provide the care giver with the medication information. Future versions of the application will generate a QR code.

## Application flow

The main application screen / webpage allows users to search for medications and displays matching results
Users can populate their medication list by selecting medications from the search result
Clicking on the Save button generates a unique id that can be appended to the application url. Navigating to this url brings up the populated medications which can be referenced by the care giver
Subsequent update and save operations create a new unique id

## High level requirements of the RFQ
	
The prototype needs to be based on open source technologies and use the datasets available on http://open.fda.gov. The development team also needs to provide evidence of development methodology used and usage/implementations of "plays" in [U.S. Digital Services Playbook](https://playbook.cio.gov).

The application is built using Node.js and utilizes Mongo db for persisting data. The application has been deployed on Amazon Cloud platform utilizing container technology. 

Following are the list of stories that have been implemented in the prototype


## User Stories

Following is a list of all the user stories that were identified for the project


|Project	|Key	        |Summary                                                                                           |
|-----------|---------------|--------------------------------------------------------------------------------------------------|
|Agile BPA	|[AGILEBPA-36](https://xfinion.atlassian.net/browse/AGILEBPA-36)    |As a user I want to know the privacy polcy of the website                                         |     
|Agile BPA	|[AGILEBPA-32](https://xfinion.atlassian.net/browse/AGILEBPA-32)    |As a user I want to see a system/error message when I type an incorrect url                       |                  
|Agile BPA	|[AGILEBPA-31](https://xfinion.atlassian.net/browse/AGILEBPA-31)    |As a user I want to see metrics on medication usage                                               |
|Agile BPA	|[AGILEBPA-30](https://xfinion.atlassian.net/browse/AGILEBPA-30)    |As a user I want to make the medication list url/id hard to guess/secure                          |               
|Agile BPA	|[AGILEBPA-22](https://xfinion.atlassian.net/browse/AGILEBPA-22)    |As a user I want to see a paginated search result                                                 | 
|Agile BPA	|[AGILEBPA-12](https://xfinion.atlassian.net/browse/AGILEBPA-12)    |As a user I want the ability to use the application on my mobile device                           |              
|Agile BPA	|[AGILEBPA-10](https://xfinion.atlassian.net/browse/AGILEBPA-10)    |As a user I want to see a message when search does not return any results                         |                
|Agile BPA	|[AGILEBPA-7](https://xfinion.atlassian.net/browse/AGILEBPA-7)     |As a user I want a perma link to the medication list                                              |
|Agile BPA	|[AGILEBPA-6](https://xfinion.atlassian.net/browse/AGILEBPA-6)     |As a user I want to view the Help information for using the application                           |              
|Agile BPA	|[AGILEBPA-5](https://xfinion.atlassian.net/browse/AGILEBPA-5)     |As a user I want the ability to search for medication                                             |
|Agile BPA	|[AGILEBPA-4](https://xfinion.atlassian.net/browse/AGILEBPA-4)	    |As a user I want to select the medications from the search result and populate it in my list      |                                   
|Agile BPA	|[AGILEBPA-2](https://xfinion.atlassian.net/browse/AGILEBPA-2)	    |As a user I want to be able to save the list of medications I have selected                       |                  
|Agile BPA	|[AGILEBPA-1](https://xfinion.atlassian.net/browse/AGILEBPA-1)	    |As a user I want to know what the application does                                                |



