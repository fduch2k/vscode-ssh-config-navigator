import {
    workspace,
    window,
    commands,
    SymbolInformation,
    Uri
} from 'vscode';
import path from 'path';


function getPathForFixture(fileName: string): string {
    return path.join(__dirname, '..', '__fixtures__', fileName);
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

describe('symbol information', () => {
    it('should returns correct list of symbols from document', async () => {
        const docUri = Uri.file(getPathForFixture('config'));
        const document = await workspace.openTextDocument(docUri);
        await window.showTextDocument(document);

        await sleep(10000);

        const symbols = (await commands.executeCommand(
            'vscode.executeDocumentSymbolProvider',
            docUri,
        )) as SymbolInformation[];

        expect(symbols).not.toBe(undefined);
        expect(Array.isArray(symbols)).toBe(true);
        expect(symbols.length).toBe(24); // 10 HostNames and 14 Hosts
    }, 11000);
});
