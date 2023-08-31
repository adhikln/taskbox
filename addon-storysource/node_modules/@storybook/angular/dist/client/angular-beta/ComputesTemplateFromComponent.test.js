"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ComputesTemplateFromComponent_1 = require("./ComputesTemplateFromComponent");
const input_component_1 = require("./__testfixtures__/input.component");
describe('angular source decorator', () => {
    it('With no props should generate simple tag', () => {
        const component = input_component_1.InputComponent;
        const props = {};
        const argTypes = {};
        const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
        expect(source).toEqual('<doc-button></doc-button>');
    });
    describe('with component without selector', () => {
        let WithoutSelectorComponent = class WithoutSelectorComponent {
        };
        WithoutSelectorComponent = __decorate([
            (0, core_1.Component)({
                template: `The content`,
            })
        ], WithoutSelectorComponent);
        it('should add component ng-container', async () => {
            const component = WithoutSelectorComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<ng-container *ngComponentOutlet="WithoutSelectorComponent"></ng-container>`);
        });
    });
    describe('with component with attribute selector', () => {
        let WithAttributeComponent = class WithAttributeComponent {
        };
        WithAttributeComponent = __decorate([
            (0, core_1.Component)({
                selector: 'doc-button[foo]',
                template: '<button></button>',
            })
        ], WithAttributeComponent);
        it('should add attribute to template', async () => {
            const component = WithAttributeComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button foo></doc-button>`);
        });
    });
    describe('with component with attribute and value selector', () => {
        let WithAttributeValueComponent = class WithAttributeValueComponent {
        };
        WithAttributeValueComponent = __decorate([
            (0, core_1.Component)({
                selector: 'doc-button[foo="bar"]',
                template: '<button></button>',
            })
        ], WithAttributeValueComponent);
        it('should add attribute to template', async () => {
            const component = WithAttributeValueComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button foo="bar"></doc-button>`);
        });
    });
    describe('with component with attribute only selector', () => {
        let WithAttributeOnlyComponent = class WithAttributeOnlyComponent {
        };
        WithAttributeOnlyComponent = __decorate([
            (0, core_1.Component)({
                selector: '[foo]',
                template: '<button></button>',
            })
        ], WithAttributeOnlyComponent);
        it('should create a div and add attribute to template', async () => {
            const component = WithAttributeOnlyComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<div foo></div>`);
        });
    });
    describe('with component with void element and attribute selector', () => {
        let VoidElementWithAttributeComponent = class VoidElementWithAttributeComponent {
        };
        VoidElementWithAttributeComponent = __decorate([
            (0, core_1.Component)({
                selector: 'input[foo]',
                template: '<button></button>',
            })
        ], VoidElementWithAttributeComponent);
        it('should create without separate closing tag', async () => {
            const component = VoidElementWithAttributeComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<input foo />`);
        });
    });
    describe('with component with attribute and value only selector', () => {
        let WithAttributeOnlyComponent = class WithAttributeOnlyComponent {
        };
        WithAttributeOnlyComponent = __decorate([
            (0, core_1.Component)({
                selector: '[foo="bar"]',
                template: '<button></button>',
            })
        ], WithAttributeOnlyComponent);
        it('should create a div and add attribute to template', async () => {
            const component = WithAttributeOnlyComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<div foo="bar"></div>`);
        });
    });
    describe('with component with void element, attribute and value only selector', () => {
        let VoidElementWithAttributeComponent = class VoidElementWithAttributeComponent {
        };
        VoidElementWithAttributeComponent = __decorate([
            (0, core_1.Component)({
                selector: 'input[foo="bar"]',
                template: '<button></button>',
            })
        ], VoidElementWithAttributeComponent);
        it('should create and add attribute to template without separate closing tag', async () => {
            const component = VoidElementWithAttributeComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<input foo="bar" />`);
        });
    });
    describe('with component with class selector', () => {
        let WithClassComponent = class WithClassComponent {
        };
        WithClassComponent = __decorate([
            (0, core_1.Component)({
                selector: 'doc-button.foo',
                template: '<button></button>',
            })
        ], WithClassComponent);
        it('should add class to template', async () => {
            const component = WithClassComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button class="foo"></doc-button>`);
        });
    });
    describe('with component with class only selector', () => {
        let WithClassComponent = class WithClassComponent {
        };
        WithClassComponent = __decorate([
            (0, core_1.Component)({
                selector: '.foo',
                template: '<button></button>',
            })
        ], WithClassComponent);
        it('should create a div and add attribute to template', async () => {
            const component = WithClassComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<div class="foo"></div>`);
        });
    });
    describe('with component with multiple selectors', () => {
        let WithMultipleSelectorsComponent = class WithMultipleSelectorsComponent {
        };
        WithMultipleSelectorsComponent = __decorate([
            (0, core_1.Component)({
                selector: 'doc-button, doc-button2',
                template: '<button></button>',
            })
        ], WithMultipleSelectorsComponent);
        it('should use the first selector', async () => {
            const component = WithMultipleSelectorsComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button></doc-button>`);
        });
    });
    describe('with component with multiple selectors starting with attribute', () => {
        let WithMultipleSelectorsComponent = class WithMultipleSelectorsComponent {
        };
        WithMultipleSelectorsComponent = __decorate([
            (0, core_1.Component)({
                selector: 'doc-button[foo], doc-button2',
                template: '<button></button>',
            })
        ], WithMultipleSelectorsComponent);
        it('should use the first selector', async () => {
            const component = WithMultipleSelectorsComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button foo></doc-button>`);
        });
    });
    describe('with component with multiple selectors starting with attribute and value', () => {
        let WithMultipleSelectorsComponent = class WithMultipleSelectorsComponent {
        };
        WithMultipleSelectorsComponent = __decorate([
            (0, core_1.Component)({
                selector: 'doc-button[foo="bar"], doc-button2',
                template: '<button></button>',
            })
        ], WithMultipleSelectorsComponent);
        it('should use the first selector', async () => {
            const component = WithMultipleSelectorsComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button foo="bar"></doc-button>`);
        });
    });
    describe('with component with multiple selectors including 2 attributes and a class', () => {
        let WithMultipleSelectorsComponent = class WithMultipleSelectorsComponent {
        };
        WithMultipleSelectorsComponent = __decorate([
            (0, core_1.Component)({
                selector: 'doc-button, button[foo], .button[foo], button[baz]',
                template: '<button></button>',
            })
        ], WithMultipleSelectorsComponent);
        it('should use the first selector', async () => {
            const component = WithMultipleSelectorsComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button></doc-button>`);
        });
    });
    describe('with component with multiple selectors with line breaks', () => {
        let WithMultipleSelectorsComponent = class WithMultipleSelectorsComponent {
        };
        WithMultipleSelectorsComponent = __decorate([
            (0, core_1.Component)({
                selector: `doc-button, 
      doc-button2`,
                template: '<button></button>',
            })
        ], WithMultipleSelectorsComponent);
        it('should use the first selector', async () => {
            const component = WithMultipleSelectorsComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button></doc-button>`);
        });
    });
    describe('with component with multiple selectors starting with attribute only with line breaks', () => {
        let WithMultipleSelectorsComponent = class WithMultipleSelectorsComponent {
        };
        WithMultipleSelectorsComponent = __decorate([
            (0, core_1.Component)({
                selector: `[foo], 
      doc-button2`,
                template: '<button></button>',
            })
        ], WithMultipleSelectorsComponent);
        it('should use the first selector', async () => {
            const component = WithMultipleSelectorsComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<div foo></div>`);
        });
    });
    describe('no argTypes', () => {
        it('should generate tag-only template with no props', () => {
            const component = input_component_1.InputComponent;
            const props = {};
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button></doc-button>`);
        });
        it('With props should generate tag with properties', () => {
            const component = input_component_1.InputComponent;
            const props = {
                isDisabled: true,
                label: 'Hello world',
                accent: input_component_1.ButtonAccent.High,
                counter: 4,
            };
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button [counter]="4" [accent]="'High'" [isDisabled]="true" [label]="'Hello world'"></doc-button>`);
        });
        it('With props should generate tag with outputs', () => {
            const component = input_component_1.InputComponent;
            const props = {
                isDisabled: true,
                label: 'Hello world',
                onClick: ($event) => { },
            };
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button [isDisabled]="true" [label]="'Hello world'" (onClick)="onClick($event)"></doc-button>`);
        });
        it('should generate correct property for overridden name for Input', () => {
            const component = input_component_1.InputComponent;
            const props = {
                color: '#ffffff',
            };
            const argTypes = {};
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button [color]="'#ffffff'"></doc-button>`);
        });
    });
    describe('with argTypes (from compodoc)', () => {
        it('Should handle enum as strongly typed enum', () => {
            const component = input_component_1.InputComponent;
            const props = {
                isDisabled: false,
                label: 'Hello world',
                accent: input_component_1.ButtonAccent.High,
            };
            const argTypes = {
                accent: {
                    control: {
                        options: ['Normal', 'High'],
                        type: 'radio',
                    },
                    defaultValue: undefined,
                    table: {
                        category: 'inputs',
                    },
                    type: {
                        name: 'enum',
                        required: true,
                        value: [],
                    },
                },
            };
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button [accent]="'High'" [isDisabled]="false" [label]="'Hello world'"></doc-button>`);
        });
        it('Should handle enum without values as string', () => {
            const component = input_component_1.InputComponent;
            const props = {
                isDisabled: false,
                label: 'Hello world',
                accent: input_component_1.ButtonAccent.High,
            };
            const argTypes = {
                accent: {
                    control: {
                        options: ['Normal', 'High'],
                        type: 'radio',
                    },
                    defaultValue: undefined,
                    table: {
                        category: 'inputs',
                    },
                    type: {
                        name: 'object',
                        required: true,
                        value: {},
                    },
                },
            };
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, argTypes);
            expect(source).toEqual(`<doc-button [accent]="'High'" [isDisabled]="false" [label]="'Hello world'"></doc-button>`);
        });
        it('Should handle objects correctly', () => {
            const component = input_component_1.InputComponent;
            const someDataObject = {
                one: 'Hello world',
                two: true,
                three: [
                    `a string literal with "double quotes"`,
                    `a string literal with 'single quotes'`,
                    'a single quoted string with "double quotes"',
                    "a double quoted string with 'single quotes'",
                    // eslint-disable-next-line prettier/prettier
                    'a single quoted string with escaped \'single quotes\'',
                    // eslint-disable-next-line prettier/prettier
                    "a double quoted string with escaped \"double quotes\"",
                    // eslint-disable-next-line no-useless-escape
                    `a string literal with \'escaped single quotes\'`,
                    // eslint-disable-next-line no-useless-escape
                    `a string literal with \"escaped double quotes\"`,
                ],
            };
            const props = {
                isDisabled: false,
                label: 'Hello world',
                someDataObject,
            };
            const source = (0, ComputesTemplateFromComponent_1.computesTemplateSourceFromComponent)(component, props, null);
            // Ideally we should stringify the object, but that could cause the story to break because of unescaped values in the JSON object.
            // This will have to do for now
            expect(source).toEqual(`<doc-button [isDisabled]="false" [label]="'Hello world'" [someDataObject]="{one: 'Hello world', two: true, three: ['a string literal with \\'double quotes\\'', 'a string literal with \\'single quotes\\'', 'a single quoted string with \\'double quotes\\'', 'a double quoted string with \\'single quotes\\'', 'a single quoted string with escaped \\'single quotes\\'', 'a double quoted string with escaped \\'double quotes\\'', 'a string literal with \\'escaped single quotes\\'', 'a string literal with \\'escaped double quotes\\'']}"></doc-button>`);
        });
    });
});
