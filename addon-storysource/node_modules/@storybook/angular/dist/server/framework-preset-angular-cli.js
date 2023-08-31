"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationToBuilderReferrenceMessage = exports.webpackFinal = void 0;
const node_logger_1 = require("@storybook/node-logger");
const architect_1 = require("@angular-devkit/architect");
const find_up_1 = require("find-up");
const ts_dedent_1 = require("ts-dedent");
const core_1 = require("@angular-devkit/core");
const angular_cli_webpack_1 = require("./angular-cli-webpack");
const module_is_available_1 = require("./utils/module-is-available");
async function webpackFinal(baseConfig, options) {
    if (!(0, module_is_available_1.moduleIsAvailable)('@angular-devkit/build-angular')) {
        node_logger_1.logger.info('=> Using base config because "@angular-devkit/build-angular" is not installed');
        return baseConfig;
    }
    checkForLegacyBuildOptions(options);
    const builderContext = getBuilderContext(options);
    const builderOptions = await getBuilderOptions(options, builderContext);
    return (0, angular_cli_webpack_1.getWebpackConfig)(baseConfig, {
        builderOptions: {
            watch: options.configType === 'DEVELOPMENT',
            ...builderOptions,
        },
        builderContext,
    });
}
exports.webpackFinal = webpackFinal;
/**
 * Get Builder Context
 * If storybook is not start by angular builder create dumb BuilderContext
 */
function getBuilderContext(options) {
    return (options.angularBuilderContext ??
        {
            target: { project: 'noop-project', builder: '', options: {} },
            workspaceRoot: process.cwd(),
            getProjectMetadata: () => ({}),
            getTargetOptions: () => ({}),
            logger: new core_1.logging.Logger('Storybook'),
        });
}
/**
 * Get builder options
 * Merge target options from browser target and from storybook options
 */
async function getBuilderOptions(options, builderContext) {
    /**
     * Get Browser Target options
     */
    let browserTargetOptions = {};
    if (options.angularBrowserTarget) {
        const browserTarget = (0, architect_1.targetFromTargetString)(options.angularBrowserTarget);
        node_logger_1.logger.info(`=> Using angular browser target options from "${browserTarget.project}:${browserTarget.target}${browserTarget.configuration ? `:${browserTarget.configuration}` : ''}"`);
        browserTargetOptions = await builderContext.getTargetOptions(browserTarget);
    }
    /**
     * Merge target options from browser target options and from storybook options
     */
    const builderOptions = {
        ...browserTargetOptions,
        ...options.angularBuilderOptions,
        tsConfig: options.tsConfig ??
            (0, find_up_1.sync)('tsconfig.json', { cwd: options.configDir }) ??
            browserTargetOptions.tsConfig,
    };
    node_logger_1.logger.info(`=> Using angular project with "tsConfig:${builderOptions.tsConfig}"`);
    return builderOptions;
}
exports.migrationToBuilderReferrenceMessage = (0, ts_dedent_1.dedent) `Your Storybook startup uses a solution that is not supported.
    You must use angular builder to have an explicit configuration on the project used in angular.json
    Read more at:
    - https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#sb-angular-builder)
    - https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#angular13)
  `;
/**
 * Checks if using legacy configuration that doesn't use builder and logs message referring to migration docs.
 */
function checkForLegacyBuildOptions(options) {
    if (options.angularBrowserTarget !== undefined) {
        // Not use legacy way with builder (`angularBrowserTarget` is defined or null with builder and undefined without)
        return;
    }
    node_logger_1.logger.error(exports.migrationToBuilderReferrenceMessage);
    throw Error('angularBrowserTarget is undefined.');
}
