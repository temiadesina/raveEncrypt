var rave = require('./services/encrypt.js');

module.exports = {
    encryptRave: function(req, res){
        
        var seckey = req.body.seckey;
        var pubkey = req.body.pubkey;

         if(!seckey){
            res.status(400).send({status: "error", code: "RV_SECK", message: "seckey is required"});
        } 
        else if(!pubkey){
            res.status(400).send({status: "error", code: "RV_PUBK", message: "pubkey is required"});
        }
        else{
            var encryptionKey = rave.getkey(seckey);

            var formData = req.body.form;

            var encryptedData = rave.encrypt(encryptionKey, JSON.stringify(formData));

            res.status(200).send({PBFPubKey: pubkey, client: encryptedData, alg: "3DES-24"});

        }
        
       

    }

}