# api-basic

Basic API REST using mongoDB as database. There is an user model implemented, you can perform methods GET, PUT, DELETE, POST on it.

## Requirements

The API works with

* Linux (64bit)
* [mongoDB](https://www.mongodb.com/fr)

## Installation

Clone the repository

```
 $ git clone git@github.com:lebroz/api-basic.git
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

If you want to reset the env file, then

```
 $ yarn generate-env
```
If you want to reset the rsa keys, then

```
 $ yarn generate-keys
```
## Licence

[MIT](https://choosealicense.com/licenses/mit/)
