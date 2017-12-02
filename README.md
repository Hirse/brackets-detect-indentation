[![npm Version](https://img.shields.io/npm/v/hirse.brackets-detect-indentation.svg)](https://www.npmjs.com/package/hirse.brackets-detect-indentation)
[![Brackets Extension Registry Version](https://badges.ml/hirese.brackets-detect-indentation/version.svg)](https://brackets-extension-badges.github.io#hirese.brackets-detect-indentation)
[![Brackets Extension Registry Downloads](https://badges.ml/hirese.brackets-detect-indentation/total.svg)](https://brackets-extension-badges.github.io#hirese.brackets-detect-indentation)

[![Build Status](https://travis-ci.org/Hirse/brackets-detect-indentation.svg?branch=master)](https://travis-ci.org/Hirse/brackets-detect-indentation)
[![Greenkeeper](https://badges.greenkeeper.io/Hirse/brackets-detect-indentation.svg)](https://greenkeeper.io/)

<a href="http://brackets.io/"><img src="https://raw.githubusercontent.com/Hirse/brackets-ungit/master/images/brackets.png" alt="Brackets" align="left" /></a>

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

### Brackets npm Registry
The latest _release_ of this extension is also available on the [Brackets npm Registry][Brackets npm Registry].

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
Brackets Detect Indentation is licensed under the [MIT license][MIT].  
[detect-indent][detect-indent] itself is also licensed under the [MIT license][MIT].


[Brackets]: http://brackets.io
[Brackets Extension Manager]: https://github.com/adobe/brackets/wiki/Brackets-Extensions
[Brackets Extension Registry]: https://registry.brackets.io
[Brackets npm Registry]: https://github.com/zaggino/brackets-npm-registry
[MIT]: https://opensource.org/licenses/MIT
[detect-indent]: https://github.com/sindresorhus/detect-indent
