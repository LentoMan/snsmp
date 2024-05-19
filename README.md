# snsmp

This extension will open clicked media on social networking sites in a new browser tab or window for easy saving, images on X/twitter are currently supported.

The plugin can be toggled using the magnifier button added to the toolbar. When enabled, clicked images will pop out in a new tab.

# Releases

The latest version of the plugin can be installed from the [Mozilla Addons Website](https://addons.mozilla.org/en-US/firefox/addon/sns-media-popout/).


# Installation

The project is configured to use [Visual Studio Code](https://code.visualstudio.com) for development.

In addition, [Node.js](https://nodejs.org) and the web-ext package is required:

```
npm install --global web-ext
```

See the [Mozilla Extension Workshop](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) site for more information.


# Running

Open the ```.vscode/tasks.json``` file, remove or change the profile path in the args section.

Go to **Run and Debug** in the vscode toolbar, make sure the correct launch task is selected and click the **Start Debugging** button next to the dropdown.

# Publishing

Update the version number in the ```manifest.json``` file.

On windows you may first need to open a powershell with unrestricted access:
```
powershell.exe -ExecutionPolicy Unrestricted
```

Then build the extension by running the following commands:
```
cd snsmp_ff
web-ext build
```

Head over to the [Mozilla Developer Portal](https://addons.mozilla.org/sv-SE/developers/) and upload new version.
