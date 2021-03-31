import * as path from 'path';
import { workspace, ExtensionContext, languages } from 'vscode';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';
import { DocumentSemanticTokensProvider, legend } from './semanticTokens';

let client: LanguageClient;

export function activate(context: ExtensionContext): void {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join('server', 'dist', 'server.js')
  );
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for Ansible documents
    documentSelector: [{ scheme: 'file', language: 'ansible' }],
    synchronize: {
      // Notify the server about file changes to ansible.cfg files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/ansible.cfg'),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'ansibleServer',
    'Ansible Server',
    serverOptions,
    clientOptions
  );

  context.subscriptions.push(
    languages.registerDocumentSemanticTokensProvider(
      { language: 'ansible' },
      new DocumentSemanticTokensProvider(),
      legend
    )
  );

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
