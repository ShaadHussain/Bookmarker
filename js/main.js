//Listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {

    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    if (!validate(siteName, siteURL)) {
        return false;
    }

    var bookmark = {
        name:siteName, 
        url: siteURL
    }

  //Test if bookmarks is null   
  if (localStorage.getItem('bookmarks') === null) {
      var bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else {
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //THIS IS STRING   
    //Add bookmark to array
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  
    }

    //Clear form after submission
    document.getElementById('myForm').reset();

    //Necessary to update the page:
    fetchBookmarks();
    //Prevent form submission
    e.preventDefault();
}

function validate(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert("Fill in form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert("Invalid URL");
        return false;
    }

    return true;
}

function deleteBookmark(url) {
    console.log(url);

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //THIS IS STRING   

    //Looping thru bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //THIS IS STRING   

    console.log(bookmarks);

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' + name + 
                                        ' <a class="btn btn-default" target="_blank" href="'+ url + '"> Visit </a> ' +
                                         ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"> Delete </a> ' +
                                        '</h3>' +
                                        '</div>'     
    }
}   