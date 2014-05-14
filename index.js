'use strict';

var template = require('art-template');
var ANONYMOUS_RE = /^function\s+anonymous/;

module.exports = function(content, file, conf){
    if(conf.openTag){
        template.openTag = conf.openTag;
    }
    if(conf.closeTag){
        template.closeTag = conf.closeTag;
    }
    template.isCompress = conf.isCompress;
    template.onerror = function (e) { throw e; };

    var id = file.getId();
    var render = template.compile(id, content);
    delete template.cache[id];

    content = render.toString().replace(ANONYMOUS_RE, 'function');
    content = 'template("'+ id +'",'+ content +');';

    return content;
};