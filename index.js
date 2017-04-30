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

  teardown: function(from,to,callid,cseq,contact,via,dataRoute,HOST,PORT) {
	var sipmessage = formMessage(from,to,callid,cseq,contact,via,dataRoute);
	if (HOST && PORT) {
		return(sendUdp(HOST,PORT,sipmessage));
	} else {
		return sipmessage;
	}
  },
  send: function(HOST,PORT,sipmessage){
	if (HOST && PORT) {
		return(sendUdp(HOST,PORT,sipmessage));
	}
  },
  parse: function(md){
	var src_ip=md.source_ip;
	var src_port=md.source_port;
	var dst_ip=md.destination_ip;
	var dst_port=md.destination_port;
	var message = md.message;
	var callid = md.callid;
	var termMessage = [];
	var via;
	var from, to, cseq, contact, toUser;
	var obMessage = md.message.split("\r\n");
	var route = [];
	for(var hr in obMessage)
	{
		var mm = obMessage[hr];
		if (mm.startsWith("From")) { from = mm.split(/: (.+)/)[1]; }
		else if(mm.startsWith("To")) { to = mm.split(/: (.+)/)[1]; }
		else if(mm.startsWith("Contact")) {
			var str = mm.split(/: (.+)/)[1];
			contact = str.substr(1).slice(0, -1);
		} else if(mm.startsWith("CSeq")) {
			var tmpcseq = mm.split(/:(.+)/)[1];
			cseq = parseInt(mm.split(' ')[1]);
		} else if(mm.startsWith("Via")) {
			via = mm;
		} else if(mm.startsWith("Record-Route")) {
			var str = mm.split(/: (.+)/)[1];
			route.push("Route: " + str);
		}
	}
	var dataRoute = route.reverse();
	var teardown_aleg = formMessage(from,to,callid,cseq,contact,via,dataRoute);
	var teardown_bleg = formMessage(to,from,callid,cseq,contact,via,dataRoute);
	return { aleg: teardown_aleg, bleg: teardown_bleg };
  }
};

/* Common Functions */

var formMessage = function(from,to,callid,cseq,contact,via,dataRoute) {
	var sipmessage = "BYE "+ contact 
	+	" SIP/2.0\r\n"
	+	via +"\r\n"
	+	dataRoute.join("\r\n")
	+	"From: "+from +"\r\n"
	+	"To: " +to  +"\r\n"
	+	"Call-ID: "+ callid +"\r\n"
	+	"User-Agent: Teardown-JS\r\n"
	+	"Max-Forwards: 15\r\n"
	+	"CSeq: "+ cseq +" BYE\r\n";
	return sipmessage;
}

var sendUdp = function(HOST,PORT,sipmessage) {
	var message = new Buffer(sipmessage);
	var client = dgram.createSocket('udp4');
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
	    if (err) { throw err; return 500 }
	    client.close();
	    return 200;
	});
}

