# Brackets Detect Indentation
[Brackets][Brackets] Extension to detect the indentation used in the current file and set your editor settings accordingly.

This extension is using [detect-indent][detect-indent] for the actual detection.

## Installation
### Latest Release
To install the latest _release_ of this extension use the built-in Brackets [Extension Manager][Brackets Extension Manager] which downloads the extension from the [Brackets Extension Registry][Brackets Extension Registry].

### Latest Commit
To install the latest _commit_ of this extension use the built-in Brackets [Extension Manager][Brackets Extension Manager] which has a function to `Install from URL...` using this link:
```
https://github.com/Hirse/brackets-detect-indentation/archive/master.zip
```

## Usage
This extension adds two buttons to the indentation indicator in the status bar.  
Click the `A` to toggle automatic indentation detection on file change or click the `D` to detect the indentation of the current file manually.

Use the settings `defaultSpaceUnits` and `defaultUseTabChar` to define a fallback for the case that the detection fails.
```json
{
    "hirse.detect-indentation.defaultSpaceUnits": 4,
    "hirse.detect-indentation.defaultUseTabChar": false
}
```

## License
Brackets Ungit is licensed under the [MIT license][MIT]. [detect-indent][detect-indent] itself is also licensed under the MIT license.


[Brackets]: http://brackets.io
[Brackets Extension Manager]: https://github.com/adobe/brackets/wiki/Brackets-Extensions
[Brackets Extension Registry]: https://brackets-registry.aboutweb.com
[MIT]: http://opensource.org/licenses/MIT
[detect-indent]: https://github.com/sindresorhus/detect-indent
