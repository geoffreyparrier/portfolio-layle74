function ce (type, parent, classs=null, id=null, html=null, src=null, href=null) {
    res = document.createElement(type);
    res = parent.appendChild(res);
    if (classs !== null) {
        setClass(res, classs);
    }
    if (id !== null) {
        addId(res, id);
    }
    if (html !== null) {
        addHtml(res, html);
    }
    if (src !== null) {
        addSrc(res, src);
    }
    if (href !== null) {
        addHref(res, href);
    }
    return res;
}

function setClass (elem, classs) {
    if (typeof classs === "object") {
        for (let clas of classs) {
            if (elem.classList.contains(clas)) {
                elem.classList.remove(clas);
            } else {
                elem.classList.add(clas);
            }
        }
    } else {
        if (elem.classList.contains(classs)) {
            elem.classList.remove(classs);
        } else {
            elem.classList.add(classs);
        }
    }
}

function addId (elem, id) {
    elem.id = id;
}

function addHtml (elem, html) {
    elem.innerHTML = html;
}

function addSrc (elem, src) {
    elem.src = src;
}

function addHref (elem, href) {
    elem.href = href;
}


function createHTML(json, parent) {
    let iterations = json
    for (let element in json) {
        let [part, id, classs, html, src, href] = dissectElement(element, json);
        const newElem = ce(part[0], parent, classs, id, html, src, href);
        
        if (json.hasOwnProperty(element) && typeof json[element] === "object") {
            createHTML(json[element], newElem)
        }
    }
}

function dissectElement(element, json) {
    let part = element.split('_');
    let id = null;
    let classs = null;
    let html = null;
    let src = null;
    let href = null;
    if (part[1].includes('.')) {
        classs = part[1].split('.');
        classs.shift();
    }

    switch (part[0]) {
        case 'p':
            html = json[element];
            break;

        case 'img':
            src = json[element];
            break;

        case 'h1':
            html = json[element];
            break;

        case 'a':
            split = json[element].split('*');
            href= split[0];
            html = split[1];
            break;

        default:
            console.log(part[0] + ' non géré !');
            break;
    }

    return [part, element, classs, html, src, href]
}