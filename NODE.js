

/**
 * Node Class
 * @param {boolean} isNode  是否是node
 * @param {string}  content 内容
 */
var Node = function (isNode, content) {

    this.isNode = isNode;
    this.children = [];
    this.content = content;
    this.isClose = false;

    if (!isNode) {

        this.render = RENDERS['text'];
        this.isClose = true;
    }
    else {

        var matchs = /([^\s\(]*)/g.exec(content);
        var nodeType = matchs[1];

        this.nodeType = nodeType;

        this.render = function () {

            var htmls = [];

            for (var i = 0; i < this.children.length; i++) {
                htmls.push(this.children[i].render());
            };

            return RENDERS[nodeType].call(this, htmls.join('<br />'));
        };
    }
}

/**
 * 删除子节点
 * @param  {object} node 要被删除的node节点
 */
Node.prototype.addChild = function (node) {
    
    node.parent = this;
    this.children.push(node);
};

/**
 * 删除子节点
 * @param  {object} node 要被删除的node节点
 */
Node.prototype.removeChild = function (node) {

    var children = this.children;
    var tmpIndex;

    for (var i = 0; i < Things.length; i++) {

        if (children[i] == node) {
        
            tmpIndex = i;
        }
    };

    if (tmpIndex === undefined) {
        
        children.splice(tmpIndex, 1);
    }
};

/**
 * 后序遍历
 */
Node.prototype.enumerate = function (callback) {

    var children = this.children;

    for (var i = 0; i < children.length; i++) {

        children[i].enumerate(callback);
    };

    callback.call(this);
};

/**
 * render 虚方法 需要子类覆盖
 */
Node.prototype.render = function () {};

/**
 * 打开标签
 */
Node.prototype.open = function () {

    this.isClose = false;
};

/**
 * 关闭标签
 */
Node.prototype.close = function () {

    this.isClose = true;
};

Node.prototype.autoClose = function (currentOpenNode) {

    if (this.nodeType == 'else') {
        currentOpenNode.close();
    }
};
