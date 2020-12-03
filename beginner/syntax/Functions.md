## Functions
The syntax for "TypeSharp" is derived from TypeScript with some spins, reading this will help you understand basic syntax.

### Generic Functions
A generic function is a function that does something with a given type. Say we want to pass a type, and create an instance of it then add our paramater data to it. This is what generics are for. Heres an example.
```ts
function create<T>(params: typeof T.constructor.params): T {
     new T(params);
}

// usage:
public class Dog extends Animal, Creature {
     @readonly({ public: true })
     private name: string;
     public constructor(name: string) {
          super as Animal("Dog");
          super as Creature("Biped");
          this.name = name;
     }
}

const instance: Dog = create<Dog>("Buster");
println("Dog instance created! With name: " . instance.name);
```

### Function overloading
In typesharp, functions are compiled. Typesharp needs to know what a function returns. To do this, you use typesharp's type system.
However, unlike typescript, you can not provide union types. If you have no idea what that is, don't worry and just look at the example


In this example we're going to create a function that is able to have different type paramaters. A string, and a number.
```ts
function log(value: number): void {
     println(value.toString());
}

function log(value: string): void {
     println(value);
}

// Notice, we have to functions instead of union types. This is because union types are repetitive.

log(0); // 0
log("Hi there!"); // Hi there!
```