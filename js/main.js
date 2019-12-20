//Listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {

    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    var bookmark = {
        name:siteName, 
        url: siteURL
    }

    //Local Storage
    // localStorage.setItem('test', 'HW');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));



  //  console.log(bookmark);

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

    fetchBookmarks();
    //Prevent form submission
    e.preventDefault();
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