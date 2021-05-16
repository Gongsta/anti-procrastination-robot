document.getElementById("url-form").addEventListener("submit", blockSite);
document.getElementById("remove-ban").addEventListener("click", removeBlockedSite);

function blockSite() {
    chrome.storage.sync.get("banned_urls", result => {

        if (result.banned_urls instanceof Array) {//TODO: Check if current list of urls already contains it
            banned_urls = result.banned_urls;
        } else { 
            banned_urls = [];
        }
        banned_urls.push(document.getElementById("input-url").value);


        chrome.storage.sync.set({
            "banned_urls": banned_urls
        }, function() {})
        
    })
}

function removeBlockedSite() {

}

chrome.storage.sync.get("banned_urls", result => {
   result.banned_urls.forEach((url, index) => {
       var node = document.createElement("div");
       var p = document.createElement("p");
       p.appendChild(document.createTextNode(url));
       node.appendChild(p);
       document.getElementById("banned-urls").appendChild(node);
   })
})