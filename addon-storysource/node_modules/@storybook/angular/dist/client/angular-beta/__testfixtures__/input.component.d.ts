import { EventEmitter } from '@angular/core';
export declare const exportedConstant = "An exported constant";
export declare enum ButtonAccent {
    'Normal' = "Normal",
    'High' = "High"
}
export interface ISomeInterface {
    one: string;
    two: boolean;
    three: any[];
}
export declare class InputComponent<T> {
    /** Appearance style of the button. */
    appearance: 'primary' | 'secondary';
    counter: number;
    /** Specify the accent-type of the button */
    accent: ButtonAccent;
    /** To test source-generation with overridden propertyname */
    foregroundColor: string;
    /** Sets the button to a disabled state. */
    isDisabled: boolean;
    label: string;
    /** Specifies some arbitrary object */
    someDataObject: ISomeInterface;
    onClick: EventEmitter<Event>;
}
