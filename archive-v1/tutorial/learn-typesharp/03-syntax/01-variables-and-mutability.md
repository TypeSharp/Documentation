# Variables and Mutability 

So far, we've covered the basics of TypeSharp. However there's much more to it. In TypeSharp, you can mark something as *immutable*, which means it may **not** able to change under any circumstance! This implementation is heavily inspired by rust, with that said, let's look at something that may work in TypeScript/Javascript but will **not** work in TypeSharp.

## Const means Constant

I'm sure, from whatever language you've come from, that has the keyword of "const", you're familiar with it's implementation, however in TypeSharp, it's different. In Typesharp, under no circumstance may a variable or it's properties change when it's defined with "const". This should be treated as `readonly` in TypeScript.

Let's look at an example of code that looks like it should work, but does not. 

```typescript
const mutate_me: Object = {
    x: 10,
    y: 9
};

mutate_me.x += 1;
```

When compiling this code, you will receive the following error:

```shell
Error! [93]: Assignment to property on "mutate_me" as an immutable variable after declaration.
--> [src/mod.ts]
1 |		const mutate_me: Object = {
  |							 ~~~
  \____________________________^^^^
  | ---> First Assignment is made here.
  | ---> SP > Try making this a mutable variable with "let".
  |
6 |		mutate_me.x += 1;
  |				   ~~~
  \_________________^^^^
  | ---> Second assignment made here.
  | ---> SP > Try removing this statement.

Error: Tried re-assigning to a constant property after declaration.
```

While Typesharp will do it's best to provide you the best solution, it's not perfect. It will make mistakes, however for minor things like this, TypeSharp was able to identify the error, and give us the solution! So let's plug it in and test our code, the code should now look like the following:

```typescript
const mutate_me: Object = {
    x: 10,
    y: 9
};

mutate_me.x += 1;

println(mutate_me.toString({ format: "inspect" }));
```

Which will execute successfully with an exit code of 0.
