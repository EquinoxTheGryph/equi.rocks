import type { marked } from 'marked';

/**
 * Syntax: `:iconUsername:`
 *
 * Details:
 *  - Renders an icon of the user along with the username
 */
export const markedFaUserExtension: marked.TokenizerAndRendererExtension = {
    name: 'x-fa-user-icon',
    level: 'inline',
    start: (src) => src.indexOf(':icon'),
    tokenizer(src) {
        const rule = /^:icon(?<username>\w+):/;
        const match = rule.exec(src);
        if (!match) return;
        return {
            type: 'x-fa-user-icon',
            raw: match[0],
            username: match.groups?.['username']
        };
    },
    renderer(token) {
        const username = String(token.username);
        const usernamelc = username?.toLowerCase();
        return (
            `<a href="https://furaffinity.net/user/${usernamelc}" class="x-fa-user-icon" title="${username} on FurAffinity">` +
            `<img src="https://a.furaffinity.net/${usernamelc}.gif" align="middle" ` +
            `alt="${username} on FurAffinity" width="50" height="50" style="display: inline-block; margin: 0 0.5em;"/>` +
            `${username}` +
            `</a>`
        );
    }
};
