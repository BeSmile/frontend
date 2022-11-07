module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    plugins: ['stylelint-less'],
    rules: {
        /**
         * 类选择器匹配规则
         *
         * @example
         * 小驼峰: camelCase
         * ant-*: ant-xxx
         * w-*: w-xxx
         * DraftEditor-*： DraftEditor-xxx
         */
        'selector-class-pattern':
            '^([a-z][a-zA-Z0-9]+)|(((ant)|w)(-[a-z0-9]+)*)|((DraftEditor)(-[a-zA-Z0-9]+)*)$',
        'color-function-notation': 'legacy',
        /**
         * css 值都用小写
         */
        'value-keyword-case': [
            'lower',
            {
                ignoreKeywords: ['currentColor']
            }
        ],
        'import-notation': 'string',
        /**
         * 支持 [icss](https://github.com/css-modules/icss)
         */
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global', 'export']
            }
        ],
        'function-no-unknown': [
            true,
            {
                ignoreFunctions: ['fade', 'darken']
            }
        ],
        'property-no-vendor-prefix': [true, { ignoreProperties: ['box', 'line-clamp'] }],
        'value-no-vendor-prefix': [true, { ignoreValues: ['box', 'line-clamp'] }],
        'no-descending-specificity': null
    },
    overrides: [
        {
            files: ['**/*.less'],
            customSyntax: 'postcss-less'
        }
    ]
};
