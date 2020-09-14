import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

constructor() { }
password = 'SPILEARN';
convertText(conversion: string, text) {
  if (conversion === 'encrypt') {
    return CryptoJS.AES.encrypt(text, this.password).toString();
  } else {
    return CryptoJS.AES.decrypt(text, this.password).toString(CryptoJS.enc.Utf8);

}
}

}
