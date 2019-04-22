'use strict'

var OptionsProvider = { };

OptionsProvider.onError = function(error) {
    console.error(`Error: ${error}`);
}

OptionsProvider.loadOptions = async function() {
    let retrieveOptions = browser.storage.local.get({
        options: {
            popoutEnabled: true
        }
    })
    
    let storageItems = await retrieveOptions;
    OptionsProvider.options = storageItems.options;
};

OptionsProvider.saveOptions = async function() {
    let options = OptionsProvider.options;
    await browser.storage.local.set({ options });
    console.log("Settings saved");
}

browser.runtime.onMessage.addListener(async request => {
    if(request.hasOwnProperty('reloadOptions') && request.reloadOptions == true) {
        OptionsProvider.loadOptions();
    }
    
    return Promise.resolve({ response: "Options reloaded" });
});
