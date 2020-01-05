const body = document.getElementsByTagName("body")[0];

$.getJSON( "datas/datas.json", function( datas ) {
    createHTML(datas, body);
});
