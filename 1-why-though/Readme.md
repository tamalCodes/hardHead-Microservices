<!-- TOC -->

- [TL,DR;](#tldr)
- [Understanding the problem](#understanding-the-problem)
- [Sounds good, here's the solution](#sounds-good-heres-the-solution)
- [Why Database-per-service ?](#why-database-per-service-)
- [A data problem](#a-data-problem)
- [Communication between services](#communication-between-services)
  - [Synchronous](#synchronous)
  - [Asynchronous](#asynchronous)
- [Well the solution is pretty bizarre](#well-the-solution-is-pretty-bizarre)
- [Tradeoffs ?](#tradeoffs-)

<!-- /TOC -->

# TL,DR;
I'll try and be consistent throughout the process as much as I can because it makes no sense to wander around with something and not be progressive in that field. So the goal is simple,  documenting my each day's journey while  learning something about microservices.

# Understanding the problem

let's say we have a huge war application and inside the web application we are gonna have a lot of different features.  so technically as long as we built it these days we  had a monolithic structure,  the problem with that was if something was to crash a lot of other things would be dependent on it and as a result they would have been crashing too.

Plus inside of a monolithic architecture the features do have a very common database as a result if one of the database is down or something the whole app is.


# Sounds good, here's the solution

![dss](https://i.ibb.co/yXZkG44/Screenshot-1.png)

So here's where microservices comes into play we are gonna be using a lot of different services are basically breakdown the lot of features that we previously had in the monolithic architecture in the different services and those in terms are gonna be having their particular specific database or personal database. 

The advantage of this is gonna be if one particular service is down the others will not be affected immediately,  and also they do not share a very common database there won't be a lot of conflicts going around. 

# Why Database-per-service ?

The reason is pretty simple we want each service to run independently of any other services,  the database schema or structure might change very unexpectedly and as a result if it does there are gonna be a lot of conflicts.

And also some services might function much more efficiently with different types of databases,  some might use sql while the others might be using no sql.  so it's better to have a database per service.


# A data problem

Well now there's a problem with how we are gonna be used in data.  previously we had a monolithic data structure or a monolithic database and as a result everything was at one place and any feature could access the database as the same time as any other feature would.  but what happened is now we have their own separate databases and service a cannot access the database directly of service b.

# Communication between services

Well first of all sync and async means totally different things in terms of javascript, but here we are gonna be using them in terms of microservices.  so let's say we have a service a and service b and service a wants to communicate with service b.  so there are two ways of doing it,  one is synchronous and the other is asynchronous.

## Synchronous

This is the most common way of doing it,  so let's say service a wants to communicate with service b,  so what it does is it sends a request to service b and service b responds to it.  so this is a synchronous way of doing it,  the problem with this is if service b is down or something then service a will not be able to do anything.

Well we also do have a lot of upsides and downsides of this kind of synchronous communication

- The first thing is it is conceptually easy to understand
 a new service might also not even need our database as it is communicating very directly

However we also do have a lot of downside to it

- It introduces a dependency between the services,  so if one service is affected there are high chances that the other service is also gonna be affected
- The entire request is only fast as the slowest request,  this is because if we have two services communicating between each other that might take some time.  if service a communicates with service b there are chances that service b needs to communicate with service c to get a response. 

- Therefore there is a huge wave of requests and very high chances of this being not so much efficient in real real world.

![sync](https://i.ibb.co/5vvbS4F/Screenshot-2.png)


## Asynchronous

Well the asynchronous method also do have a lot of disadvantages and advantages just like the synchronous ones and both of them in terms of their experience or use are pretty much similar. 

See here's the thing in asynchronous method we can have an event bus which basically can be like an array or something like that.  whenever service requires anything we can push an event that hey I need something.  as soon as there is an event in that event bus another service would get that event that ok there's a request for something let me give the answer of this and again push that answer into the event bus. 

So as you can see putting stuff inside the event bus and again getting away from it is pretty complex and to be honest it also introduces a lot of different dependencies.  my service is actually dependent on the event that I am gonna get for another microservice so if I do not have that microservice working I won't be getting any particular results


# Well the solution is pretty bizarre

So the solution of implementing all these kind of things is going to be pretty bizarre but as you can see it's gonna be a fun to do. 

- So let's say we do have an event bus,  and in simple terms think about this subscribe and unsubscribe model that we previously used and learned in javascript.  we are subscribing to the event bus.  imagine an ecommerce application,  whenever a new user is created the first service actually pushes the users data inside the event verse saying that hey if any other service needs this they can use it to their liking. 

</br>

- Suppose another service which is subscribed to the event bus is actually looking for any kind of users data to further storage or processes and whatever so as soon as they end up having that kind of particular data inside the event bus,  they are gonna instantly  take off the data from the event bus and process it and finally get their own data.

This might sound pretty much complex but it is not that complex to start with.


# Tradeoffs ?

Do not get the idea that this has no trade-offs at all.  let's say that we have other dependencies which suddenly crashed,  this dependency however is not gonna crash at all because though we are dependent on other services in terms of events but that does not mean that if we are not getting any emails we will completely fail.

The second thing is the service is gonna be pretty fast because all we are doing is just looking at the event bus and as soon as we get some data we process it and use it that's it

Not a downside which might look as a negative point at the very first is the topic of data duplication,  also the fact that we might need to pay for extra storage or extra database.  but to be honest in the real world there's no huge amount of charge regarding you know paying for extra storage and whatsoever.

Last but not the least it is really hard to understand because sometimes it's it can be a lot of different complex things you know subscribing to the even bus understanding what the **** even subscribe is,  so on and so forth but as we are gonna be building stuff things are going to get clear


