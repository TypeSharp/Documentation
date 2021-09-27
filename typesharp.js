hljs.debugMode();

function define_typesharp(hljs) {
     const TYPESHARP_RESERVED_KEYWORDS = [
          "await",
          "async",
          "as",
          "break",
          "case",
          "catch",
          "class",
          "continue",
          "const",
          "default",
          "drop",
          "else",
          "enum",
          "extern",
          "extends",
          "false",
          "for",
          "function",
          "fn",
          "if",
          "in",
          "instanceof",
          "use",
          "var",
          "module",
          "new",
          "of",
          "return",
          "self",
          "static",
          "super",
          "switch",
          "true",
          "trait",
          "this",
          "throw",
          "type",
          "try",
          "where",
          "while",
          "abstract",
          "become",
          "do",
          "final",
          "finally",
          "typeof",
          "yield",
          "public",
          "pub",
          "protected",
          "prot",
          "private",
          "implements",
          "interface",
          "construct"
     ];

     const TYPESHARP_NUMERICS_STRICT = (() => {
          let types = ['i', 'u', 'f'];
          let final = [];
          for (let i = 0; i <= 128; i += i) {
               if (i === 0) {
                    final.push('usize', 'isize');
                    i = 8;
               }
               final.push(...types.map((v) => `${v}${i}`));
          }
          return final;
     })();

     const TYPESHARP_NUMERICS_LAZY = [
          "byte",
          "int",
          "short",
          "long",
          "float",
          "double"
     ]

     const TYPESHARP_TYPE_NUMERICS_ALL = [
          ...TYPESHARP_NUMERICS_STRICT,
          ...TYPESHARP_NUMERICS_LAZY
     ];

     const TYPESHARP_LITERALS = [
          "true",
          "false"
     ];

     const TYPESHARP_TYPES = [
          ...TYPESHARP_TYPE_NUMERICS_ALL,
          "bool",
          "string",
          "json",
          "object",
          "array"
     ]

     const TYPESHARP_BUILTINS = [
          "println",
          "drop",
          "spawn",
          "exec",
          "proc"
     ];

     const TYPESHARP_BUILTIN_VARS = [
          "this",
          "self"
     ];

     const KEYWORDS = {
          $pattern: hljs.IDENT_RE,
          keyword: TYPESHARP_RESERVED_KEYWORDS,
          literal: TYPESHARP_LITERALS,
          built_in: TYPESHARP_BUILTINS,
          type: TYPESHARP_TYPES,
          "variable.language": TYPESHARP_BUILTIN_VARS
     }
     const SUBST = {
          className: 'subst',
          begin: '\\$\\{',
          end: '\\}',
          keywords: KEYWORDS,
          contains: [] // defined later
     };

     const TEMPLATE_STRING = {
          className: 'string',
          begin: '`',
          end: '`',
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ]
     };

     const NUMBER_SUFFIX = '([ui](8|16|32|64|128|size)|f(32|64))\?';

     function source(re) {
          if (!re) return null;
          if (typeof re === "string") return re;

          return re.source;
     }

     function concat(...args) {
          const joined = args.map((x) => source(x)).join("");
          return joined;
     }

     function lookahead(re) {
          return concat('(?=', re, ')');
     }

     function noneOf(list) {
          return concat("(?!", list.join("|"), ")");
     }

     const FUNCTION_CALL = {
          match: concat(
               /\b/,
               noneOf([
                    ...TYPESHARP_BUILTINS,
                    ...TYPESHARP_RESERVED_KEYWORDS
               ]),
               hljs.IDENT_RE, lookahead(/\(/)),
          className: "title.function.call",
          relevance: 0
     };

     const FUNCTION_DEF = {
          variants: [
               {
                    begin: [
                         /fn|function/,
                         /\s+/,
                         hljs.IDENT_RE
                    ],
                    className: {
                         1: "keyword",
                         3: "title.function"
                    }
               }
          ]
     }

     const TYPE_DEF = {
          begin: [
               /type/,
               /\s+/,
               hljs.IDENT_RE
          ],
          className: {
               1: "keyword",
               3: "title.class"
          }
     }

     const VAR_DEF = {
          begin: [
               /let|const/,
               /\s+/,
               hljs.UNDERSCORE_IDENT_RE
          ],
          className: {
               1: "keyword",
               3: "variable"
          }
     }

     const NUM_CONST = {
          className: "number",
          variants: [
               {
                 begin: '\\b0b([01_]+)' + NUMBER_SUFFIX
               },
               {
                 begin: '\\b0o([0-7_]+)' + NUMBER_SUFFIX
               },
               {
                 begin: '\\b0x([A-Fa-f0-9_]+)' + NUMBER_SUFFIX
               },
               {
                 begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' +
                        NUMBER_SUFFIX
               }
          ]
     }

     const CLASS_DEF =  {
          begin: [
               /(?:trait|enum|interface|for|class|union)/,
               /\s+/,
               hljs.UNDERSCORE_IDENT_RE
          ],
          className: {
               1: "keyword",
               3: "title.class"
          }
     };

     const FOR_IN_LOOP = {
          begin: [
               /for/,
               /\s+/,
               hljs.UNDERSCORE_IDENT_RE,
               /\s+/,
               /in/
          ],
          className: {
               1: "keyword",
               3: "variable",
               5: "keyword"
          }
     };

     const SYMBOL = {
          className: 'symbol',
          begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
     };

     const COMPILER_CONTEXT = {
          begin: /#\s?compiler/,
          end: /$/,
          keywords: "compiler",
          contains: [
               {
                    className: "string",
                    begin: /([a-zA-Z]|_)+/
               }
          ]
     };

     return {
          name: "Typesharp",
          aliases: ["tss", "t#", "tsp"],
          keywords: KEYWORDS,
          contains: [
               hljs.C_BLOCK_COMMENT_MODE,
               hljs.C_LINE_COMMENT_MODE,
               hljs.QUOTE_STRING_MODE,
               hljs.APOS_STRING_MODE,
               VAR_DEF,
               TEMPLATE_STRING,
               COMPILER_CONTEXT,
               SYMBOL,
               NUM_CONST,
               FUNCTION_DEF,
               FOR_IN_LOOP,
               TYPE_DEF,
               CLASS_DEF,
               FUNCTION_CALL,
          ]
     }
};
hljs.registerLanguage("typesharp", define_typesharp)

hljs.highlightAll();