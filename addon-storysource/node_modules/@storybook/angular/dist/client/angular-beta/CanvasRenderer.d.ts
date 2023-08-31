import { AbstractRenderer } from './AbstractRenderer';
import { StoryFnAngularReturnType, Parameters } from '../types';
export declare class CanvasRenderer extends AbstractRenderer {
    render(options: {
        storyFnAngular: StoryFnAngularReturnType;
        forced: boolean;
        parameters: Parameters;
        component: any;
        targetDOMNode: HTMLElement;
    }): Promise<void>;
    beforeFullRender(): Promise<void>;
    afterFullRender(): Promise<void>;
}
