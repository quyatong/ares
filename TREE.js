var Tree = function (smartyTpl) {

    // 根节点
    var root = new Node(true, 'root');

    // TOKEN配置
    var TOKENS = {
        LEFT_TOKEN: '{%', 
        RIGHT_TOKEN: '%}'
    };

    /**
     * 获取打开的节点
     * 
     * @return {object} 最深的节点
     */
    var getOpenNode = function () {
        
        var tmp = [];
        var callback = function () {

            var node = this;
            
            if (!this.isClose) {
                
                tmp.push(node);
            }
        };

        root.enumerate(callback);

        return tmp[0];
    };

    /**
     * 节点处理器
     * 
     * @param  {string} nodeText 节点内数据
     */
    var nodeHandler = function (nodeText) {

        var currentOpenNode = getOpenNode();

        if (/^\//.test(nodeText)) {
            
            currentOpenNode.close();
        }
        else {

            var node = new Node(true, nodeText);

            node.autoClose(currentOpenNode);
            currentOpenNode = getOpenNode();
            currentOpenNode.addChild(node);
        }
    };

    /**
     * 文本节点处理器
     * 
     * @param  {string} nodeText 节点内数据
     */
    var textHandler = function (normalText) {

        var currentOpenNode = getOpenNode();
        var node = new Node(false, normalText);

        currentOpenNode.addChild(node);
    };



    /**
     * 区分smarty模板中的文本节点
     * 
     * @param  {string} smartyTpl smarty模板字符串
     */
    var distinguish = function (smartyTpl) {

        var segments = smartyTpl.split(TOKENS.RIGHT_TOKEN);

        for (var i = 0; i < segments.length; i++) {
            
            var leftTokenIndex = segments[i].indexOf(TOKENS.LEFT_TOKEN);
            
            if (leftTokenIndex > -1) {

                var segs = segments[i].split(TOKENS.LEFT_TOKEN);

                textHandler(segs[0]);
                nodeHandler(segs[1]);
            }
            else {

                textHandler(segments[i]);
            }
        };

    }
    distinguish(smartyTpl);

    return root;

};  