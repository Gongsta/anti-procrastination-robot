document.getElementById("url-form").addEventListener("submit", addBlockedSite);

//Add a blocked site from the form
function addBlockedSite() {
    chrome.storage.sync.get("banned_urls", result => {

        if (result.banned_urls instanceof Array) { //TODO: Check if current list of urls already contains it
            banned_urls = result.banned_urls;
        } else {
            banned_urls = [];
        }
        banned_urls.push(document.getElementById("input-url").value);


        chrome.storage.sync.set({
            "banned_urls": banned_urls
        }, function () {})

    })
}

function removeBlockedSite(index) {
    chrome.storage.sync.get("banned_urls", result => {

        if (result.banned_urls instanceof Array) { //TODO: Check if current list of urls already contains it
            banned_urls = result.banned_urls;
        } else {
            banned_urls = [];
        }
        banned_urls.splice(index, 1);

        chrome.storage.sync.set({
            "banned_urls": banned_urls
        }, function () {

        })

    })
}

//TODO: Dynamically delete. Right now I have to refresh myself to see the blocked sites updated
chrome.storage.sync.get("banned_urls", result => {

    result.banned_urls.forEach((url, index) => {
        var node = document.createElement("div");
        node.setAttribute("id", index);
        // node.setAttribute("class", "url");
        var p = document.createElement("p");
        var deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("Remove"));
        deleteButton.setAttribute("class", "delete-button");
        p.appendChild(document.createTextNode(url));
        node.appendChild(p);
        node.appendChild(deleteButton);
        document.getElementById("banned-urls").appendChild(node);
    });

    //Listen for Clicks on the div
    var urls = document.getElementsByClassName("delete-button");
    for (var i = 0; i < urls.length; i++) {
        urls[i].addEventListener('click', function (event) {
            removeBlockedSite(event.target.parentNode.id)
        });
    }
})