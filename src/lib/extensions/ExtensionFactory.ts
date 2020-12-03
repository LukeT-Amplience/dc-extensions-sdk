import { EXTENSION } from '../Errors';
import { isContentFieldContextObject } from './content-field/ContentFieldContextObject';
import { ContentFieldExtension } from './content-field/ContentFieldExtension';
import { isDashboardContextObject } from './dashboard/DashboardContextObject';
import { DashboardExtension } from './dashboard/DashboardExtension';
import { Extension, ExtensionOptions } from './Extension';

export function extensionFactory<ExtensionType extends Extension<{}>>(
  context: unknown,
  options: ExtensionOptions
): ExtensionType {
  let extension;

  if (isContentFieldContextObject(context)) {
    extension = new ContentFieldExtension<ExtensionType>(options);
    extension.setupContext(context);
  }
  if (isDashboardContextObject(context)) {
    extension = new DashboardExtension<ExtensionType>(options);
    extension.setupContext(context);
  }
  if (!extension) {
    throw new Error(EXTENSION.UNSUPPORTED_EXTENSION);
  }

  return (extension as unknown) as ExtensionType;
}
