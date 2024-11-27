// global values
var list = JSON.parse(localStorage.getItem('bookmark_list')) || []; 
var site_name;
var site_url;

// to get the elements by id "my_search to avoid null&&undefind" 
window.onload = function() {
    site_name = document.getElementById('bookmark_name');
    site_url = document.getElementById('bookmark_url');
    display();
};

//valdiate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){

    alert('Please use a valid URL');
    return false;
    }
    
    return true;
}

//add http
function add_http(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

// to add inputs in site
function add_site() {
    if (!validateForm(site_name.value,site_url.value)) {
        return;
    }
    var desc = {
        d_name: site_name.value,
        d_url: add_http(site_url.value)
    };
    
    list.push(desc);
    
    localStorage.setItem('bookmark_list', JSON.stringify(list));
    clear();
    display();
    
}


// to reset the function 
function clear() {
    site_name.value = null;
    site_url.value = null;
}


// to display the inputs in the table
function display() {
    var container = '';
    for (var i = 0; i < list.length; i++) {
        container += `<tr>
            <td>${i + 1}</td>
            <td>${list[i].d_name}</td>
            <td>
                <button class="btn-v w-25 rounded-3 p-1" onclick="viewSite(${i})"><i class="fa-regular fa-eye"></i></button>
            </td>
            <td>
                <button class="btn-d w-25 rounded-3 p-1" onclick="deleteSite(${i})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;
    }
    document.getElementById('tableContent').innerHTML = container;
}


// view site 
function viewSite(index) {
    window.open(list[index].d_url, '_blank'); //target in the blank page
}


// delete site
function deleteSite(index) {
    list.splice(index, 1); // delete from the table
    localStorage.setItem('bookmark_list', JSON.stringify(list)); // delete from the local_storage
    display(); // display code after delete 
}

