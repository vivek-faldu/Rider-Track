RIDER-TRACK

Some longer athletic events, such as ultra-marathon foot races and grand randonnée bicycle events, provide tracking of participant progress. At the very least, they typically publish a table reporting the last checkpoint a runner or rider has passed. In addition, some provide more fine-grain tracking GPS tracking through services like TrackLeaders.com and Maprogress.com. In addition to dedicated satellite tracking devices produced by Spot (findmespot.com) and Delorme (now part of Garmin), increasingly individual GPS receiver devices pair with mobile phones to transmit real-time location data, and stand-alone mobile phone applications can likewise transmit real-time location data. I would like a flexible, extensible system to integrate tracking data from multiple sources (e.g., FindMeSpot trackers, Garmin InReach trackers, mobile phone apps, and future sources that haven’t been introduced yet). It should provide at least a responsive web interface that works well on both small-screen devices (at least as small as a typical mobile phone) and on larger screen devices (laptops and desktop computers, or ‘screencasts’ from a mobile device to a television screen). Additional interfaces, such as dedicated mobile phone apps, would be desirable if (but only if) they significantly improve on the user interface of a web app.

Technology Stack used to develop this project 
Frontend - React JS
Backend - Python Django
Database - Mongo

For local development setup

Frontend development setup - 
. Install node packet manager if it is not already installed
. Clone the code into local machine and navigate into the folder
. Run 'npm install' to install dependencies
. Run 'npm start' to the frontend project

Backend development setup
. install python -  https://www.python.org/downloads/
. install django - pip install Django
. install django rest framework - pip3 install djangorestframework
. install corsheader - pip install django-cors-headers
. python manage.py runserver 
