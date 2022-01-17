var args = process.argv;
var bring = require("./strapBase.js");


if (args.includes('createDb')) {
   bring.createDb(args[3], args[4]);
}

if (args.includes('deleteDb')) {
   bring.deleteDb(args[3]);
}

if (args.includes('addGraph')) {
   bring.addGraph(args[3], args[4]);
}


