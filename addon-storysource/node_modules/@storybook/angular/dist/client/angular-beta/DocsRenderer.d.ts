import { AbstractRenderer } from './AbstractRenderer';
import { StoryFnAngularReturnType, Parameters } from '../types';
export declare class DocsRenderer extends AbstractRenderer {
    render(options: {
        storyFnAngular: StoryFnAngularReturnType;
        forced: boolean;
        component: any;
        parameters: Parameters;
        targetDOMNode: HTMLElement;
    }): Promise<void>;
    beforeFullRender(domNode?: HTMLElement): Promise<void>;
    afterFullRender(): Promise<void>;
}
