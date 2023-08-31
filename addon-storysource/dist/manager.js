"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);

// src/manager.tsx
var import_react2 = __toESM(require("react"));
var import_manager_api2 = require("@storybook/manager-api");

// src/StoryPanel.tsx
var import_react = __toESM(require("react"));
var import_manager_api = require("@storybook/manager-api");
var import_theming = require("@storybook/theming");
var import_router = require("@storybook/router");
var import_components = require("@storybook/components");
var import_tiny_invariant = __toESM(require("tiny-invariant"));
var import_react_syntax_highlighter = require("react-syntax-highlighter");
var StyledStoryLink = (0, import_theming.styled)(import_router.Link)(
  ({ theme }) => ({
    display: "block",
    textDecoration: "none",
    borderRadius: theme.appBorderRadius,
    color: "inherit",
    "&:hover": {
      background: theme.background.hoverable,
    },
  })
);
var SelectedStoryHighlight = import_theming.styled.div(({ theme }) => ({
  background: theme.background.hoverable,
  borderRadius: theme.appBorderRadius,
}));
var StyledSyntaxHighlighter = (0, import_theming.styled)(
  import_components.SyntaxHighlighter
)(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));
var areLocationsEqual = (a, b) =>
  a.startLoc.line === b.startLoc.line &&
  a.startLoc.col === b.startLoc.col &&
  a.endLoc.line === b.endLoc.line &&
  a.endLoc.col === b.endLoc.col;
var StoryPanel = ({ api }) => {
  const story = api.getCurrentStoryData();
  const selectedStoryRef = import_react.default.useRef(null);
  const { source: loaderSource, locationsMap } = (0,
  import_manager_api.useParameter)("storySource", {});
  const { source: { originalSource: docsSource } = {} } = (0,
  import_manager_api.useParameter)("docs", {});
  const source = loaderSource || docsSource || "loading source...";
  const currentLocationIndex = locationsMap
    ? Object.keys(locationsMap).find((key) => {
        const sourceLoaderId = key.split("--");
        return story.id.endsWith(sourceLoaderId[sourceLoaderId.length - 1]);
      })
    : void 0;
  const currentLocation =
    locationsMap && currentLocationIndex
      ? locationsMap[currentLocationIndex]
      : void 0;
  import_react.default.useEffect(() => {
    if (selectedStoryRef.current) {
      selectedStoryRef.current.scrollIntoView();
    }
  }, [selectedStoryRef.current]);
  const createPart = ({ rows, stylesheet, useInlineStyles }) =>
    rows.map((node, i) =>
      (0, import_react_syntax_highlighter.createElement)({
        node,
        stylesheet,
        useInlineStyles,
        key: `code-segment${i}`,
      })
    );
  const createStoryPart = ({
    rows,
    stylesheet,
    useInlineStyles,
    location,
    id,
    refId,
  }) => {
    const first = location.startLoc.line - 1;
    const last = location.endLoc.line;
    const storyRows = rows.slice(first, last);
    const storySource = createPart({
      rows: storyRows,
      stylesheet,
      useInlineStyles,
    });
    const storyKey = `${first}-${last}`;
    if (currentLocation && areLocationsEqual(location, currentLocation)) {
      return /* @__PURE__ */ import_react.default.createElement(
        SelectedStoryHighlight,
        { key: storyKey, ref: selectedStoryRef },
        storySource
      );
    }
    return /* @__PURE__ */ import_react.default.createElement(
      StyledStoryLink,
      { to: refId ? `/story/${refId}_${id}` : `/story/${id}`, key: storyKey },
      storySource
    );
  };
  const createParts = ({ rows, stylesheet, useInlineStyles }) => {
    const parts = [];
    let lastRow = 0;
    (0, import_tiny_invariant.default)(
      locationsMap,
      "locationsMap should be defined while creating parts"
    );
    Object.keys(locationsMap).forEach((key) => {
      const location = locationsMap[key];
      const first = location.startLoc.line - 1;
      const last = location.endLoc.line;
      const { title, refId } = story;
      const sourceIdParts = key.split("--");
      const id = api.storyId(title, sourceIdParts[sourceIdParts.length - 1]);
      const start = createPart({
        rows: rows.slice(lastRow, first),
        stylesheet,
        useInlineStyles,
      });
      const storyPart = createStoryPart({
        rows,
        stylesheet,
        useInlineStyles,
        location,
        id,
        refId,
      });
      parts.push(...start);
      parts.push(storyPart);
      lastRow = last;
    });
    const lastPart = createPart({
      rows: rows.slice(lastRow),
      stylesheet,
      useInlineStyles,
    });
    parts.push(...lastPart);
    return parts;
  };
  const lineRenderer = ({ rows, stylesheet, useInlineStyles }) => {
    const myrows = rows.map(({ properties, ...rest }) => ({
      ...rest,
      properties: { className: [] },
    }));
    if (!locationsMap || !Object.keys(locationsMap).length) {
      return createPart({ rows: myrows, stylesheet, useInlineStyles });
    }
    const parts = createParts({ rows: myrows, stylesheet, useInlineStyles });
    return /* @__PURE__ */ import_react.default.createElement(
      "span",
      null,
      parts
    );
  };
  return story
    ? /* @__PURE__ */ import_react.default.createElement(
        StyledSyntaxHighlighter,
        {
          language: "jsx",
          showLineNumbers: true,
          renderer: lineRenderer,
          format: false,
          copyable: false,
          padded: true,
          wrapLongLines: true,
          lineProps: { style: { whiteSpace: "pre" } },
        },
        source
      )
    : null;
};

// src/events.ts
var ADDON_ID = "storybook/source-loader";
var PANEL_ID = `${ADDON_ID}/panel`;

// src/manager.tsx
import_manager_api2.addons.register(ADDON_ID, (api) => {
  import_manager_api2.addons.add(PANEL_ID, {
    type: import_manager_api2.types.PANEL,
    title: "lOK",
    render: ({ active }) =>
      active
        ? /* @__PURE__ */ import_react2.default.createElement(StoryPanel, {
            api,
          })
        : null,
    paramKey: "storysource",
  });
});
