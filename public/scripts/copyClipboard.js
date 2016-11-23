setTimeout(function(){
    (function(){
        var copyTextareaBtn = document.querySelector("#copyClipboard");
        var textArea = document.querySelector("#textareaCopy");
        var divCopy = document.querySelector(".pastaContent p");

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
    })();

}, 200);

