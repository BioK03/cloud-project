setTimeout(function(){
    (function(){
        var copyTextareaBtn = document.querySelector("#copyClipboard");
        var textArea = document.querySelector("#textareaCopy");
        var divCopy = document.querySelector("#pastaText");

        copyTextareaBtn.addEventListener('click', function(event) {
            textArea.value = divCopy.innerHTML;
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                copyTextareaBtn.innerHTML = "Copied !";
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        });


        var copyTextareaBtn2 = document.querySelector("#copyClipboard2");
        var textArea2 = document.querySelector("#textareaCopy2");

        copyTextareaBtn2.addEventListener('click', function(event) {
            var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
            textArea2.value = newURL;
            textArea2.select();

            try {
                var successful = document.execCommand('copy');
                copyTextareaBtn2.innerHTML = "Copied !";
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        });
    })();

}, 200);

