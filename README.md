# APIPrototype

 All source code, documentation and stories/issues are in [github](https://github.com/GoswamiVijay/APIPrototype). Documentation is in gh-pages branch, also accessible [here](http://goswamivijay.github.io/APIPrototype/). Please use the master branch for the evaluation.

The working/production version of the prototype is available at https://www.mymedlookup.org

##About this project

This repository contains all the artifacts that were created as part of building the prototype for Agile BPA RFQ. More detailed information on our approach, design, development methodology and other details is available [here] (https://goswamivijay.github.io/APIPrototype/)

All copyright, trademark, and patent rights in this work, where applicable, is waived. More details are in the OpenLicense.md file of the repository.


##Product Vision
The use case or business pitch for the application is as follows - During a doctor visit or in an emergency condition it's beneficial for the care provider to have access to medications that the patient is on to aid the care giver in making important medical decisions. MyMedlookup.org is a website that allows users to create a list of medications that they take. The website generates a unique url based on the list of medications that have been populated by the user. The user can share the url with their physician or carry it as a printed card which would provide the care giver with the medication information. Future versions of the application will generate a QR code.

##Application flow
The main application screen / webpage allows users to search for medications and displays matching results Users can populate their medication list by selecting medications from the search result Clicking on the Save button generates a unique id that can be appended to the application url. Navigating to this url brings up the populated medications which can be referenced by the care giver Subsequent update and save operations create a new unique id

##Approach
More details can be found [here](https://goswamivijay.github.io/APIPrototype/how-we-built-it/)

After the RFQ was released, the development team brainstormed the idea for the prototype. After the product idea was decided on, the team looked for a appropriate name and chose a domain that best represented the idea. We also bought a SSL certificate for the site [HTTPS by default](https://www.whitehouse.gov/sites/default/files/omb/memoranda/2015/m-15-13.pdf). 

Mr. Vijay Goswami was assigned the leader and assigned responsibility for delivering the project. Virendra Chouhan and Alok Patil were assigned as developers on the team. 

The prototype utilizes the following open source technologies. More details can be found [here](https://goswamivijay.github.io/APIPrototype/methodology/#play-8)
1.  Node.js
2.  Docker
3.  MongoDB
4.  mongoose
5.  Mocha
6.  Bootstrap
7.  Expressjs

The team came up with initial stories for the prototype and to release a minimum vialble product. We also started working on setting up continuous integration and choosing the cloud platform for the prototype. We initially used Digital Ocean as the integration server. After the first sprint, we moved all of the infrastructure including domain name to Amazon Cloud (AWS). We utilized AWS Elastic Beanstalk and Amazon EC2 Container service for deploying containers that are hosted on DockerHub. We progressively enhanced the applciation based on feedback from designated internal users and implementing the stories that came out of the feedback. We utilized Codeship for continuois integration (running unit tests and eployment). We use Agile methodology for all our projects and have standardized on Jira (for sprints and issue tracking), Confluence (for documentation), Github (artifact/source code repository) and AWS cloud for infrastructure. After Mod 5 of the RFQ was published we moved the issues to github and started strategizing on how best to put the documentation on Github. We did some research and came across the [18f guides template](https://pages.18f.gov/guides-template/) which we used for putting all the documentation. 

To setup the development environment and run the application locally you need to do the following
1. Install node.js
2. Install mongodb
3. Install dependencies

```
$ npm install
```

4. Start mongodb instance on localhost listening on port 27017

5. Start application

```
$ nodemon
```

6. Bring up http://localhost:4000 in your browser

Detailed instructions on setting up the development environment can be found [here](https://goswamivijay.github.io/APIPrototype/development/)


To run the unit test, run the following command

```
$ mocha
```

Detailed instructions on using docker images for testing can be found [here](https://goswamivijay.github.io/APIPrototype/testing/)

Our development methodology is available [here](https://goswamivijay.github.io/APIPrototype/methodology/)

Approach criteria evidence is availalbe [here](https://goswamivijay.github.io/APIPrototype/rfq-evaluation-criteria-evidence/)




