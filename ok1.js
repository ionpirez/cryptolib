key = '',
data = {},
data["home"]="run",
data["run"] = "away",
data["sun"] = {};
data.sun['shine'] = 'blur';
data = JSON.stringify(data);
function convertStringToArrayBufferView(str)
{
    var bytes = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++)
    {
        bytes[iii] = str.charCodeAt(iii);
    }

    return bytes;
}

function convertArrayBufferViewtoString(buffer)
{
    var str = "";
    for (var iii = 0; iii < buffer.byteLength; iii++)
    {
        str += String.fromCharCode(buffer[iii]);
    }

    return str;
}
var private_key_object = null;
var public_key_object = null;
var promise_key = null;
var encrypted_data = null;
var encrypt_promise = null;
var decrypt_promise = null;
var decrypted_data = null;

var vector = window.crypto.getRandomValues(new Uint8Array(16));

var crypto = window.crypto || window.msCrypto;

if(crypto.subtle){
    alert("Cryptography API Supported");
    promise_key = window.crypto.subtle.importKey("jwk",{kty: "oct",k: "Y0zt37HgOx-BY7SQjYVmrqhPkO44Ii2Jcb9yydUDPfE",alg: "A256CBC",ext: true,},{name: "AES-CBC",},true,["encrypt", "decrypt"]);
    promise_key.then(function(key){
      public_key_object = key;
    });
}
else
{
    alert("Cryptography API not Supported");
}

//va a recibir un parametro x
function encrypt_data(){
    encrypt_promise = window.crypto.subtle.encrypt({name: "AES-CBC",iv: vector,},public_key_object,convertStringToArrayBufferView(data));
    encrypt_promise.then(function(x){
      encrypted_data = new Uint8Array(x);
      console.log(encrypted_data);
      localStorage.item = JSON.stringify(encrypted_data);
    }).catch(function(err){
        console.error(err);
    });
}
//va a recibir un parametro x
function decrypt_data(){
  decrypt_data =  window.crypto.subtle.decrypt({name: "AES-CBC",iv: vector,},public_key_object, encrypted_data );
  decrypt_data.then(function(x){
    decrypted_data = new Uint8Array(x);
    localStorage.item = convertArrayBufferViewtoString(decrypted_data);
    console.log(convertArrayBufferViewtoString(decrypted_data));
  }).catch(function(err){
      console.error(err);
  });
}
