//##VARIABLES##
let currentTask = 'coins';
let table = '';
let inputText = '';
let data = '';
let regions = '';
let allRegions = '';
let step1 = '';
let regionPicked = false;
let currentStep = 1;
let listOfSteps = ('<div id="step1" class="steps">');
let pickedRegion = '';
let currentRegion = '';
let exchangeLogo = '';
let currentCoin = '';
let exchanges = '';
listOfSteps += ('<ol id="stepList" class="list">');
listOfSteps += ('</ol></div>');

let stepOne = ('<li class="item" id="0">');
stepOne += ('<h2 class="headline"><span>Select Your Region</span></h2>' +
    '<div id="pickedRegion" onclick="pickRegion()"></div></li>');

const demo = $('#demo01').animatedModal({
    color: '#ff000'
});

//##JQUERY##


//##JSON##
$.getJSON('data/projects.json', function (json) {
    data = json;
});

$.getJSON('data/regions.json', function (json) {
    regions = json;
});

$.getJSON('data/exchanges.json', function (json) {
    exchanges = json;
});

//##FUNCTIONS##
  //SEARCH
function searchForLogo(Data, word) {
    let options = {
        id: "logo",
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name"
        ]
    };

    let fuse = new Fuse(Data, options);
    let result = fuse.search(word);
    return result;
}

function strongLogoSearch(Data, word) {
    const options = {
        id: "logo",
        shouldSort: true,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name"
        ]
    };

    const fuse = new Fuse(Data, options);
    const result = fuse.search(word);
    return result;
}

function strongIdSearch(Data, word) {
    const options = {
        id: "id",
        shouldSort: true,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name"
        ]
    };

    const fuse = new Fuse(Data, options);
    const result = fuse.search(word);
    return result;
}

function searchName(Data, word) {
    let options = {
        id: "name",
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name"
        ]
    };

    let fuse = new Fuse(Data, options);
    let result = fuse.search(word);
    return result;
}

  //Option Triggers
function pickRegion() {
    currentTask = 'regions';
    $('#last_name').val('').blur();
    table = '';
    table += tableCreation(regions, table);
    $('#projectsList').html(table);
    demo.open();
}

function pickCoin() {
    currentTask = 'coins';
    $('#last_name').val('').blur();
    table = '';
    table += tableCreation(data, table);
    $('#projectsList').html(table);
    demo.open();
}

function pickExchange() {
    currentTask = 'exchanges';
    $('#last_name').val('').blur();
    table = '';
    table += tableCreation(data, table);
    $('#projectsList').html(table);
    demo.open();
}

function updateStep(currentStep) {
    for(let i = 0 + currentStep; i < 3; i++){
        console.log(i);
        $('#step1 ol').eq(i).remove();
    }
}


function updateRecord(div) {
    // statements
    let id = div.id; // or however you want to use the id
    currentCoin = id;
    // statements
    let img = strongLogoSearch(data, id);

    let coinHeading = '';

    if(regionPicked === false){
        coinHeading = ('<div id="intro" onclick="pickCoin()"><img src ="' + img + '" id="step1Logo" class="centre" height="50" width="50">');
        coinHeading += ('<h3 id="step1Heading" class="centre">' + id + '</h3>');
        coinHeading += ('</div>');
        step1 = coinHeading + listOfSteps;
        demo.close();
        currentTask = 'regions';
        //enableScroll();
        $('#last_name').val('').blur();
        $('#lastLabel').text(textPicker(inputText));
        $('#main-body').html(step1);
        $('#step1 ol').append(stepOne);
        updateStep(currentStep);
        $('#main-body').css('height', '1000px');

        $('html,body').animate({
            scrollTop: $('#step1Heading').offset().top
        });
        setTimeout(function() {
            table = '';
            table += tableCreation(regions, table);
            allRegions = table;
            $('#projectsList').html(table);
            demo.open();
            //document.getElementById('animatedModal2').style.display = 'unset';
        }, 650);
        regionPicked = true;
    } else {
        coinHeading = ('<div id="intro" onclick="pickCoin()"><img src ="' + img + '" id="step1Logo" class="centre" height="50" width="50">');
        coinHeading += ('<h3 id="step1Heading" class="centre">' + id + '</h3>');
        coinHeading += ('</div>');
        step1 = coinHeading + listOfSteps;
        demo.close();
        currentTask = 'regions';
        $('#main-body').html(step1);
        $('#step1 ol').append(stepOne);
        updateStep(currentStep);
        table = '';
        table += tableCreation(regions, table);
        allRegions = table;
        $('#projectsList').html(table);
            //document.getElementById('animatedModal2').style.display = 'unset';
    }
}

function updateRecord2(div) {
    let id2 = div.id;
    currentRegion = id2;
    currentTask = 'regions';
    pickedRegion = strongLogoSearch(regions, id2);
    let name = searchName(regions, id2);
    regionPicked = true;
    demo.close();
    $('#pickedRegion').html('<img src="' + pickedRegion +'" class="logoScale" height="150" width="150">' +
        '<h class="logoHeading">' + name + '</h>');
    console.log($('#step1 ol').length);
    updateStep(2);
    let list2 = ('<li id="#2" class="item">');
    list2 += ('<h2 class="headline"><span>Select Exchange</span></h2>' +
        '<div id="pickedRegion" onclick="pickExchange()"></div></li>');
    $('#stepList').append(list2);
}

function updateRecord3(div) {
    let id2 = div.id;
    currentTask = 'exchanges';
    pickedRegion = strongLogoSearch(regions, id2);
    let name = searchName(regions, id2);

    regionPicked = true;
    demo.close();
    $('#pickedRegion').html('<img src="' + pickedRegion +'" class="logoScale" height="150" width="150">' +
        '<h class="logoHeading">' + name + '</h>');
    $('#2').remove();
    let list2 = ('<li class="item">');
    list2 += ('<h2 class="headline"><span>Select Exchange</span></h2>' +
        '<div id="pickedRegion" onclick="pickRegion()"></div></li>');
    $('#stepList').append(list2);
}

function tableCreation(data, table) {
    table = '<ul id="projectGrid">';
    if(currentTask === 'coins') {
        for (let i = 0; i < data.length; i++) {
            table += ('<li id="' + data[i].name + '" onclick="updateRecord(this)">');
            table += ('<img src="' + data[i].logo + '" class="logoScale" height="150" width="150">');
            table += ('<h class="logoHeading">' + data[i].name + '</h>');
            table += ('</li>');
        }
    } else if(currentTask === 'regions') {
        for (let i = 0; i < data.length; i++) {
            table += ('<li id="' + data[i].name + '" onclick="updateRecord2(this)">');
            table += ('<img src="' + data[i].logo + '" class="logoScale" height="150" width="150">');
            table += ('<h class="logoHeading">' + data[i].name + '</h>');
            table += ('</li>');
        }
    } else if(currentTask === 'exchanges') {
            let j = searchName(data, currentCoin);
        for (let i = 0; i < data.length; i++) {
            if(data[i].name.toString() === currentCoin) {
                //for(let k = 0; k < data[i].regions.length; k++) {
                let iter = -1;
                    $.each(data[i].regions[parseInt(strongIdSearch(regions, currentRegion))], function (key, value) {
                        console.log(exchangeLogo);
                        for(let k = 0; k < value.length; k++)
                        {
                            iter += 1;

                            exchangeLogo = strongLogoSearch(exchanges, value[iter].toString());
                            table += ('<li id="' + value[iter].toString() + '" onclick="updateRecord3(this)">');
                            table += ('<img src="' + exchangeLogo + '" class="logoScale">');
                            table += ('<h class="logoHeading">' + value[iter].toString() + '</h>');
                            table += ('</li>');
                        }
                    });
               // }
            }
        }
    }
    table += ('</ul>');
    return table;
}

function textPicker(text) {
    if(currentTask === 'coins')
        text = 'Search by Crypto name or symbol';
    else if(currentTask === 'regions')
        text = 'Select your region';
    return text;
}

$(function() {

    //callData();
    //disableScroll();
    let tableAll = '';
    //let projectNames = [];
    //let projectNames = new Map();
    //let projectLogos = new Map();

    $.each(data[1].regions[1], function (key, value) {
        console.log();
    });


    //MODAL
    $("#card-1").on("click", function() {
        table = '';
        $('#last_name').val('').blur();
        demo.open();


        //enableScroll();
        currentTask = 'coins';

        $('#lastLabel').text(textPicker(inputText));

        document.getElementById('animatedModal').style.display = 'unset';


                    table += tableCreation(data, table);


                //projectNames.push(data.projects[i].name);
                //projectNames.set(i, data.projects[i].name);
                //projectLogos.set(data.projects[i].name, data.projects[i].logo);

        tableAll = table;
        setTimeout(function() {
            $('#projectsList').html(table);
        }, 0);

    });

    //CLOSE MODAL
    $('#closeModal').on('click', function() {
        table = '';
        //projectNames = [];
        //disableScroll();
    });

    $('.logoScale').on('click', function() {
        alert('')
    });

    //JSON DATA



    // AUTOFILL

     // "list" is the item array

    $('#last_name').keyup(function() {
        /*$('#last_name').autocomplete({
            source: projectNames
        }); */

        const bla = $('#last_name').val();
        //let finalJson = [data];
        if(currentTask === 'coins') {
            let mm = searchForLogo(data, bla);
            let name = searchName(data, bla);
            //console.log(mm[0]);
            if (bla === '') {
                $('#projectsList').html(tableAll);
            } else {
                table = '<ul id="projectGrid">';

                //let index = find(projectNames.values(), bla);

                for (let i = 0; i < name.length; i++) {
                    //table += ('<li>' + index[i] + '</li>')

                    table += ('<li id="' + name[i] + '" onclick="updateRecord(this)">');
                    table += ('<img src="' + mm[i] + '" class="logoScale" height="150" width="150">');
                    table += ('<h class="logoHeading">' + name[i] + '</h>');
                    table += ('</li>');
                    //projectNames.push(data.projects[i].name);
                }
                table += ('</ul>');
                $('#projectsList').html(table);
            }
        } else if (currentTask === 'regions') {
            let mm = searchForLogo(regions, bla);
            let name = searchName(regions, bla);
            //console.log(mm[0]);
            if (bla === '') {
                $('#projectsList').html(allRegions);
            } else {
                table = '<ul id="projectGrid">';

                //let index = find(projectNames.values(), bla);

                for (let i = 0; i < name.length; i++) {
                    //table += ('<li>' + index[i] + '</li>')

                    table += ('<li id="' + name[i] + '" onclick="updateRecord2(this)">');
                    table += ('<img src="' + mm[i] + '" class="logoScale" height="150" width="150">');
                    table += ('<h class="logoHeading">' + name[i] + '</h>');
                    table += ('</li>');
                    //projectNames.push(data.projects[i].name);
                }
                table += ('</ul>');
                $('#projectsList').html(table);
            }
        }
    });

    //SEARCH FUNCTION

    /*function searchProjects() {
        $('#projectsList').html(table);
    } */
});
