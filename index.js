var SEditor = function () {
    this.init();
};
SEditor.prototype.init = function () {
    var self = this;

    $('#link').click(function(){
        var se_ = self.selection(Editor).range();
        self.selection(Editor).empty();
        self.selection(Editor).select(se_);
        Editor.document.execCommand("createlink", false, 'http://www.baidu.com');
    });
    $('#list').click(function(){
        Editor.document.execCommand("InsertOrderedList");
    });
    $('#ulist').click(function(){
        Editor.document.execCommand("InsertUnorderedList");
        //Editor.document.execCommand("InsertOrderedList");
    });
    document.execCommand("italic");
    $('#b').click(function(){Editor.document.execCommand("bold");})
    $('#italic').click(function(){Editor.document.execCommand("italic");})
    $('#underline').click(function(){Editor.document.execCommand("underline");})
};
SEditor.prototype.selection = function (win_) {
    win_ = win_|| window;
    if (false) {
        return {
            obj: function () {
                return win_.document.selection;
            },
            range: function () {
                return win_.document.selection.createRange();
            },
            text: function () {
                return win_.document.selection.createRange().text;
            },
            focusNode: function () {
                return win_.document.selection.createRange().parentElement();
            },
            select: function (range) {
                range.select();
            },
            empty: function () {
                win_.document.selection.empty();
            }
        }
    } else {
        return {
            obj: function () {
                return win_.getSelection();
            },
            range: function () {
                return win_.getSelection().getRangeAt(0);
            },
            text: function () {
                return win_.getSelection().toString();
            },
            focusNode: function () {
                return win_.getSelection().focusNode;
            },
            select: function (range) {
                win_.getSelection().addRange(range);
            },
            empty: function () {
                win_.getSelection().removeAllRanges();
            }
        }
    }
};

$(function () {
    var myTextArea = document.getElementById('initText');
    Editor.document.designMode = "ON";
    Editor.document.open();
    Editor.document.write(myTextArea.value);
    Editor.document.close();
    new SEditor();
});