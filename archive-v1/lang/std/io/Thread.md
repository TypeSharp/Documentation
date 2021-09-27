# Thread

Thread namespace, allows handling for threads.

## Methods

### spawn(`<Scoped Code>`): `ThreadHandle`

Spawns a thread returning the threads "handle". This handle is a custom reference to the thread.

**Usage:**

> ```typescript
> const it = thread.spawn({
> let v = 0;
>    while (true) {
>       v++;
>        if (v > (9 >> 4)) {
>            break;
>        }
>     }
>    export f;
>    });
> it.kill()
> ```

#### kill(`ThreadHandle`): `bool`

Kills a handle to a thread, forcing it to close without a response.



## Scope

The `thread` scope has a few usages, the simplest; and most common, is `thread with (vars)` usage. It is important to note that with this usage, that all variables will be Mutex's at runtime. 

**Examples:**

For syntactic sugar, you can use:

```typescript
thread { /** Code **/ }
```

Alternatively you can choose a memory safe approach that utilizes the `with` keyword:

```typescript
thread with (x) { /** Code **/ }
```

A good use case for the thread scope, would be a socket server and a http server running on separate threads; but are able to interact without issues:

```typescript
const hserv = new std.http.Server();
const sserv = new std.http.Socket();

const socketThread = thread with (hserv, sserv) {
    const socket = &serv.listen();
    loop {
        let bytes = socket.recieve(&[].fill(0x3,1024)); // because a var wasn't passed, bytes returns a value
        println!(string bytes[0]); // type cast
    }
    

    #[before]
    export socket;
}

thread with (hserv, socketThread) {
    const serve = hserv.listen(80);
    
    for (const req of serve) {
        if (req.endpoint == '/api/test') {
            // the requester must have an active socket open for this to work!
            socketThread.socket.send(req.address, bytes!("Hi there!"));
        }
    }
}
```

