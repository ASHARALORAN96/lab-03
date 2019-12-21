'use strict';

function Image(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  Image.all.push(this);
}
let keywords = [];
Image.all = [];

Image.prototype.render = function () {
  let templateId = '#showtemplate';
  let template = $(templateId).html();
  let templateRender = Handlebars.compile(template);
  let showType = templateRender(this);
  $('#photo-template').append(showType);
  // let showType = $(`
  // <li>
  //   <h2></h2>
  //   <img/>
  //   <p></p>
  // </li>
  // `).clone();
  // showType.find('h2').text(this.title);
  // showType.find('img').attr('src', this.image_url);
  // showType.find('p').text(this.description);
  // showType.addClass(this.keyword);
};
Image.prototype.filterKeword = function () {
// google ( how to check if something is already in array js)
//2 try to find if keyword is in the array "keywords"
//3 if not we should push (keywords will have unique keywords)
  if (!(keywords.includes(this.keyword))) {
    //4 we need to put them in the select new function
    keywords.push(this.keyword);
    // 5 loop through the keywords append to dropdown
    $('#dropdown1').append(`<option value='${this.keyword}'>` + this.keyword + '</option>');
  }
};
// Image.prototype.handlerFunction =
$('#dropdown1').on('change', (val) => {
  let selectedVal = val.target.value;
  //console.log(selectedVal);
  if (selectedVal === 'default') {
    $('li').show();
  } else {
    // $('li').hide();
    $('li').hide();
    $(`.${selectedVal}`).fadeIn(200);
  }
});

$(document).ready(function () {
  show();
});


// $.get('data/page-1.json')
// .then(data => {
//     data.forEach(element => {
//         let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
//         newImage.filterKeword();
//         newImage.render();
//     });
// });




function show() {
// keywords =[];

$('#photo-template').html('');
$.get('data/page-1.json')
.then(data => {
    data.forEach(element => {
        let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
        newImage.filterKeword();
        newImage.render();
        // newImage.sort();
});
});
}
$('#page1').on('click', show);



function showTwo() {
  keywords =[];
  $('#dropdown1').append('<option value= "defult">Filter by keyword</option>');
  $('#photo-template').html('');
  $.get('data/page-2.json')
    .then(data => {
      data.forEach(element => {
        let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
        newImage.filterKeword();
        newImage.render();
        // newImage.sort();
      });
    });
}
$('#page2').on('click', showTwo);


function sortTitle() {
  $('#photo-template').html('');
  Image.all = [];
  Image.all.sort(function (a, b) {
    var titleOne = a.title;
    var titleTwo = b.title;
    if (titleOne < titleTwo) {
      return -1;
    }
    if (titleTwo < titleOne) {
      return 1;
    }
    return 0;
  });
  newImage.render();
}

function sortHorns() {
  Image.all = [];
  $('#photo-template').html('');
  Image.all.sort(function (a, b) {
    var hornOne = a.horns;
    var hornTwo = b.horns;
    if (hornOne < hornTwo) {
      return -1;
    }
    if (hornTwo < hornOne) {
      return 1;
    }
    return 0;
  });
  newImage.render();
}
$('#sortTitle').on('click', sortTitle);
$('#sortHorn').on('click', sortHorns);







