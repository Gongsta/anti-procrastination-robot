//Onboarding Tab
chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: 'onboarding.html'
        });
    }
});

//Runs everytime a chrome tab is being updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    chrome.tabs.get(tabId, current_tab_info => {
        chrome.storage.sync.get("banned_urls", result => { //Get current banned urls
            console.log(result.banned_urls)
            if (result.banned_urls instanceof Array) { //Only run the code below if banned_urls exists as an array
                result.banned_urls.forEach((url, index) => {
                
                    //Check if currently entered tab url is banned
                    if (current_tab_info.url.includes(url)) {
                        chrome.tabs.update(tabId, {
                            url: "blocked.html"
                        })

                        fetch('http://192.168.0.130:5000/request').then(function (response) {
                            return response;
                          })
                    
                    
                    }
                })
            }


        })
    })
});