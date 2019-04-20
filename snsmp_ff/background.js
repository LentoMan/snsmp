
browser.browserAction.onClicked.addListener(tab => {
    console.error("snsmp toggle clicked");
    browser.browserAction.setIcon({path: `icon-disabled.png`,})
    //localStorage["enabled_snsmp_download"]
});
