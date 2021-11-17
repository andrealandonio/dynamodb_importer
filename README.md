# DynamoDB importer

A simple AWS DynamoDB importer from a file to a DynamoDB table.

## How-to

Using the AWS credentials in your machine the program read a file (composed by a first header row) and looping over all the not empty rows put they into a Dynamo DB table (the table needs to be already defined).

## Install

After downloading the repo, just run:

```
npm install
```

## Use

After downloading all the dependencies, just use:

```
node index.js --file=./<your_file>.csv --table=<your_dynamodb_table> --region=<your_aws_region>
```

You can provide 3 input parameters:

* file: the file with the list of row to import (*required*)
* table: the target DynamoDB table (*required*)
* region: the AWS region of target DynamoDB table (otherwise 'eu-west-1' will be used)
