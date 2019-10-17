/* Houses- JavaScript */
$(document).ready(function(){
    // use ajax() to load h04t04-ajax-json-talot.json file
    // call showHouses from done()-function
    $.ajax({
        dataType: 'json',
        url: "h05t04-ajax-json-talot.json",
        cache: false
    }).done(function(data) {
        console.log("done");
        showHouses(data);        
    }).fail(function() {
        console.log("error");
    }).always(function() {
        console.log("complete");
    });
});

// function shows houses information
function showHouses(data) {
    // loop through all houses data 
    $.each(data.talot, function(index, talo) {
        // create a div element and add "houseContainer" class to it
        var div = document.createElement('div');
        // create img element and use "houseImage" class to it and src to house image
        var image = document.createElement('img');
        image.setAttribute();
        // create p element, use address as a text and "header" class
        var header = CODE HERE;
        // create p element ja use house size as a text
        var size = CODE HERE;
        // create p element and use house text as a text and "text" class
        var text = CODE HERE;
        // create p element and use house price as a text
        var price = CODE HERE;
        //  add all elements to houseDiv lisÃ¤tÃ¤Ã¤n kaikki luodut elementit taloDiv-elementtiin
        div.append(image,header,size,text,price);
        // add div to #houses in DOM
        $("#houses").append(div);
    });
}