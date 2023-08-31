import { PartialStoryFn } from '@storybook/types';
import { StoryContext, AngularRenderer } from '../types';
export declare const skipSourceRender: (context: StoryContext) => any;
/**
 * Angular source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */
export declare const sourceDecorator: (storyFn: PartialStoryFn<AngularRenderer>, context: StoryContext) => import("../types").StoryFnAngularReturnType;
