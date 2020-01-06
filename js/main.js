const body = document.getElementsByTagName("body")[0];

$.getJSON( "resources/datas.json", function( datas ) {
    createHTML(datas, body);
});
