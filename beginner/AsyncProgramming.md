## Async Programming

We all love the async syntax from Javascript and Python, so in TypeSharp we decided to implement it! However in TypeSharp it's implemented a little differently.


### Futures
Futures are TypeSharp's alternative to JavaScripts `Promise`. A `Future<T>` indicates something that will resolve or may resolve in the future. <br />

You can create a future by simply using async infront of a function (just like JS).
```ts
import * from 'std';

async function getGoogleData(): Future<JSON> {
     return await request.get('https://play.google.com/log?format=json&hasfast=true');
}
```
<br />

But TypeSharp has some interesting functionality with this. The code above is **thread blocking** because we wait for a request to complete before executing more code. But what if we want to have true parallel programming?

### Parallel Programming
With typesharp you can achieve this with the `async` keyword. Please note that the `async` keyword is the **exact** same as spawning a thread, executing code, and returning with callback.
So, let's look at how this code looks.
```ts
const response: Future<JSON> = async request.get('https://play.google.com/log?format=json&hasfast=true');

println(response?);
println('This is called before the response dump without blocking the thread.');
```

There's a few things to notice in this example. <br />

 1. All `async` casts are Futures. If you compile without futures, this code will be replaced with callbacks. (You will also get errors)

 2. For our first print line to console, we use `response?`. The `?` in this case acts as a **null chain** and will only execute if response is ever resolved.

 3. This code is parallel, All of your code is executed as sequenced but does not block the main thread.
 <br/>

So you might be asking yourself, why use this instead of await?
Let's look at the following example and compare it with the first one.<br />

The following code is the same as the example above, just with await syntax.
```ts
const response: JSON = await request.get('https://play.google.com/log?format=json&hasfast=true);

println(response);
println('This is called after the response dump because await is thread blocking.');
```

Let's look at the differences: <br />

 1. We use the `await` keyword. Telling the compiler that this address is from a signature, so we need to wait for it to finish calling.

 2. Because we are waiting for the request to resolve, the code below the `await` can not be executed.

 3. The type is not a `Future` but rather `JSON`. This is again, because we are waiting for the request to be executed, which means the returned type from the request is a JSON.

**Explanation:**<br />
In the previous example with the `async` keyword, we tell the compiler that we are executing the request and casting its result to a variable that "may" resolve. This is why the response dump is called after our second print line in the first example. However in the second example we're telling the compiler to *wait* for the request to be resolved, and assign the result to our `response` variable.


### When should I use Async or Await?
**Async:** You should use `async` when you are executing tasks that constantly block the main thread and your code is not dependent on whether this code may resolve. <br /><br />

**Await:** You should use `await` when you are expecting a Future to resolve and the following code is dependent on this task resolving.