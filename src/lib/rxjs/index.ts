/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-20 10:26:02
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-03 15:17:24
 */
import {
    combineAll,
    concat,
    delay,
    finalize,
    from,
    fromEvent,
    interval,
    map,
    mapTo,
    merge,
    mergeMap,
    Observable,
    of,
    scan,
    switchMap,
    take,
    tap,
    timer,
    timestamp,
    withLatestFrom
} from 'rxjs';
// const read = (name) => {
//   return new Observable((observer) => {
//     observer.next(name);
//   });
// }
// Observable.pipe(
//   read("1122"),
//   read("3344"),
//   read("5566"),
// ).subscribe(data => console.log(data));
const clicks1 = fromEvent(document, 'click');
const timer1 = interval(1000);
const clicksOrTimer = merge(clicks1, timer1);
clicksOrTimer.subscribe((x) => console.log(x));

new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    setTimeout(() => {
        subscriber.next(4);
    }, 3000);
    subscriber.next(3);
    // subscriber.complete(123);
});

const observer: any = {
    next(value: string) {
        console.log('next value got', value);
    },
    error(value: string) {
        console.log('error value got', value);
    },
    closed(value: string) {
        console.log('closed value got', value);
    },
    complete(value: string) {
        console.log('complete value got', value);
    }
};

// observable.subscribe(observer);

const click$ = fromEvent(document.body, 'click');
const toast$ = click$.pipe(
    switchMap(() => {
        let hideByDuration = false;

        const duration$ = timer(2000).pipe(
            mapTo('hide by duration'),
            tap(() => (hideByDuration = true))
        );

        return concat(of('show-111'), duration$).pipe(
            finalize(() => {
                if (!hideByDuration) {
                    console.log('hide by next');
                }
            })
        );
    })
);

toast$.subscribe(observer);

// 每秒发出值，并只取前2个
const source = interval(1000).pipe(take(2));
// 将 source 发出的每个值映射成取前5个值的 interval observable
const example = source.pipe(
    map((val) =>
        interval(1000).pipe(
            map((i) => `Result (${val}): ${i}`),
            take(5)
        )
    )
);
/*
  soure 中的2个值会被映射成2个(内部的) interval observables，
  这2个内部 observables 每秒使用 combineLatest 策略来 combineAll，
  每当任意一个内部 observable 发出值，就会发出每个内部 observable 的最新值。
*/
const combined = example.pipe(combineAll());
/*
  输出:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
*/
combined.subscribe((val) => console.log(`combined: ${val}`));

fromEvent(document, 'click')
    .pipe(scan((count) => count + 1, 0))
    .subscribe((val) => console.log(val));

concat(of(1).pipe(delay(5000)), of(2), of(3)).subscribe((val) => console.log(`merge val: ${val}`));

fromEvent(document, 'click')
    .pipe(mergeMap(() => interval(1000)))
    .subscribe((val) => console.log(`switchMap: ${val}`));

const holdDown = fromEvent(document, 'mousedown');
const holdUp = fromEvent(document, 'mouseup').pipe(
    timestamp(),
    withLatestFrom(holdDown.pipe(timestamp()), (t1, t2) => {
        return t1.timestamp - t2.timestamp;
    })
    // flatMap((ms) => console.log("flatMap", ms)),
);

holdUp.subscribe((val) => {
    console.log(`${val}ms`, val);
});

const array = [
    'https://httpbin.org/ip',
    'https://httpbin.org/user-agent',
    'https://httpbin.org/delay/3'
];

// 假设这是你的http请求函数
function httpGet(url: any): any {
    return new Promise((resolve) => setTimeout(() => resolve(`Result: ${url}`), 2000));
}

// mergeMap是专门用来处理并发处理的rxjs操作符
// mergeMap第二个参数2的意思是，from(array)每次并发量是2，只有promise执行结束才接着取array里面的数据
// mergeMap第一个参数httpGet的意思是每次并发，从from(array)中取的数据如何包装，这里是作为httpGet的参数
const source1 = from(array)
    .pipe(mergeMap(httpGet, 2))
    .subscribe((val) => console.log(val));
console.log(source1, 'source');
