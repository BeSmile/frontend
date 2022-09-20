const $defaults = Symbol('defaults');

function FetchHeaders(headers, defaults) {
    headers && this.set(headers); // set的意思是什么
    this[$defaults] = defaults || null;
}

Object.assign(FetchHeaders.prototype, {
    set: function (headers) {
        if (headers) {
            Object.keys(headers).forEach((key) => {
                this[key] = headers[key];
            });
        }
        return this;
    },
    toJSON: function () {
        const obj = Object.create(null);
        const combine = Object.assign({}, this[$defaults] || null, this);
        const values: any = Object.values(combine);
        values.forEach((value, header) => {
            if (value === null || value === false) return;
            obj[value] = header;
        });
        return obj;
    }
});

Object.assign(FetchHeaders, {
    from: function (headers) {
        if (typeof headers === 'string') {
            return new this({});
        }
        return headers instanceof this ? this : new this(headers);
    }
});

export default FetchHeaders as any;
