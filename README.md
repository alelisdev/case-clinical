# Case Clinical Admin

This is a document about **case-clinical-2**. This portal is basically used by admins.

# Getting Started

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Migration](#migration)
- [Run](#run)

## Prerequisites

### Minimum System Requirement

- RAM : 16GB
- Processor : Core i5

### Required Softwares

- SQL server 2019 developer addition.
- SQL Server Management Studio.
- Shadow db created (db name mentioned in env file).

### Installation

- Download **Nodejs** version **16.10**

- Install Yarn
  ```
  npm install --global yarn
  ```
- Install Prisma

  Using npm

  ```
  npm install prisma --save-dev
  ```

  Using Yarn

  ```
  yarn add prisma --dev
  ```

- Install Nx CLI
  ```
  npm install -g nx
  ```

## Setup

Add Project in local

### Clone Repository

- Clone **case-clinical-fuse** repository

  ```
  git clone git@github.com:Clairvoyanceio/case-clinical-2.git
  ```

### Environment setup

Setup local environment to run this project

- Go inside the project folder and install dependency packages.

  ```
  yarn
  ```

  > Its take 20-30 minutes

- Create a new `.env` file and add below properties.

  ```
  NODE_ENV=development

  PORT=3000

  JWT_SECRET=SchemaDrivenJwtSecret123

  API_BASE_URL=https://localhost:44301

  HEROKU_APP_NAME=case-clinical

  DATABASE_URL=sqlserver://localhost:1433;database=case-clinical-underwriting;user={USER_NAME};password={PASSWORD_GOES_HERE};encrypt=true;trustServerCertificate=true;pool_timeout=0;

  SHADOW_DATABASE_URL=sqlserver://localhost:1433;database=case-clinical-underwriting;user={USER_NAME};password={PASSWORD_GOES_HERE};encrypt=true;trustServerCertificate=true;pool_timeout=0;

  NODE_OPTIONS="--max-old-space-size=8000"

  AZURE_STORAGE_SAS_KEY="sp=racwdl&st=2022-01-21T21:12:24Z&se=2022-02-05T05:12:24Z&sip=47.134.37.235&sv=2020-08-04&sr=c&sig=AXQk6KhwrwkJ%2B6YM4yC%2FnQIXekFPnNM%2FV4hyCw2vocE%3D"

  AZURE_STORAGE_KEY="4ZieDGgM7r3PX95/QMWf4me79+Fz8pLd1u+oFJ6v9QAzBDSdpx3eRnCEQcchL7C/iFwDtFEZJArAoV2n0Xc1dw=="

  AZURE_STORAGE_KEY="Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=="

  AZURE_STORAGE_ACCOUNT="devstoreaccount1"

  AZURE_STORAGE_URL="http://127.0.0.1:10000"

  AZURE_CONTAINER_NAME="base-project-files"

  AZURE_STORAGE_CONNECTIONSTRING="AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;
  DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;FileEndpoint=http://127.0.0.1:10003/devstoreaccount1;
  QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;"

  ```

  > Replace USER_NAME and PASSWORD in DATABASE_URL and SHADOW_DATABASE_URL

- To update all the packages run below command.

  ```
  yarn update
  ```

### Migration

- Add latest schema to Databse.

  ```
  yarn prisma:apply
  ```

- To seed data in local database.

  > Need to run seed file in different step, For example uncomment first step block and comment all other steps run below seed command. After successful run of first step comment out that first step and uncomment second step code block and so on for all steps.   
  ```
  yarn prisma:seed
  ```


  > If you are facing any timeout issue than you can append pool_timeout=10000; in DB connection string and run this again

### Run

Run project in local

- To run API project, run below command.

  ```
  yarn dev:api
  ```

- To generate types for SDK and run it, run below command in new terminal

  ```
  yarn dev:sdk
  ```

- to build and run web application, run below command in new terminal

  ```
  yarn dev:web
  ```
