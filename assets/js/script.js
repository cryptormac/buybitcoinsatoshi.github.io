"use strict";

/*global jQuery */

$(document).ready(function (){
$(".currencyField").keyup(function (){ //input[name='calc']
 let convFrom;
 if($(this).prop("name") == "btc") {
       convFrom = "btc";
       convTo = "usd";
 }
 else {
       convFrom = "usd";
       convTo = "btc";
 }
 $.getJSON( "https://api.coindesk.com/v1/bpi/currentprice/usd.json",
    function( data) {
    var origAmount = parseFloat($("input[name='" + convFrom + "']").val());
    var exchangeRate = parseInt(data.bpi.USD.rate_float);
    let amount;
    if(convFrom == "btc")
       amount = parseFloat(origAmount * exchangeRate);
    else
       amount = parseFloat(origAmount / exchangeRate);
    $("input[name='" + convTo + "']").val(amount.toFixed(2));
    });
});
})

$.get( "https://api.coindesk.com/v1/bpi/currentprice.json", function (data) {
  parsedData = JSON.parse(data)

});
  $(function()
  {
    $("#satoshi-input").bind('input',function (){

      s = $("#satoshi-input").val().toString().replace(/\,/g,'');
      if (s>=1000)
      {
        b = s.toString().split(".");
        b[0] = b[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        c = b.join('.');
        $("#satoshi-input").val(c);
      }
      if (isNaN(s*2)) $("#btc-sats-one-one").val(0);
      else
      {
        jQuery.get( "https://api.coindesk.com/v1/bpi/currentprice.json", function (data) {
          var parsedData = JSON.parse(data)
          var bitcoinUSD = parsedData.bpi.USD.rate.replace(/\,/g,'') * s
          var satoshiBitcoinUSD = (bitcoinUSD*0.00000001)
          q = (satoshiBitcoinUSD).toFixed(3)
          a = q.toString().split(".");
          a[0] = a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
          p = a.join('.');
          $("#satoshi-usd-output").val(p);
      });

      }
    });
  });
