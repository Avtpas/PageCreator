module.exports = {
    "generator": function (old, lang) {
        const langs = {
            "js": "language-javascript",
            "css": "language-css",
            "html": "language-html"
        };

        let generator = require('./generator');

        const jsb = require('js-beautify');
        old = jsb[lang](old);
        return generator.init(old, langs[lang])
    }
};
