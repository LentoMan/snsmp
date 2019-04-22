'use strict'

var BackgroundManager = { };

BackgroundManager.onError = function(error) {
    console.error(`Error: ${error}`);
}

BackgroundManager.togglePopoutEnabled = function() {
    OptionsProvider.options.popoutEnabled = !OptionsProvider.options.popoutEnabled;
    OptionsProvider.saveOptions();
    BackgroundManager.updateEnabledIcon();

    browser.tabs
        .query({})
        .then(BackgroundManager.broadcastReloadOptionsMessage, BackgroundManager.onError);
}

BackgroundManager.updateEnabledIcon = function() {
    let iconName = (OptionsProvider.options.popoutEnabled ? `icon-enabled.png` :  `icon-disabled.png`);
    browser.browserAction.setIcon({ path: iconName });
}

BackgroundManager.broadcastReloadOptionsMessage = function(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, { reloadOptions: true })
        .then(response => { console.log(response.response); })
        .catch(BackgroundManager.onError);
    }
}

browser.browserAction.onClicked.addListener(tab => {
    console.log("Toggle button clicked");
    BackgroundManager.togglePopoutEnabled();
});

OptionsProvider.loadOptions().then(() => { BackgroundManager.updateEnabledIcon() });
