import { ExtensionContext, window } from 'vscode';

export const DEPRECATION_DISMISSED = 'deprecationMessage.dismissed';

export async function showDeprecationNotification(
  context: ExtensionContext
): Promise<void> {
  if (!context.globalState.get(DEPRECATION_DISMISSED, false)) {
    const choice = await window.showWarningMessage(
      'This extension has been deprecated in favor of another. See migration guide on the marketplace page.',
      'Remind me later',
      'Dismiss'
    );
    if (choice === 'Dismiss') {
      context.globalState.update(DEPRECATION_DISMISSED, true);
    }
  }
}
