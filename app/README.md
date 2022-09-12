# TEST_TTV

Car Parking System

### Getting Started

![alt text][img1]

[img1]: ../images/api-image.PNG "Car parking API"


### Prerequisites
- NodeJS organize the code with the following directories to separate the code into logical pieces
```
    controllers (api)/ — holds the app routes and logic
    route/ - represents middleware between the request and the response in Express. We can say that everything in Express is middleware, even our route definitions
    services/ - Calculate about the business logic
    repo/ - DB Connection pool
    model/ - represents data and implements business logic and data storage
    config/ = keep db connection string 
    tests/ — test files for our code
    app.js — the entry point for our Express app
    swagger.json - API structure definition control for request and response
    migration_script/ keep the data schema to create at the first time
    package.json — a special file that remembers the packages that we installed
    API_Collection.postman_collection.json - all collection APIs 
    dockerfile - build image from dockerfile and push to docker repository such a AWS ECR
    docker-compose.yml = run service container from image that reference via docker compose up 

```
- MySql
```
    DB that use 3 table below
     - parking
     - slots
     - tickets
    
```
![alt text][img2]

[img2]: ../images/er-diagram.png "Table relationship"

- Condition
```
     - When create a car parking it allow atleast 10 slos for the minimum
     - Car regist number cannot dupplicate at the same time
     - Calcualte a nearest to the entry by displacement between originate x and y 
     - When slots is allocated, the status will change to is not available
    
```