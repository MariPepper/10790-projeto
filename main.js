function limpar() {
    var limparDiv = document.querySelector('#two');
    if (limparDiv != null) {
        limparDiv.innerHTML = '';
    }
}

function toggleMenu() {
    var menu = document.getElementById("side-menu");
    var body = document.body;
    if (menu.style.display === "none") {
        menu.style.display = "block";
        body.classList.add("side-menu-open");
    } else {
        menu.style.display = "none";
        body.classList.remove("side-menu-open");
    }
}

function onSelectChange() {
    var selectElement = document.getElementById("element");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;

    if (selectedValue === 'circle') {
        bounceCircle();
    } else if (selectedValue === 'square') {
        bounceSquare();
    } else if (selectedValue === 'triangle') {
        bounceTriangle();
    }
}

function hideDivs() {
    var divs = document.querySelectorAll('#two, #three, #four, #five');
    divs.forEach(function (div) {
        div.style.display = 'none';
    });
}

function showSteps() {
    hideDivs();
    var div = document.querySelector('#three');
    div.style.display = 'block';
}

function showBio() {
    hideDivs();
    var div = document.querySelector('#four');
    div.style.display = 'block';
}

function displayDivTwo() {
    hideDivs();
    var div = document.querySelector('#two');
    div.style.display = 'block';
}

function showLeads() {
    hideDivs();
    var div = document.querySelector('#five');
    div.style.display = 'block';
}