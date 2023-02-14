import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

const foreground = "#9cdcfe",
  background = "transparent",
  invalid = "#ff0000",
  keyword = "#569cd6",
  controlFlowAndModuleKeywords = "#c586c0",
  functions = "#dcdcaa",
  typesAndClasses = "#4ec9b0",
  tagNames = "#569cd6",
  operators = "#d4d4d4",
  regexes = "#d16969",
  strings = "#ce9178",
  names = "#9cdcfe",
  punctuationAndSeparators = "#d4d4d4",
  angleBrackets = "#808080",
  templateStringBraces = "#569cd6",
  propertyNames = "#9cdcfe",
  booleansAndAtoms = "#569cd6",
  numbersAndUnits = "#b5cea8",
  metaAndComments = "#6a9955";

export const vsCodeDarkPlusTheme = EditorView.theme(
  {
    "&": {
      color: foreground,
      backgroundColor: background,
    },
    ".cm-content": {
      caretColor: "#AEAFAD",
    },
    "&.cm-editor .cm-scroller": {
      fontSize: "12px",
      lineHeight: "1.5",
      paddingTop: "10px",
      fontFamily:
        'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
    },
    "&.cm-focused": {
      outline: "none",
    },
    ".cm-gutters": {
      backgroundColor: background,
      color: "#858585",
      border: "none",
      borderRadius: "5px",
    },
    ".cm-gutter": {
      width: "50px",
      alignItems: "center",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent",
      color: "white",
    },
  },
  { dark: true }
);

export const vsCodeDarkPlusHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: keyword },
  {
    tag: [tags.controlKeyword, tags.moduleKeyword],
    color: controlFlowAndModuleKeywords,
  },
  {
    tag: [tags.name, tags.deleted, tags.character, tags.macroName],
    color: names,
  },
  {
    tag: [tags.propertyName],
    color: propertyNames,
  },

  { tag: [tags.variableName, tags.labelName], color: names },
  {
    tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
    color: booleansAndAtoms,
  },
  { tag: [tags.definition(tags.name)], color: foreground },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace,
    ],
    color: typesAndClasses,
  },
  { tag: [tags.tagName], color: tagNames },
  {
    tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
    color: functions,
  },
  { tag: [tags.number], color: numbersAndUnits },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string),
    ],
    color: operators,
  },
  {
    tag: [tags.regexp],
    color: regexes,
  },
  {
    tag: [tags.special(tags.string)],
    color: strings,
  },
  { tag: [tags.meta, tags.comment], color: metaAndComments },
  { tag: [tags.punctuation, tags.separator], color: punctuationAndSeparators },
  { tag: [tags.angleBracket], color: angleBrackets },
  { tag: tags.special(tags.brace), color: templateStringBraces },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: metaAndComments, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: names },
  {
    tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
    color: booleansAndAtoms,
  },
  {
    tag: [tags.processingInstruction, tags.string, tags.inserted],
    color: strings,
  },
  { tag: tags.invalid, color: invalid },
]);

// export const vsCodeDarkPlus: Extension = [
export const vsCodeDarkPlus: Extension = [
  vsCodeDarkPlusTheme,
  syntaxHighlighting(vsCodeDarkPlusHighlightStyle),
];

export const vsCodeDarkPlusTerminalTheme = {
  cursor: '#eff0eb',
  cursorAccent: '#00000000',
  foreground: "#eff0eb",
  background: "#16181D",
  red: "#ff5c57",
  green: "#5af78e",
  yellow: "#f3f99d",
  blue: "#57c7ff",
  magenta: "#ff6ac1",
  cyan: "#9aedfe",
  white: "#f1f1f0",
  brightBlack: "#686868",
  brightRed: "#ff5c57",
  brightGreen: "#5af78e",
  brightYellow: "#f3f99d",
  brightBlue: "#57c7ff",
  brightMagenta: "#ff6ac1",
  brightCyan: "#9aedfe",
  brightWhite: "#f1f1f0",
  selectionBackground: "#97979b33",
};
