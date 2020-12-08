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
     public readonly name: string;
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

### Function decorators
A decorator in TypeSharp is a special decleration that is attached to `Methods`, `Classes`, `Functions`, `Properties`, and occasionally `Variables`. A decorator can be defined by using the built in `@define` or implementing the `Typesharp.Decorator` interface into a class.

An example of this could be logging Structures or Classes to commandline.
```ts
@define
function logStructure(json: JSON, asString?: boolean): string? {
     let logString: string = "";
     logString .= COLOR.GREY . "{\r\n";
     // because typesharp acts like javascript, you can treat
     // json almost the exact same way.
     for (let [ key: string, value: JSON.any ] of json) {
          // weird spacing so we can visualize
          logString .= "\r\n" . COLOR.BLUE . `  "${key}"${COLOR.WHITE}: ` . COLOR.AQUA . ((value instanceof JSON) ? logStructure(json, true) : value.toString());
     }

     logString .= "\r\n" . COLOR.GREY . "}"

     if (asString) {
          return logString;
     } else {
          print!(logString);
     }
}
```

Now we can use `@logStructure` on JSON objects. Heres an example:
```ts
@logStructure
const options: JSON = {
     key: "value",
     key2: {
          nestedKey: nestedValue
     },
     key3: {
          nestedKey_deep: {
               // @ = circular reference to self on outer most key
               superNested: @key2.nestedKey
          }
     }
}
```
The code above logs the JSON structure of `options` when it becomes defined by the compiler. For more information on decorators in typesharp, goto [our decorator page]().