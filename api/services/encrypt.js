function encrypt(key, text)
{
	var CryptoJS = require('crypto-js');
	var forge    = require('node-forge');
	var utf8     = require('utf8');
	var cipher   = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(key));
	cipher.start({iv:''});
	cipher.update(forge.util.createBuffer(text, 'utf-8'));
	cipher.finish();
	var encrypted = cipher.output;
	return ( forge.util.encode64(encrypted.getBytes()) );
}

function decrypt(key, encrypted_text)
{
	function hTS(hex_String) {

		var hex = hex_String.toString();
		var str = '';

		for (var n = 0; n < hex.length; n += 2)
		{
			str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
		}
		return str;

	}

	var CryptoJS   = require('crypto-js');
	var forge      = require('node-forge');
	var utf8       = require('utf8');
	var decipher   = forge.cipher.createDecipher('3DES-ECB', forge.util.createBuffer(key));
	encrypted_text = forge.util.decode64(encrypted_text);

	decipher.start({iv:''});
	decipher.update(forge.util.createBuffer(encrypted_text, 'utf-8'));
	decipher.finish();
	var decrypted = decipher.output;
	return hTS( decrypted.toHex() );
}


function getKey(seckey){
	var md5 = require('md5');
	var keymd5 = md5(seckey);
	var keymd5last12 = keymd5.substr(-12);

	var seckeyadjusted = seckey.replace('FLWSECK-', '');
	var seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);

	return seckeyadjustedfirst12 + keymd5last12;
}
module.exports = {encrypt:encrypt, decrypt:decrypt, getkey:getKey};