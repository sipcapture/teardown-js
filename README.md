[![Dependency Status](https://david-dm.org/sipcapture/teardown-js.svg)](https://david-dm.org/sipcapture/teardown-js)

# teardown-js
Generates a SIP BYE for Session Teardown provided key parameters.

#### (C) 2017 QXIP BV, part of the HEPIC stack (http://hepic.tel)

### Install:
```
npm install teardown-js
```


### Example Usage:
```
var mybye = teardownJS.teardown(from,to,callid,cseq,contact,via,route);
```

#### Example Result
```
{ aleg: '...', bleg: '...' }
```

