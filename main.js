define(function (require, exports, module) {
    "use strict";

    /* beautify preserve:start *//* eslint-disable no-multi-spaces */
    var DocumentManager    = brackets.getModule("document/DocumentManager");
    var Editor             = brackets.getModule("editor/Editor").Editor;
    var EditorManager      = brackets.getModule("editor/EditorManager");
    var PreferencesManager = brackets.getModule("preferences/PreferencesManager");
    var ExtensionUtils     = brackets.getModule("utils/ExtensionUtils");
    var NodeDomain         = brackets.getModule("utils/NodeDomain");

    var Strings            = require("strings");
    /* eslint-enable no-multi-spaces *//* beautify preserve:end */

    var PREFIX = "hirse.detect-indentation";
    var prefs = PreferencesManager.getExtensionPrefs(PREFIX);
    var nodeDomain = new NodeDomain("hirseDetectIndentation", ExtensionUtils.getModulePath(module, "domain"));

    ExtensionUtils.loadStyleSheet(module, "styles/styles.css");

    /**
     * Toggle the automatic detection.
     * Save the preference depending on the context and update the auto-indicator.
     * If it is turned on, detect the current indentation.
     */
    function toggleAutomaticDetection() {
        var doc = DocumentManager.getCurrentDocument();
        var context = PreferencesManager._buildContext(doc.file.fullPath, doc.getLanguage().getId());
        var newAutoState = !prefs.get("auto", context);
        prefs.set("auto", newAutoState);
        $autoIndicator.toggleClass("active", newAutoState);
        if (newAutoState) {
            _detectIndentation(doc.getText());
        }
    }

    /**
     * Reset the indentation to the default defined as preferences.
     * Hide the reset-indicator and show the detect-indicator
     */
    function resetIndentation() {
        var doc = DocumentManager.getCurrentDocument();
        var context = PreferencesManager._buildContext(doc.file.fullPath, doc.getLanguage().getId());
        Editor.setSpaceUnits(prefs.get("defaultSpaceUnits", context));
        Editor.setUseTabChar(prefs.get("defaultUseTabChar", context));
        $detectIndicator.removeClass("hidden");
        $resetIndicator.addClass("hidden");
    }

    /**
     * Get the text of the current document, detect the indentation and set the editor settings.
     */
    function detectIndentation() {
        var text = DocumentManager.getCurrentDocument().getText();
        _detectIndentation(text);
    }

    /**
     * Handle activeEditorChange in case there is an Editor gaining focus.
     * Perform the detection and set the auto-indicator style according to preferences.
     * @param {Editor} editor The new Editor.
     */
    function onNewEditor(editor) {
        var doc = editor.document;
        var context = PreferencesManager._buildContext(doc.file.fullPath, doc.getLanguage().getId());
        if (prefs.get("auto", context)) {
            _detectIndentation(doc.getText());
            $autoIndicator.addClass("active");
        } else {
            $autoIndicator.removeClass("active");
        }
    }

    /**
     * Actually do the detection.
     * Uses the nodeDomain with the text to get an object of indentation settings.
     * @param {string} text The text of the current Document.
     */
    function _detectIndentation(text) {
        nodeDomain.exec("detectIndentation", text).done(function (indent) {
            if (indent.type) {
                if (indent.type === "tab") {
                    Editor.setUseTabChar(true);
                } else if (indent.type === "space") {
                    Editor.setUseTabChar(false);
                    Editor.setSpaceUnits(indent.amount);
                }
                $detectIndicator.addClass("hidden");
                $resetIndicator.removeClass("hidden");
            } else {
                resetIndentation();
                $detectIndicator.addClass("disabled");
            }
        });
    }

    prefs.definePreference("auto", "boolean", true, {
        name: Strings.PREF_AUTO_NAME,
        description: Strings.PREF_AUTO_DESC
    });

    prefs.definePreference("defaultSpaceUnits", "number", 4, {
        name: Strings.PREF_SPACES_NAME,
        description: Strings.PREF_SPACES_DESC
    });

    prefs.definePreference("defaultUseTabChar", "boolean", false, {
        name: Strings.PREF_TAB_NAME,
        description: Strings.PREF_TAB_DESC
    });

    var $autoIndicator = $(document.createElement("div"))
        .attr("id", "hirse-detect-indentation-auto")
        .addClass("hirse-detect-indentation-indicator hirse-detect-indentation-auto")
        .text(Strings.AUTOMATIC_ABBR)
        .prop("title", Strings.AUTOMATIC_ABBR_TOOLTIP)
        .click(toggleAutomaticDetection);

    var $detectIndicator = $(document.createElement("div"))
        .attr("id", "hirse-detect-indentation-detect")
        .addClass("hirse-detect-indentation-indicator hirse-detect-indentation-detect")
        .text(Strings.DETECT_ABBR)
        .prop("title", Strings.DETECT_ABBR_TOOLTIP)
        .click(detectIndentation);

    var $resetIndicator = $(document.createElement("div"))
        .attr("id", "hirse-detect-indentation-reset")
        .addClass("hirse-detect-indentation-indicator hirse-detect-indentation-reset hidden")
        .text(Strings.RESET_ABBR)
        .prop("title", Strings.RESET_ABBR_TOOLTIP)
        .click(resetIndentation);

    $("#status-indent").append($autoIndicator, $detectIndicator, $resetIndicator);

    EditorManager.on("activeEditorChange", function (e, editorGainingFocus) {
        if (editorGainingFocus) {
            onNewEditor(editorGainingFocus);
        }
    });
});
