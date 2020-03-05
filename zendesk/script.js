(function() {
  'use strict';

  window.addEventListener(
    'load',
    function() {
      var forms = document.getElementsByClassName('needs-validation');
      var isValidForm = false;
      var isValidAnswer = false;

      const formValidate = function() {
        Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            'submit',
            function(event) {
              let answer = document.getElementById('answer');
              if (
                form.checkValidity() !== false &&
                answer.value.trim() !== ''
              ) {
                isValidForm = true;
                // decode message
                let message = decodeMessage(answer.value);
                if (message.indexOf('HELLO') >= 0) {
                  isValidAnswer = true;
                } else {
                  isValidAnswer = false;
                  message = 'Sorry, please try again.';
                }
                showMessage(message);
              }
              event.preventDefault();
              event.stopPropagation();
              form.classList.add('was-validated');
              // console.log(document.getElementById('answer').value);
            },
            false
          );
        });
      };

      const decodeText = function(decodingKey, decodingText) {
        let textLength = decodingText.length;
        let decodedText = '';
        for (let i = 0; i < textLength; i += 8) {
          let intValue = parseInt(decodingText.substr(i, 8), 16);
          let decodedString = (intValue ^ decodingKey)
            .toString(16)
            .toUpperCase();

          decodedText +=
            hexToASCII(decodedString.substr(0, 2)) +
            hexToASCII(decodedString.substr(2, 2)) +
            hexToASCII(decodedString.substr(4, 2)) +
            hexToASCII(decodedString.substr(6, 2));
        }
        console.log({ decodedText });
        return decodedText;
      };

      const hexToASCII = function(input) {
        return String.fromCharCode(parseInt(input, 16));
      };

      const decodeMessage = function(key) {
        let encodedMessage =
          '666494086100F9647A49B92A4501A12B5B01BE2B5C01A12B5B53F8214847B7' +
          '365A0FF8134B01AA214F4DB43D0E40A8345C44BB2D4F55BD645A49B9300E58' +
          'B7310E55B72B4501AC2C4B01AC2D4344F8304101BC214D4EBC210E55B02D5D' +
          '01B5215D52B9234B0FF8144244B9374B01AE2D5D48AC644655AC345D1BF76B' +
          '5412B6255E40BB364B42AA314755F63E4B4FBC215D4AF627414CF8334644B6' +
          '64574EAD644F53BD645C44B9205701AC2B0E52AD264348AC64574EAD360E40' +
          'A8344248BB255A48B72A00019B284742B3647572AD264348AC647C44A9314B' +
          '52AC190E4EB6645A49BD645A4EA8695C48BF2C5A01BB2B5C4FBD360201AC2C' +
          '4B4FF8345C4EAE2D4A44F82D4047B7364340AC2D414FF8364B50AD215D55BD' +
          '200E43A1645A49BD644F51A8284742B930474EB664484EAA2900018C2C4F4F' +
          'B364574EAD644F46B92D4001B92A4A01AF210E4DB72B4501BE2B5C56B9364A' +
          '01AC2B0E49BD255C48B6230E47AA2B4301A12B5B01AB2B414FF664';

        return decodeText(key, encodedMessage);
      };

      const showMessage = function(txt) {
        let mssg = '';
        let title = '';
        let classTxt = '';

        if (isValidAnswer) {
          title = 'Well done!';
          classTxt = 'alert-success';
        } else {
          title = 'Sorry!';
          classTxt = 'alert-danger';
        }

        mssg += '<div class="alert ' + classTxt + '" role="alert">';
        mssg += '<h4 class="alert-heading">' + title + '</h4>';
        mssg += '<p>' + txt + '</p>';
        mssg += '</div>';

        document.getElementsByClassName('response-message')[0].innerHTML = mssg;

        if (!isValidAnswer) {
          setTimeout(() => {
            document.getElementsByClassName('response-message')[0].innerHTML =
              '';
          }, 5000);
        }
      };
      formValidate();
    },
    false
  );
})();
