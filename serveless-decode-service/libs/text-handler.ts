export class TextHandler {
  constructor() {}
  decode(decodeKey, textToDecode) {
    let textLength = textToDecode.length;
    let decodedText = '';
    for (let i = 0; i < textLength; i += 8) {
      let intValue = parseInt(textToDecode.substr(i, 8), 16);
      let decodedString = (intValue ^ decodeKey).toString(16).toUpperCase();
      decodedText +=
        this.hexToAscii(decodedString.substr(0, 2)) +
        this.hexToAscii(decodedString.substr(2, 2)) +
        this.hexToAscii(decodedString.substr(4, 2)) +
        this.hexToAscii(decodedString.substr(6, 2));
    }
    return decodedText;
  }
  hexToAscii(input) {
    return String.fromCharCode(parseInt(input, 16));
  }
}
