import { Options as CoreOptions } from '@storybook/types';
import { BuilderContext } from '@angular-devkit/architect';
import { StylePreprocessorOptions } from '@angular-devkit/build-angular';
import { StyleElement } from '@angular-devkit/build-angular/src/builders/browser/schema';
export type PresetOptions = CoreOptions & {
    angularBrowserTarget?: string | null;
    angularBuilderOptions?: {
        styles?: StyleElement[];
        stylePreprocessorOptions?: StylePreprocessorOptions;
    };
    angularBuilderContext?: BuilderContext | null;
    tsConfig?: string;
};
