# api-basic

Basic API REST running with Docker and MongoDB. There is an user model implemented, you can perform methods GET, PUT, DELETE, POST on it.

## Requirements

The API works with

* Linux (64bit)
* [MongoDB](https://www.mongodb.com/fr)
* [Docker](https://docs.docker.com/)

## Installation

Clone the repository

```
 $ git clone git@github.com:lebroz/api-basic.git
```
## Installation Docker and Docker Compose

To install `Docker` it's [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/) </br>
To install `Docker-Compose` it's [here](https://docs.docker.com/compose/install/)

## Usage

### Run the API with Docker

```
 $ yarn run-docker
```

### Launch API without Docker (you have to install mongoDB locally)

The port of MongoDB is set to `27017` by default.

First, install the dependencies using the packet manager `yarn`,

```
 $ yarn
```
Then,

```
 $ yarn start
```

## Environment

When you execute `yarn start` an environment file `.env` is generated with a random port you can change anytime

## Route USER

### POST /users

Create an user

```
{
 "email": "EMAIL_HERE",
 "password: "PASSWORD_HERE"
}
```

### PUT /users/:id

Update an user</br>
You need a authorisation token</br>
Authorization: Bearer ${token}

```
{
 "email": "NEW_EMAIL_HERE",
 "password: "NEW_PASSWORD_HERE"
}
```

### DELETE /users/:id

Delete an user</br>
You need a authorisation token</br>
Authorization: Bearer ${token}

### GET /users

Retrieve all users</br>
You need a authorisation token</br>
Authorization: Bearer ${token}

## Route AUTH

### POST /authenticate

Authenticate an user

```
{
 "email": "EMAIL_HERE",
 "password: "PASSWORD_HERE"
}
```

## Licence

[MIT](https://choosealicense.com/licenses/mit/)
