$(function () {
    'use strict';
    const IMG_WID = 48;
    const IMG_HEI = 48;
    const DIV_ID = 'stalker-obj';

    const IMG_WAIT = 'icon-wait.gif';
    const IMG_LEFT = 'icon-left.gif';
    const IMG_RIGHT = 'icon-right.gif';

    //アイコン表示用のDIV要素を作成
    $('body')
        .append(
            '<div id="' + DIV_ID + '"><img src="' +
            chrome.extension.getURL('image/' + IMG_WAIT) +
            '" alt="" width="' + IMG_WID + '" height="' + IMG_HEI + '"></div>');

    //cssを定義
    $('#' + DIV_ID).css({
        width: IMG_WID + 'px',
        height: IMG_HEI + 'px',
        overflow: 'hidden',
        position: 'absolute',
        top: '0',
        left: '0',
        'z-index': '999999'
    });

    var direction;
    $('html').mousemove(function (e) {
        var icon = $('#' + DIV_ID).offset();
        $('#' + DIV_ID).stop();

        //マウスのX座標とアイコンのX座標からアイコンの向きを決定
        var mouseX = e.pageX + 10;
        var imgX = String($('#' + DIV_ID).css('left')).replace('px', '');
        direction = mouseX - imgX > 0 ? 'right' : 'left';

        //アニメーション実行
        $('#' + DIV_ID).animate({
            top: e.pageY + 10,
            left: e.pageX + 10
        }, {
            duration: 1000,
            specialEasing: {
                top: 'easeOutCirc',
                left: 'easeOutCirc'
            },
            done: function (animation, goToEnd) {
                updateIcon('image/' + IMG_WAIT);
            },
            fail: function (animation, goToEnd) {
                updateIcon('image/' + (direction === 'right' ? IMG_RIGHT : IMG_LEFT));
            },
            always: function (animation, goToEnd) {}
        });
    });

    /**
     * 画像を更新する
     */
    function updateIcon(imgStr) {
        $('#' + DIV_ID + ' img').attr('src', chrome.extension.getURL(imgStr));
    }
});
