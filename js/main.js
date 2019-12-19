//Listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {

    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;
    console.log(siteName);  

    var bookmark = {
        name:siteName, 
        url: siteURL
    }

    //Local Storage

    localStorage.setItem('test', 'HW');
    console.log(localStorage.getItem('test'));

    console.log(bookmark);
    //Prevent form submission
    e.preventDefault();
}