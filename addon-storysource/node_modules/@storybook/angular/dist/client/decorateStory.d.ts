import { DecoratorFunction, LegacyStoryFn } from '@storybook/types';
import { AngularRenderer } from './types';
export default function decorateStory(mainStoryFn: LegacyStoryFn<AngularRenderer>, decorators: DecoratorFunction<AngularRenderer>[]): LegacyStoryFn<AngularRenderer>;
export { decorateStory };
