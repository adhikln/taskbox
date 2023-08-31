"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const NgModulesAnalyzer_1 = require("./NgModulesAnalyzer");
const FooComponent = (0, core_1.Component)({})(class {
});
const BarComponent = (0, core_1.Component)({})(class {
});
const BetaModule = (0, core_1.NgModule)({ declarations: [FooComponent] })(class {
});
const AlphaModule = (0, core_1.NgModule)({ imports: [BetaModule] })(class {
});
describe('isComponentAlreadyDeclaredInModules', () => {
    it('should return true when the component is already declared in one of modules', () => {
        expect((0, NgModulesAnalyzer_1.isComponentAlreadyDeclared)(FooComponent, [], [AlphaModule])).toEqual(true);
    });
    it('should return true if the component is in moduleDeclarations', () => {
        expect((0, NgModulesAnalyzer_1.isComponentAlreadyDeclared)(BarComponent, [BarComponent], [AlphaModule])).toEqual(true);
    });
    it('should return false if the component is not declared', () => {
        expect((0, NgModulesAnalyzer_1.isComponentAlreadyDeclared)(BarComponent, [], [AlphaModule])).toEqual(false);
    });
});
