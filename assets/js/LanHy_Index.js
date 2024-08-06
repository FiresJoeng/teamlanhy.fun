/*
Original Files "eventally.html" and "main.js" by HTML5 UP(html5up.net | @ajlkn)
Modified and recoded by Team LanHy(teamlanhy.fun | @Fires)
Codes: GitHub.com/FiresJoeng
All is under the CCA 3.0 license.
 */

(function () {

    "use strict";

    var $body = document.querySelector('body');

    // Methods/polyfills.

    // classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
    !function () {
        function t(t) {
            this.el = t;
            for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++)
                e.call(this, n[i])
        }
        function n(t, n, i) {
            Object.defineProperty ? Object.defineProperty(t, n, {
                get: i
            }) : t.__defineGetter__(n, i)
        }
        if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
            var i = Array.prototype,
            e = i.push,
            s = i.splice,
            o = i.join;
            t.prototype = {
                add: function (t) {
                    this.contains(t) || (e.call(this, t), this.el.className = this.toString())
                },
                contains: function (t) {
                    return -1 != this.el.className.indexOf(t)
                },
                item: function (t) {
                    return this[t] || null
                },
                remove: function (t) {
                    if (this.contains(t)) {
                        for (var n = 0; n < this.length && this[n] != t; n++);
                        s.call(this, n, 1),
                        this.el.className = this.toString()
                    }
                },
                toString: function () {
                    return o.call(this, " ")
                },
                toggle: function (t) {
                    return this.contains(t) ? this.remove(t) : this.add(t),
                    this.contains(t)
                }
            },
            window.DOMTokenList = t,
            n(Element.prototype, "classList", function () {
                return new t(this)
            })
        }
    }
    ();

    // canUse
    window.canUse = function (p) {
        if (!window._canUse)
            window._canUse = document.createElement("div");
        var e = window._canUse.style,
        up = p.charAt(0).toUpperCase() + p.slice(1);
        return p in e || "Moz" + up in e || "Webkit" + up in e || "O" + up in e || "ms" + up in e
    };

    // window.addEventListener
    (function () {
        if ("addEventListener" in window)
            return;
        window.addEventListener = function (type, f) {
            window.attachEvent("on" + type, f)
        }
    })();

    // 在页面加载时播放初始动画
    window.addEventListener('load', function () {
        window.setTimeout(function () {
            $body.classList.remove('is-preload');
        }, 100);
    });

    // 背景图设置
    (function () {

        var settings = {

            // 背景图文件 (遵循 '路径': '对齐方式')
            images: {
                'assets/images/Horizon.jpg': 'center',
                'assets/images/Beach.jpg': 'center',
                'assets/images/Cosmos.jpg': 'center'
            },

            // 背景图展示延迟
            delay: 8000

        };

        // 声明
        var pos = 0,
        lastPos = 0,
        $wrapper,
        $bgs = [],
        $bg,
        k,
        v;

        // $wrapper 与 bgs
        $wrapper = document.createElement('div');
        $wrapper.id = 'bg';
        $body.appendChild($wrapper);

        for (k in settings.images) {

            // $bg
            $bg = document.createElement('div');
            $bg.style.backgroundImage = 'url("' + k + '")';
            $bg.style.backgroundPosition = settings.images[k];
            $wrapper.appendChild($bg);

            $bgs.push($bg);

        }

        // 主循环
        $bgs[pos].classList.add('visible');
        $bgs[pos].classList.add('top');

        // 判断bgs是否为1, 如果是则不执行后续代码
        if ($bgs.length == 1
             || !canUse('transition'))
            return;

        window.setInterval(function () {

            lastPos = pos;
            pos++;

            // 必要情况下回到最初的状态
            if (pos >= $bgs.length)
                pos = 0;

            // 交换顶部的图片
            $bgs[lastPos].classList.remove('top');
            $bgs[pos].classList.add('visible');
            $bgs[pos].classList.add('top');

            // 一段时间后把 $bgs[lastPos] 这个元素的 'visible' 类去掉
            window.setTimeout(function () {
                $bgs[lastPos].classList.remove('visible');
            }, settings.delay / 2);

        }, settings.delay);

    })();

    // 表单
    (function () {

        var $form = document.querySelectorAll('#signup-form')[0],
        $submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
        $message;

        if (!('addEventListener' in $form))
            return;

        // $Message
        $message = document.createElement('span');
        $message.classList.add('message');
        $form.appendChild($message);

        $message._show = function (type, text) {
            $message.innerHTML = text;
            $message.classList.add(type);
            $message.classList.add('visible');

            window.setTimeout(function () {
                $message._hide();
            }, 3000);
        };

        $message._hide = function () {
            $message.classList.remove('visible');
        };

        // fetchJSON 函数
        async function fetchJSON(url) {
            const response = await fetch(url);
            return response.json();
        }

        // 事件
        $form.addEventListener('submit', async function (event) {
            event.stopPropagation();
            event.preventDefault();

            // 隐藏$message
            $message._hide();

            // 禁用$submit
            $submit.disabled = true;

            // 获取输入的数据
            var submittedContent = $form.querySelector('input[name="code"]').value;

            try {
                const passcodes = await fetchJSON('SHA256 ENCRYPTED'); 
                let isMatch = false;
                let username = '';

                for (let [key, value] of Object.entries(passcodes)) {
                    if (submittedContent === value) {
                        isMatch = true;
                        username = key;
                        break;
                    }
                }

                // 判断
                if (isMatch) {
                    $message._show('succeed', '欢迎回来, ' + username + '!');
                } else {
                    $message._show('failure', '校验码错误！');
                }
            } catch (error) {
                $message._show('failure', '发生了一个问题，请联系网站管理员！');
            }

            // 启用$submit
            $submit.disabled = false;

            // 重置表单
            $form.reset();
        });

    })();

})();
