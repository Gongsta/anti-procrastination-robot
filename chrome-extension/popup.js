document.getElementById("block-current-site").addEventListener("click", blockCurrentSite);

function blockCurrentSite() {
    chrome.storage.sync.get("banned_urls", result => {

        getCurrentTab().then(tab => {
            if (result.banned_urls instanceof Array) {//TODO: Check if current list of urls already contains it
                banned_urls = result.banned_urls;
            } else { 
                banned_urls = [];
            }
            banned_urls.push(tab.url);

            chrome.storage.sync.set({
                "banned_urls": banned_urls
            }, function() {})
        })
    })
}


async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }