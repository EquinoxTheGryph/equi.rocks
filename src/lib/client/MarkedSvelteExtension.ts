import type { marked } from 'marked';

/**
 * Syntax: `{!component;param1;param2=value;...}`
 *
 * Details:
 *  - Select the component with `component`
 *  - Add parameters by seperating them by a `;`
 *  - Just adding a name will make its value `true` (see `param1`)
 *  - Setting the value is possible (see `param2`)
 *  - You can escape `;` with `\;`
 *  - Escaping `}` isn't possible for now
 *      (until safari gets globally updated for lookbehind support)
 */
export const markedSvelteExtensionInline: marked.TokenizerAndRendererExtension = {
    name: 'x-svelte-inline',
    level: 'inline',
    start: (src) => src.indexOf('{!'),
    tokenizer(src) {
        const rule =
            /^\{!(?<component>[a-z][0-9a-z\-_]*)(; *[a-z][0-9a-z\-_]* *(= *([^;\n\v]|\\;)+)?)*;?\}/;
        const match = rule.exec(src);
        if (!match) return;

        const paramList = new Map<string, string | true>(
            // prettier-ignore
            match[0]
                .replace(/^\{!\w*;?/, "")   // Remove `{!text;`
                .replace(/\}$/, "")         // Remove `}`
                .replace(/\\;/g, "&#59:")   // Escape `\;` (non-standard way)
                .replace(/\\n/g, "\n")      // Unescape `\n` to newline
                .split(";")                 // Split by `;`
                .map<[string, string | true]>((input) => {
                    // Extract key
                    const key = /^\w+/.exec(input.trim())?.[0]

                    // Extract value
                    // prettier-ignore
                    const value = /=.*$/.exec(input.trim())
                        ?.[0]
                        .replace(/^ *= */,"")   // Remove spaces around `=`
                        .replace(/&#59:/g, ';') // Unescape `;`                    

                    // Return key and value (defaults to true if key is set)
                    return [key ?? "", value ?? true]
                })
                .filter(value => !!value[0]) // Filter out empty keys
        );

        return {
            type: 'x-svelte-inline',
            raw: match[0],
            paramList,
            component: match.groups?.['component']
        };
    },
    renderer(token) {
        let out = '<span class="sv-component" data-component="';
        out += token.component;
        out += '"';

        (token.paramList as Map<string, string | true>).forEach((value, key) => {
            out += ' data-prop-';
            out += key;
            if (value !== true) {
                out += '="';
                out += value;
                out += '"';
            }
        });

        out += '></span>';

        return out;
    }
};
