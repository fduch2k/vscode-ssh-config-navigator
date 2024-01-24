// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, languages, TextDocument, DocumentSelector, SymbolInformation, SymbolKind, Location, Range, DocumentSymbolProvider, HoverProvider, ProviderResult } from 'vscode';
import { getNextHost } from './ssh-config-parser';

const sshConfigSelector: DocumentSelector = {
    language: 'ssh_config', scheme: '*'
};

class SSHEditorToolsProvider implements DocumentSymbolProvider {
    public provideDocumentSymbols(document: TextDocument): ProviderResult<SymbolInformation[]> {
        const rHost = /^\s*Host\s+(.+)$/i;
        const rHostName = /^\s*(?:HostName|HostKeyAlias)\s+(.+)$/i;
        const lines = document.getText().split(/\r?\n/);

        const hosts = lines.reduce<SymbolInformation[]>((result, line, lineIndex) => {
            const [, hostLine] = rHost.exec(line) || [];
            const [, hostName] = rHostName.exec(line) || [];
            if (hostLine) {
                for (let host of getNextHost(hostLine)) {
                    const position = line.indexOf(host);
                    result.push(createSymbol(host, document, lineIndex, position));
                }
            }
            if (hostName) {
                const position = line.indexOf(hostName);
                result.push(createSymbol(hostName, document, lineIndex, position, SymbolKind.Constant));
            }
            return result;
        }, []);

        return hosts;
    }
}

function createSymbol(symbolText: string, document: TextDocument, lineIndex: number, position: number, kind: SymbolKind = SymbolKind.Method): SymbolInformation {
    return new SymbolInformation(
        symbolText,
        kind,
        document.fileName,
        new Location(
            document.uri,
            new Range(
                lineIndex,
                position,
                lineIndex,
                position + symbolText.length
            )
        )
    );
}

export function activate(context: ExtensionContext) {
    const provider = new SSHEditorToolsProvider();
    context.subscriptions.push(languages.registerDocumentSymbolProvider(sshConfigSelector, provider));
}

export function deactivate() {
}
