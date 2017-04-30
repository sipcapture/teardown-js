var should = require('chai').should,
    expect = require('chai').expect,
    module = require('../index'),
    teardown = module.teardown;
    parse = module.parse;


var test200 = {
	"callid":"e26cca4f09905c32@10.0.0.77",
	"capt_id":2001,
	"capture_ip":"127.0.0.1",
	"create_date":1493542134,
	"destination_ip":"10.0.0.33",
	"destination_port":5080,
	"family":1,
	"gid":10,
	"id":977,
	"message": "SIP/2.0 200 OK\r\nVia: SIP/2.0/UDP 92.205.76.237:5080;branch=z9hG4bK-77fe2c23;rport=5080\r\nFrom: <sip:9999@sip.domain.com>;tag=SP1dafdc2d47f7f34a0\r\nTo: <sip:883510000000001@sip.domain.com>;tag=1UH8FKmtpQcHF\r\nCall-ID: e26cca4f09905c32@10.0.0.77\r\nCSeq: 8002 INVITE\r\nContact: <sip:883510000000001@10.0.0.22:5060;transport=udp>\r\nUser-Agent: QXIP.NET\r\nAllow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, REGISTER, REFER, NOTIFY\r\nSupported: timer, precondition, path, replaces\r\nAllow-Events: talk, hold, conference, refer\r\nContent-Type: application/sdp\r\nContent-Disposition: session\r\nContent-Length: 247\r\nRemote-Party-ID: <sip:883510000000001@sip.domain.com>;party=calling;privacy=off;screen=no\r\n\r\nv=0\r\no=FreeSWITCH 1493514447 1493514448 IN IP4 10.0.0.22\r\ns=FreeSWITCH\r\nc=IN IP4 10.0.0.22\r\nt=0 0\r\nm=audio 27644 RTP/AVP 8 101\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:101 telephone-event/8000\r\na=fmtp:101 0-16\r\na=silenceSupp:off - - - -\r\na=ptime:20\r\n\r\n",
	"method":"",
	"micro_ts":1493542134134084,
	"node":"",
	"proto":"udp",
	"reply_reason":200,
	"source_ip":"10.0.0.22",
	"source_port":5060,
	"tss":1493542134,
	"tsu":134084,
	"type":1,
	"uuid":"d7206a8f-2d81-11e7-aa8f-000019432987"
};

var test;

describe('#escape', function() {
  it('TEARDOWN BYE', function() {
    expect( test = parse(test200) ).to.be.a('object');
    for(var md in test) { expect(md).to.be.a('string') };

  });
});
