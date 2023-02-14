import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

const foreground = "#9cdcfe",
  background = "transparent",
  invalid = "#cd3131",
  keyword = "#0000ff",
  controlFlowAndModuleKeywords = "#AF00DB",
  functions = "#795E26",
  typesAndClasses = "#267f99",
  tagNames = "#0000ff",
  operators = "#000000",
  regexes = "#811f3f",
  strings = "#a31515",
  names = "#001080",
  punctuationAndSeparators = "#0431FA",
  angleBrackets = "#800000",
  templateStringBraces = "#0431FA",
  propertyNames = "#001080",
  booleansAndAtoms = "#0000FF",
  numbersAndUnits = "#098658",
  metaAndComments = "#008000";

export const vsCodeLightPlusTheme = EditorView.theme(
  {
    "&": {
      color: foreground,
      backgroundColor: background,
    },
    ".cm-content": {
      caretColor: "black",
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
      color: "#4089A1",
      border: "none",
      borderRadius: "5px",
    },
    ".cm-gutter": {
      width: "50px",
      alignItems: "center",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent",
      color: "#2A3E81",
    },
  },
  { dark: false }
);

export const vsCodeLightPlusHighlightStyle = HighlightStyle.define([
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

export const vsCodeLightPlus: Extension = [
  vsCodeLightPlusTheme,
  syntaxHighlighting(vsCodeLightPlusHighlightStyle),
];

export const vsCodeLightPlusTerminalTheme = {
  cursor: '#333333',
  cursorAccent: '#00000000',
  foreground: "#333333",
  background: "#ffffff",
  red: "#cd3131",
  green: "#00bc00",
  yellow: "#949800",
  blue: "#0451a5",
  magenta: "#bc05bc",
  cyan: "#0598bc",
  white: "#555555",
  brightBlack: "#686868",
  brightRed: "#cd3131",
  brightGreen: "#00bc00",
  brightYellow: "#949800",
  brightBlue: "#0451a5",
  brightMagenta: "#bc05bc",
  brightCyan: "#0598bc",
  brightWhite: "#a5a5a5",
  selectionBackground: "#00000040",
};
