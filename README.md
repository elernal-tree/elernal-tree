# ElernalTree

[悠久之树回响计算器](https://shushujsq.top/)

期望算法参照[喜鹊wiki](http://42.192.86.62/index.php?title=%E8%AF%A6%E7%BB%86%E4%BC%A4%E5%AE%B3%E5%85%AC%E5%BC%8F)
, 感谢喜鹊群友的帮助

期望伤害=基础攻击力
*(1+回响攻刃)
*(1+回响从容+武器从容/每个回响、武器的从容按HP计算数值、乘上加护后加算)
*(1+回响破釜+武器破釜/每个回响、武器的破釜按HP计算数值、乘上加护后加算)
*(1+武器攻刃+攻刃BUFF)
*(1+机甲属攻+属攻BUFF)
*属性克制(克制1.25，被克制0.75)
*额外伤害(回响技伤/奥伤+技伤/奥伤buff)
*(1+基础爆伤(非克制0.25,克制0.5)+爆伤buff) (算暴击期望的话，暴击率加上暴击buff)

背水 80%以上为0 背水=背水系数*((1 + 2*x) * x)
浑身 25以下无效


TODO
 - 期望计算(通常/有利、不利)
 - 完善帮助
 - 加成详情
 - 额外填写 攻刃、属攻、技伤、奥伤、暴击、爆伤，、浑身、背水。  暴击、爆伤、属攻优先
 - 伤害上限 背水浑身曲线



普攻改成伤害预测吧，然后攻击力那个地方加个注脚，移除回响的基础攻击力，敌人防御力那边不懂机制会很懵，可以改成4个单选项，默认防御/25%破甲/50%破甲，最后加个高级选项，脚注加上高级可以针对特殊BOSS自定义防御力，当然未来最好还是做成那种，选项选各种防御数值的常见BOSS，然后再追加破甲选项
后面的DA和TA，我建议你在上面的选项卡后面追加连击率预测和暴击预测，然后DA和TA改成计算连击暴击，就是最后的总伤害预测，可以先不急，先把连击和暴击做完，最后直接就能把总数据乘出来了


