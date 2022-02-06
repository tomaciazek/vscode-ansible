import * as path from 'path';
import { ExtensionContext } from 'vscode';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';
import {
  DEPRECATION_DISMISSED,
  showDeprecationNotification,
} from './deprecationNotice';

let client: LanguageClient;

export function activate(context: ExtensionContext): void {
  const serverModule = context.asAbsolutePath(
    path.join('server', 'out', 'server.js')
  );

  // server is run at port 6009 for debugging
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    // register the server for Ansible documents
    documentSelector: [{ scheme: 'file', language: 'ansible' }],
  };

  client = new LanguageClient(
    'ansibleServer',
    'Ansible Server',
    serverOptions,
    clientOptions
  );

  context.globalState.setKeysForSync([DEPRECATION_DISMISSED]);

  // start the client and the server
  client.start();

  showDeprecationNotification(context);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
