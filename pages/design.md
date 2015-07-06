---
permalink: /design/
layout: default
title: Design
---

My Medication List is a two tier application consisting of web and database components deployed on different servers. The web component uses nodejs framework with additional modules for implementing server and client side code. The database component uses Mongo db for persisting data. 

The web component of the application utilizes the following technologies/frameworks
1.  node.js 
2.  expressjs
3.  bootstrap 
4.  angular.js 
5.  MongoDB
6.  mocha
7.  loclmotive
8.  mongoose
9.  requirejs
10. node-mocks-http

The application implements the following endpoints. All of the endpoints are implemented in the apiController.js (app/controllers folder)

1.  /getSearchResults - invoked when the user enters a search term and hits the search button. The implementation logic makes a call to the OpenFDA API endpoint to get matching results. If atleast one result is returned by the OpenFDA API, the search term is added to frequently searched terms list which is displayed along the "Top Searched Medications" label. This function needs refactoring to separate the API call and the adding of search keyword to frequently searched items

2.  /getData - This function is invoked when the user uses the url that was generated as part of a save medication action. The saveData function generates a unique id which is a reference to the medication list in the database. This id is passed to the /getData endpoint. The implemented function does a lookup with the provided id and returns matching results if found.

3.  /getTopSearchKeywords - This function is called by the mainpage of the application to populate the "Top Searched Medications" label. This function gets the top 5 search keywords based on the searchcount value. The searchcount value is populated as part of /getSearchResults call and tracks the number of times the search was done with that term.

4.  /saveData - This function gets invoked when the save action is performed. The saveData function generates a unique id using the uuid module and saves the medication list in the database. The uuid is returned in the response.

5.  /validateCapcha - This function is invoked when the user checks the I'm not a robot checkbox (reCaptcha). The function sends the secret key and users reCaptcha response to google/reCaptcha endpoint.

6.  /updateData and /testApplicationConfig as not used and will be removed

7.  /applicationConfig - Provides the environment config values to front end code

8.  /help - Returns the Help text for display in the popup menu when the user clicks on the Help button

9.  /* - invoked when a request is made to an endpoint that does not exist.



home.html - This is themain container that includes the header, footer and the ui-view container.

partial/home.html - Implements the main view of the application that provides search and save functions

Application configuration values are read from applicationConfig.js


The application listens on port 4000.






