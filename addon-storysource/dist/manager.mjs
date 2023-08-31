import { ADDON_ID, PANEL_ID } from "./chunk-OUCNGSBQ.mjs";
import React from "react";
import { addons, types, useParameter } from "@storybook/manager-api";
import { styled } from "@storybook/theming";
import { Link } from "@storybook/router";
import { SyntaxHighlighter } from "@storybook/components";
import invariant from "tiny-invariant";
import { createElement } from "react-syntax-highlighter";
import { AngularCompiler } from "@storybook/angular";

const StyledStoryLink = styled(Link)(({ theme }) => ({
  display: "block",
  textDecoration: "none",
  borderRadius: theme.appBorderRadius,
  color: "inherit",
  "&:hover": {
    background: theme.background.hoverable,
  },
}));
const SelectedStoryHighlight = styled.div(({ theme }) => ({
  background: theme.background.hoverable,
  borderRadius: theme.appBorderRadius,
}));
const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));
const areLocationsEqual = (a, b) =>
  a.startLoc.line === b.startLoc.line &&
  a.startLoc.col === b.startLoc.col &&
  a.endLoc.line === b.endLoc.line &&
  a.endLoc.col === b.endLoc.col;
var StoryPanel = ({ api }) => {
  const story = api.getCurrentStoryData();
  const selectedStoryRef = React.useRef(null);
  const { source: loaderSource, locationsMap } = useParameter(
    "storySource",
    {}
  );
  const { source: { originalSource: docsSource } = {} } = useParameter(
    "docs",
    {}
  );
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
  React.useEffect(() => {
    if (selectedStoryRef.current) {
      selectedStoryRef.current.scrollIntoView();
    }
  }, [selectedStoryRef.current]);
  const createPart = ({ rows, stylesheet, useInlineStyles }) =>
    rows.map((node, i) =>
      createElement({
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
    const storyComponent = AngularCompiler.compile(storySource);
    const storyKey = `<span class="math-inline">\{first\}\-</span>{last}`;
    if (currentLocation && areLocationsEqual(location, currentLocation)) {
      return /* @__PURE__ */ React.createElement(
        SelectedStoryHighlight,
        { key: storyKey, ref: selectedStoryRef },
        storyComponent
      );
    }
    return /* @__PURE__ */ React.createElement(
      StyledStoryLink,
      {
        to: refId
          ? `/story/<span class="math-inline">\{refId\}\_</span>{id}`
          : `/story/${id}`,
        key: storyKey,
      },
      storyComponent
    );
  };
  const createParts = ({ rows, stylesheet, useInlineStyles }) => {
    const parts = [];
    let lastRow = 0;
    invariant(
      locationsMap,
      "locationsMap should be defined while creating parts"
    );
    // Rest of your createParts function logic here...
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
    const renderedComponents = parts.map(({ node }) => {
      const component = AngularCompiler.compile(node);
      return /* @__PURE__ */ React.createElement(
        "span",
        null,
        renderedComponents
      );
    });
  };
  return story
    ? /* @__PURE__ */ React.createElement(
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

// src/manager.tsx
addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "LOK",
    render: ({ active }) =>
      active ? /* @__PURE__ */ React.createElement(StoryPanel, { api }) : null,
    paramKey: "storysource",
  });
});
