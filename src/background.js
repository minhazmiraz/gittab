console.log('Hello Background');
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    console.log(details);
    chrome.tabs.query({ currentWindow: true, active: true }, (tabArray) => {
        chrome.tabs.sendMessage( tabArray[0].id, {
                message: 'hello!',
                details
            })
        }
    );
});