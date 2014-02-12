var RENDERS = {
    'root': function (content) {
        return content;
    },
    'foreach': function (content) {
        return 'for:{' + content + '}';
    },
    'if': function (content) {
        return 'if:{' + content + '}';
    },
    'else': function (content) {
        return 'else:{' + content + '}';
    },
    'text': function (content) {
        return 'text:{' + this.content + '}';;
    }
}; 