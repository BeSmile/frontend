module.exports = function () {
    return {
        name: 'ast-transform', // not required
        visitor: {
            Identifier(path) {
                path.node.name = path.node.name.split('').reverse().join('');
            }
        }
    };
};
