/**
 * TEARDOWN-js: SIP Teardown for Node.JS
 * 
 * Copyright (C) 2017 Lorenzo Mangani (SIPCAPTURE.ORG)
 * Copyright (C) 2017 QXIP BV (QXIP.NET)
 *
 * Project Homepage: http://github.com/sipcapture 
 *
 * This file is part of TEARDOWN-js
 *
 * TEARDOWN-js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 * 
 * TEARDOWN-js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * 
 **/

var debug = false;
var dgram = require('dgram');

module.exports = {

  teardown: function(TUSER,TDOMAIN,DSTIP,CALLID,FROMTAG,TOTAG,FALIAS,TALIAS,HOST,PORT) {

	var sipmessage =
		"BYE sip:"+ TUSER +"@"+ TDOMAIN +" SIP/2.0\r\n"
	   +	"Via: SIP/2.0/UDP "+ TDOMAIN +"\r\n"
	   +	"From: "+ FALIAS +" <sip:"+ TUSER +"@"+ TDOMAIN+ ">;tag="+ FROMTAG +"\r\n"
	   +	"To: "+ TALIAS +" <sip:"+ TUSER +"@"+ TDOMAIN +">;tag="+ TOTAG +"\r\n"
	   +	"Call-ID: "+ CALLID +"\r\n"
	   +	"User-Agent: Teardown-JS\r\n"
	   +	"Max-Forwards: 15\r\n"
	   +	"CSeq: 2017 BYE\r\n"

   	if (TDOMAIN != DSTIP)	sipmessage += "Route: <sip:"+TDOMAIN+";ftag="+FROMTAG+";lr=on>\r\n",

   	sipmessage += "Content-Length: 0\r\n\r\n";

	if (HOST && PORT) {
		return(sendUdp(HOST,PORT,sipmessage));
	} else {
		return sipmessage;
	}
  }
};


/* Functions */

var sendUdp = function(HOST,PORT,sipmessage) {
	var message = new Buffer(sipmessage);
	var client = dgram.createSocket('udp4');
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
	    if (err) { throw err; return 500 }
	    client.close();
	    return 200;
	});
  }

