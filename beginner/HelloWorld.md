## Creating a "Hello World" application

Firstly, you'll need to install typesharp! For more information on that, click [here](). <br />

If you have typesharp installed, great! You're ready to proceed.

### Setting up a namespace
For this tutorial we'll be using the namespace `MyFirstProject`!
Let's create a source folder in the directory of our project, and create a file called `mod.tn` or `mod.ts`. In this file we'll add our namespace to the first line.
```ts
namespace MyFirstProject;
```

### Creating a function to be called when ran
If you were to compile this file, typesharp wouldn't know what to do, so heres how we fix that, lets add a function and call it that says "Hello World" in console! <br />

First we'll need to import the standard library. (may not be needed in the future)
```ts
import * from 'std';
```
Next we need to create our function that uses console to print hello world, we'll call it "helloWorld" and put `println("Hello World!")`.
```ts
function helloWorld(): void {
     println("Hello World!");
}
```

### Putting everything together and running our project.
We have our code, lets put it together, your new file should look like this:
```ts
namespace MyFirstProject;

import * from 'std';

function helloWorld(): void {
     println("Hello World!");
}

helloWorld();
```

Because we named our file `mod.ts` Typesharp automatically uses this file as an entry point, so we don't need to define a `main` function (You can see more about this in documentation). <br />

Okay we have a file, so how do we run it? Glad you asked! We need to compile our file. This may get a bit crazy depending on what architecture you're compiling for, but for now, we'll use the system default one. <br /> <br />

**The following steps assume you have typesharp as a enviroment variable.**
 1. Compile our project with typesharp CLI: `tsharp compile ./`
 2. Typesharp will prompt you with a name of the program, put: `MyFirstProgram`
 3. If everything when correctly, your project should have compiled! Nice! Lets run it.

All compiled files are located in `/tbin/*`. Now depending on your system, you can run this file or invoke with command line, and when you run it, you should see:

```xl
Hello World!

Program exited with code 0.
```
<br />
<br />
Congratulations! You have created your first program! Head to our [site]() if you want to see more examples.