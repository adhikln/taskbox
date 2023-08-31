/// <reference types="webpack-env" />
/// <reference types="node" />
import { Addon_ClientStoryApi, Addon_Loadable } from '@storybook/types';
import { AngularRenderer } from './types';
export * from './public-types';
interface ClientApi extends Addon_ClientStoryApi<AngularRenderer['storyResult']> {
    configure(loader: Addon_Loadable, module: NodeModule): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
}
export declare const storiesOf: ClientApi['storiesOf'];
export declare const configure: ClientApi['configure'];
export declare const forceReRender: ClientApi['forceReRender'];
export declare const raw: ClientApi['raw'];
