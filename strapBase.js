var args = process.argv;
var fs = require('fs');
require("./strapBaseCLI");



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

	fs.appendFile(dbName, '{' +'"' + dbName +'"' + ':' +'"'+ password +'"' + '', function (err) {
	  if (err){
	  console.log('Cannot create password' + err);
	  };
	  console.log('database is password protected');
	  });
    }

   });
}


function readDb(dbName, password){
  	    dbName = dbName.toString();
  	    //password = password.toString();
	
		fs.readFile(dbName, 'utf8' , function(err, data){
           if (err) {
   		 console.log('Cannot read database'+' ' + err );
   				return 
  		}
  		data = data + "}"
  		data = JSON.parse(data);
  		//console.log(data);

  		result = Object.values(data)
  		if(result[0] == password){
  		  console.log(data)
  		  return
  		}
  		else{
  			console.log('You entered the wrong password. Try please again')
  		}





  	});
	}

  		

function testDb(dbName, password){
  	    dbName = dbName.toString();
  	    //password = password.toString();
	
		fs.readFile(dbName, 'utf8' , function(err, data){
           if (err) {
   		 console.log('Cannot read database'+' ' + err );
   				return 
  		}
  		data = data + "}"
  		data = JSON.parse(data);
  		//console.log(data);

  		result = Object.values(data)
  		if(result[0] == password){
          return True;   		  
  		}
  		else{
  			console.log('You entered the wrong password. Try please again')
  			return
  		}





  	});
	}



function addGraph(dbName, graph, password){
	dbName = dbName.toString();
    graph  = graph.toString()

    fs.readFile(dbName, 'utf8' , function(err, data){
           if (err) {
   		 console.log('Cannot read database'+' ' + err );
   				return 
  		}
  		data = data + "}"
  		data = JSON.parse(data);
  		result = Object.values(data);

        if (result[0] == password){


	fs.appendFile(dbName, ", " + graph, function (err) {
	  if (err){
	  	console.log('Cannot add Graph');
	  	return
	  };
	  console.log('Graph updated!');
	});
}
else{

	console.log("Wrong password. Try again");
}
    });
}



function deleteDb(dbName, password){
	dbName = dbName.toString();


    fs.readFile(dbName, 'utf8' , function(err, data){
           if (err) {
   		 console.log('Cannot read database'+' ' + err );
   				return 
  		}
  		data = data + "}"
  		data = JSON.parse(data);
  		result = Object.values(data);

        if (result[0] == password){

	fs.unlink(dbName, function (err) {
	  if (err){
	  	console.log('database was not successfully deleted')
	  	return
	  };
	    console.log(dbName+' ' +' was successfully deleted');
	});

}
 else{
 	console.log("Wrong password. Please try again");
 }

});
}




module.exports = { deleteDb, addGraph, createDb, readDb };
