const loader = require('./md-loader');

loader("# 数值\n\n### NaN\n\n表示非number数值, 当字符串转换数值出错的时候,结果就是NaN\n\n\n```typescript\nNaN === NaN\n// false\n\ntypeof NaN\n22\n// number\n```\n\n### 零\n\nInfinity 指那些大到无法表示的值\n\n```\n1 / 0 = Infinity\n1 / -0 = -Infinity\n```\n\n```typescript\n1 / 0 === 1 / -0\n// false\nObject.is(0, -0)\n// false\n```\n\n```typescript\n0.1 + 0.2 + 0.3 \n// 0.6000000000000001\n0.1 + (0.2 + 0.3)\n// 0.6\n```\n\n0.2小数点无法进行10进制转2进制,通过IEEE754二进制浮点运算\n\n```\n// 十进制转二进制无法准确表达0.1和0.2，只能用循环逼近；\n0.1 -> 0.0001100110011001100(1100循环) -> 1.100110011001100 * 2^(-4)\n0.2 -> 0.0011001100110011001(1001无限循环) -> 1.100110011001100 * 2^(-3)\n// 数学中计算时，我们需要将指数位置对齐，但需要指明的是JS中没有采用Exponent Bias，而是将尾数Mantissa视为为整数计算的，这样误差会增大，但是实现算法简单。\n(1).1001100110011001100110011001100110011001100110011010 (Exponent:-4)+\n(1).1001100110011001100110011001100110011001100110011010 (Exponent:-3)=\n(1).0011001100110011001100110011001100110011001100110100 (Exponent:-2)\n\n// 转换为IEEE754双精度为 1.0011001100110011001100110011001100110011001100110100 * 2^(-2),如果用二进制转成十进制为(2^(-2)+2^(-5)+2^(-6)...)。 结果大约是0.30000000000000004419，去小数点后面17位精度为0.30000000000000004，\n```\n先进行0.2+0.3的运算,刚刚好能够先处理掉尾部精度");
