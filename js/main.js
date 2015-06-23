$(document).ready(function () {
    var quoteReceived = false;
    var giphyKey = "3oEduIQVh382PMPOfe";

    if(!window.location.hash) {
        document.location = document.location + "#?";
    }

    var getQuote = function() {
            $.ajax({
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
            type: 'GET', // The HTTP Method
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                var quoteText = data.quote + " - " + data.author;
                $("#wrapQuote h1").text(quoteText);
                var myURL = document.location;
                document.location = myURL + "&quote=" + encodeURIComponent(quoteText);
            },
            error: function (err) {
                alert(err);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "AvyK2kYttamsh0QVM9uxABW6aQUnp1awTxajsnLufhUW1PgjVz"); // Enter your Mashape key here
            }
        });
    };

    var getNewGif = function() {
            $.ajax({
            url: "http://api.giphy.com/v1/gifs/random?api_key=" + giphyKey + "&tag=reaction", // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
            type: 'GET', // The HTTP Method
            datatype: 'json',
            success: function (data) {
                $("#gif").attr("src", data.data.image_url);
                var myURL = document.location;
                document.location = myURL + "&gif=" + data.data.id;
            },
            error: function (err) {
                alert(err);
            }
        });
    };

    var getExistingGif = function() {
            $.ajax({
            url: gifURL, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
            type: 'GET', // The HTTP Method
            datatype: 'json',
            success: function (data) {
                $("#gif").attr("src", data.data.images.original.url);
            },
            error: function (err) {
                alert(err);
            }
        });
    };

    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var existingQuote = getUrlVars()["quote"];
    var existingGif = getUrlVars()["gif"];

    if (existingQuote) {
        $("#wrapQuote h1").text(decodeURIComponent(existingQuote));
    } else {
        getQuote();
    }

    if (existingGif) {
        gifURL = "http://api.giphy.com/v1/gifs/" + existingGif + "?api_key=" + giphyKey;
        getExistingGif(gifURL);
    } else {
        getNewGif();
    }

    $("#next, header > h1 > span").click(function() {
        var currentURL = location.pathname;
        currentURL = currentURL.substring(currentURL.length-1) == '/' ? currentURL.substring(0, currentURL.length-1) : currentURL;
        currentURL.split('/').pop();
        document.location = currentURL;
    });

    $("#share").click(function() {
        var currentURL = document.location;
        window.prompt("Copy to clipboard: Ctrl+C or CMD+C", currentURL);
    });
});