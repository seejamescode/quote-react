$(document).ready(function () {
    var quoteReceived = false;
    var getQuote = function(cb) {
            $.ajax({
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
            type: 'GET', // The HTTP Method
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                $("#wrapQuote h1").text(data.quote + " - " + data.author);
            },
            error: function (err) {
                alert(err);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "AvyK2kYttamsh0QVM9uxABW6aQUnp1awTxajsnLufhUW1PgjVz"); // Enter your Mashape key here
            }
        });
    };

    var getGif = function(cb) {
            $.ajax({
            url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=reaction', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
            type: 'GET', // The HTTP Method
            datatype: 'json',
            success: function (data) {
                $("#wrapGif img").attr("src", data.data.image_url);
            },
            error: function (err) {
                alert(err);
            }
        });
    };
    getQuote();
    getGif();
});