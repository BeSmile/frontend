import * as path from 'path';
import * as _rimraf from 'rimraf';
import * as es from 'event-stream';
import * as _filter from 'gulp-filter';
import * as VinylFile from 'vinyl';

export function rimraf(dir: string): () => Promise<void> {
    const result = () =>
        new Promise<void>((c, e) => {
            let retries = 0;

            const retry = () => {
                _rimraf(dir, { maxBusyTries: 1 }, (err: any) => {
                    if (!err) {
                        return c();
                    }

                    if (err.code === 'ENOTEMPTY' && ++retries < 5) {
                        return setTimeout(() => retry(), 10);
                    }

                    return e(err);
                });
            };

            retry();
        });
    result.taskName = `clean-${path.basename(dir).toLowerCase()}`;
    return result;
}

// eslint-disable-next-line no-undef
export function setExecutableBit(pattern?: string | string[]): NodeJS.ReadWriteStream {
    const setBit = es.mapSync<VinylFile, VinylFile>((f) => {
        if (!f.stat) {
            f.stat = {
                isFile() {
                    return true;
                }
            } as any;
        }
        f.stat.mode = /* 100755 */ 33261;
        return f;
    });

    if (!pattern) {
        return setBit;
    }

    const input = es.through();
    const filter = _filter(pattern, { restore: true });
    const output = input.pipe(filter).pipe(setBit).pipe(filter.restore);

    return es.duplex(input, output);
}
