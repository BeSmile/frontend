# NSOperationQueue

```
// Allocated here for succinctness.
NSOperationQueue *q = [[NSOperationQueue alloc] init];

/* Data to process */
NSData *data = [@"Hello, I'm a Block!" dataUsingEncoding: NSUTF8StringEncoding];

/* Push an expensive computation to the operation queue, and then
 * display the response to the user on the main thread. */
[q addOperationWithBlock: ^{
    /* Perform expensive processing with data on our background thread */
    NSString *string = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];

    /* Inform the user of the result on the main thread, where it's safe to play with the UI. */

    /* We don't need to hold a string reference anymore */

}];
```
