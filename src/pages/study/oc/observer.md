# Observer

## NSMutableArray 支持订阅者模式

```
// DataContainer.h
@interface DataContainer : NSObject

// Convenience accessor
- (NSArray *)currentData;

// For KVC compliance, publicly declared for readability
- (void)insertObject:(id)object inDataAtIndex:(NSUInteger)index;
- (void)removeObjectFromDataAtIndex:(NSUInteger)index;
- (id)objectInDataAtIndex:(NSUInteger)index;
- (NSArray *)dataAtIndexes:(NSIndexSet *)indexes;
- (NSUInteger)countOfData;

@end

// DataContainer.m

@interface DataContainer ()

@property (nonatomic, strong) NSMutableArray *data;

@end

@implementation DataContainer

//  We'll use automatic notifications for this example
+ (BOOL)automaticallyNotifiesObserversForKey:(NSString *)key
{
    if ([key isEqualToString:@"data"]) {
        return YES;
    }
    return [super automaticallyNotifiesObserversForKey:key];
}

- (id)init
{
    self = [super init];
    if (self) {
        // This is the ivar which provides storage
        _data = [NSMutableArray array];
    }
    return self;
}

//  Just a convenience method
- (NSArray *)currentData
{
    return [self dataAtIndexes:[NSIndexSet indexSetWithIndexesInRange:NSMakeRange(0, [self countOfData])]];
}

//  These methods enable KVC compliance
- (void)insertObject:(id)object inDataAtIndex:(NSUInteger)index
{
    self.data[index] = object;
}

- (void)removeObjectFromDataAtIndex:(NSUInteger)index
{
    [self.data removeObjectAtIndex:index];
}

- (id)objectInDataAtIndex:(NSUInteger)index
{
    return self.data[index];
}

- (NSArray *)dataAtIndexes:(NSIndexSet *)indexes
{
    return [self.data objectsAtIndexes:indexes];
}

- (NSUInteger)countOfData
{
    return [self.data count];
}

@end
```

在`ViewController`中使用

```
    // ViewController.h
    @interface ViewController : UIViewController

    @end

    // ViewController.m

    @interface ViewController ()

    @property (nonatomic,strong) DataContainer *dataContainer;

    @end

    @implementation ViewController

    static char MyObservationContext;

    - (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
    {
        self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
        if (self) {
            //  Instantiate a DataContainer and store it in our property
            _dataContainer = [[DataContainer alloc] init];
            //  Add self as an observer. The context is used to verify that code from this class (and not its superclass) started observing.
            [_dataContainer addObserver:self
                             forKeyPath:@"data"
                                options:(NSKeyValueObservingOptionOld | NSKeyValueObservingOptionNew)
                                context:&MyObservationContext];
        }

        return self;
    }

    - (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
    {
        //  Check if our class, rather than superclass or someone else, added as observer
        if (context == &MyObservationContext) {
            //  Check that the key path is what we want
            if ([keyPath isEqualToString:@"data"]) {
                //  Verify we're observing the correct object
                if (object == self.dataContainer) {
                    NSLog(@"KVO for our container property, change dictionary is %@", change);
                }
            }
        }
        else {
            //  Otherwise, call up to superclass implementation
            [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
        }
    }

    - (void)viewDidLoad
    {
        [super viewDidLoad];

        //  Insert and remove some objects. Console messages should be logged.
        // 实际添加,删除数组
        [self.dataContainer insertObject:[NSObject new] inDataAtIndex:0];
        [self.dataContainer insertObject:[NSObject new] inDataAtIndex:1];
        [self.dataContainer removeObjectFromDataAtIndex:0];
    }

    - (void)dealloc
    {
        [_dataContainer removeObserver:self forKeyPath:@"data" context:&MyObservationContext];
    }

    @end
```
