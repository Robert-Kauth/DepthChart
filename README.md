# DepthChart
## *By Robert Kauth - Visit [DepthChart](https://depthchart.herokuapp.com/)*
![DepthChart logo](https://fantasydepthchart.s3.us-west-1.amazonaws.com/discord_footballgithub.png)
---
## Depthchart Overview
Depthchart is a web application designed with fantasy football leagues in mind. Personally I have found it difficult to keep track of things when four or more apps are being using by our comissioner to desemminate important information. Depthchart aims to solve this problem by getting everything under one roof.

Users at Depthchart can each create their own custom server that can be home to as many custom channels as they like, and all of this can be shared with other members in their league if they decide.

---

## Application Technology:
### Backend:
    1. Python
    2. Flask
    3. Postgresql
    4. SQLAlchemy
SQLAlchemy acts as the python SQL interface and is used as the Object Relational Mapper (ORM). This allows the management of the PostgreSQL database tables and the seeding of data. Below is some code that shows how the user table is created and relationships to other tables are created:
![User table](https://fantasydepthchart.s3.us-west-1.amazonaws.com/Code/User_model.png)

---

### FrontEnd
    1. HTML
    2. Vanilla CSS
    3. Javascript
    4. React
    5. Redux
React-Redux is a Javascript libray that is used to build the responsive UI. The combination of a virtual DOM via React and state management via Redux allows the user to create/edit servers and channels and render them immediately on the page without the need to refresh the page. The following code snippets show how react and redux combine to render the users servers and dynamically render server tiles in the UI:
![Servers](https://fantasydepthchart.s3.us-west-1.amazonaws.com/Code/servers.png)

---

## Future Developments
* Instant Chat and Messaging between multiple users
* Searching other users
* Integration with fantasy football news sources
