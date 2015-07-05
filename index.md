---
permalink: /
layout: default
title: Introduction
---

The AgileBPA RFQ requires vendors to submit a working prototype along with evidence of meeting the critera outlined in the RFQ. The RFQ document is available here


The prototype needs to be based on the data available from http://open.fda.gov API. The team brainstormed on possible ideas and approaches for the prototype documented here. While the idea of ingesting the data from API service and listing it sounded attractive as it would have allowed the development team to focus on meeting the criteria's for the award due to the limited amount of time available for the prototype. The development team eventually decided to create a innovative application of the data available from the API service as it would align with the spirit of the RFQ and also showcase the innovation aspect of the company. 

The use case or business pitch for the application is as follows - During a doctor visit or in an emergency condition it's beneficial to have access to medications that the patient is on to aid the care giver in making the important medical decisions. MyMedlookup.org is a website that allows users to create a list of medications that they take. The website generates a unique url based on the list of medications that have been selected by the user. The user can share the url with their physician or carry it as a printed card which would provide the care giver with the medication information. Future versions of the application will generate a QR code.

The application flow is as follows

The main application screen / webpage allows users to search for medications and displays matching results
Users can populate their medication list by selecting medications from the search result
Clicking on the Save button generates a unique id that can be appended to the application url. Navigating to this url brings up the populated medications which can be referenced by the care giver
Subsequent update and save operations create a new unique id
