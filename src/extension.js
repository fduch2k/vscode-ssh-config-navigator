"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode_1 = require("vscode");
var ssh_config_parser_1 = require("./ssh-config-parser");
var sshConfigSelector = {
    language: 'ssh_config', scheme: '*'
};
var SSHEditorToolsProvider = /** @class */ (function () {
    function SSHEditorToolsProvider() {
    }
    SSHEditorToolsProvider.prototype.provideDocumentSymbols = function (document) {
        var rHost = /^\s*Host\s+(.+)$/i;
        var rHostName = /^\s*(?:HostName|HostKeyAlias)\s+(.+)$/i;
        var lines = document.getText().split(/\r?\n/);
        var hosts = lines.reduce(function (result, line, lineIndex) {
            var _a = rHost.exec(line) || [], hostLine = _a[1];
            var _b = rHostName.exec(line) || [], hostName = _b[1];
            if (hostLine) {
                for (var _i = 0, _c = (0, ssh_config_parser_1.getNextHost)(hostLine); _i < _c.length; _i++) {
                    var host = _c[_i];
                    var position = line.indexOf(host);
                    result.push(createSymbol(host, document, lineIndex, position));
                }
            }
            if (hostName) {
                var position = line.indexOf(hostName);
                result.push(createSymbol(hostName, document, lineIndex, position, vscode_1.SymbolKind.Constant));
            }
            return result;
        }, []);

        return hosts;
    };
    return SSHEditorToolsProvider;
}());
function createSymbol(symbolText, document, lineIndex, position, kind) {
    if (kind === void 0) { kind = vscode_1.SymbolKind.Method; }
    return new vscode_1.SymbolInformation(symbolText, kind, document.fileName, new vscode_1.Location(document.uri, new vscode_1.Range(lineIndex, position, lineIndex, position + symbolText.length)));
}
function activate(context) {
    var provider = new SSHEditorToolsProvider();
    context.subscriptions.push(vscode_1.languages.registerDocumentSymbolProvider(sshConfigSelector, provider));
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
