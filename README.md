# api-basic

Get basic api, you can create a new user, update it and authenticate. Try it with [Postman](https://www.getpostman.com/)!

## Requirements

The API works with

* Linux (64bit)
* [mongoDB](https://www.mongodb.com/fr)

## Installation

Clone the repository

```
 $ git clone git@github.com:lebroz/SimpleStrongAPI.git
```

Install dependencies using the packet manager `yarn`

```
 $ yarn
```

## Usage

Launch API

```
 $ yarn start
```
It will generate a public and private key automatically and also an environment file with a random port you can change anytime

If you want to reset the evn file, then

```
 $ yarn generate-env
```
If you want to reset the rsa keys, then

```
 $ yarn generate-keys
```
## Licence

[MIT](https://choosealicense.com/licenses/mit/)
