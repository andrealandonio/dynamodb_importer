const fs = require('fs');
const minimist = require('minimist');
const parse = require('csv-parse/lib/sync');
const AWS = require('aws-sdk');

// Read args
const args = minimist(process.argv.slice(2));

// Read 'region' parameter
region = args['region'];

// Setup region
if (region == '' || region == undefined) {
	AWS.config.update({region: 'eu-west-1'});
}
else {
	AWS.config.update({region: region});
}
const docClient = new AWS.DynamoDB.DocumentClient();

// Read 'file' parameter
file = args['file'];
if (file == '' || file == undefined) {
	console.log('Error: Missing source file');
	process.exit(1);
}
const contents = fs.readFileSync(file, 'utf-8');
const data = parse(contents, {columns: true});

// Read 'table' parameter
table = args['table'];
if (table == '' || table == undefined) {
	console.log('Error: Missing dynamoDB table');
	process.exit(1);
}

// Loop contents
data.forEach((item) => {
	if (item.Url != '') {
		// If row is not empty, put it into dynamoDB
		docClient.put({TableName: table, Item: item}, (err, res) => {
			if (err) console.log(err);
			else console.log('add item url: ' + item.Url + ' - target: ' + item.Target);
		})
	}
});
