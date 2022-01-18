require("./strapBaseCLI");
var fs = require('fs');
var args = process.argv;


function createDb(dbName, password){
	dbName = dbName.toString();
	password = password.toString();

	fs.exists(dbName, (exists) => {
  	 console.log(exists ? 'database already exists' : 'creating database' + ' ' + dbName);
	
	
    if(!exists){

	fs.open(dbName, 'w' , function (err, file){
		if (err){
			console.log('Cannot create this database');
		}
		else{
		console.log('database'+ ' ' + dbName + ' '+ 'was successfully created');
		}
	});

	fs.appendFile('passwordFile', '{' + dbName + ':' +  password + '}', function (err) {
	  if (err){
	  	console.log('Cannot create password')
	  };
	  console.log('database is password protected');
	});

}
   });
}

function readDB(dbName){

  	    dbName = dbName.toString();
  	    
		fs.readFile(dbName, 'utf8' , function(err, data){
           if (err) {
   		 console.log('Cannot read database'+' ' + err );
   				 return
  		}
  		data = JSON.stringify(data);
  		data = JSON.parse(data);
  		console.log(data);
		});

}




function addGraph(dbName, graph){
	dbName = dbName.toString();
    graph  = graph.toString()
	fs.appendFile(dbName, graph, function (err) {
	  if (err){
	  	console.log('Cannot add Graph');
	  };
	  console.log('Graph updated!');
	});
}


function deleteDb(dbName){
	dbName = dbName.toString();
	fs.unlink(dbName, function (err) {
	  if (err){
	  	console.log('database was not successfully deleted')
	  };
	    console.log(dbName+' ' +' was successfully deleted');
	});

}






module.exports = { deleteDb,addGraph,createDb,readDB };
