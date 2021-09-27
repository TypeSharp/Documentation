# A simple Guessing game

Now that we've made a very simple program that prints "Hello, world" to  console, let's make a simple guessing game! The game will take a number  given by the player and check if it matches a randomly generated number  by the computer. If the number is too high, the computer will say "too  high" and respectively, "too low" if the number the player inputs is too low.


## Getting Setup

We can use what we learned from the [hello world]() example for generating a TypeSharp project by opening a terminal and executing:

```shell
$ ts init "number_game"
```

Now that we have our project setup, navigate to the `mod.ts` file in the `src` directory of the project and open it in an editor.

If you'd like, you can make sure you did everything correctly by executing the following in the currently open terminal:

```shell
$ ts run
```

Which should output:

```shell
"Hello, world!"
```



## Generating a number

By default, TypeSharp does **not** implement any utilities for generating random numbers, you'll need to include this from the standard library! You can achieve this in one of the following ways:

- Using the "use" keyword, for example: `use std::math`
- Using the "import" keyword, with js-like syntax: `import { math } from 'std'`

With that said, we're going to stick to the first way, and the most standardized way of importing in TypeSharp. In your `src/mod.ts` file, add:

```typesharp
use std::math;
use std::io::stdin;
```

#### Making a working prototype

Now that we have our import, we need to add the code to save a random number for the user to guess. By default, TypeSharp is **strict**. Meaning, variables are only mutable to it's predefined type. With that said, let's get some things working!

Before we do anything, we need to tell the compiler that we would like to use lazy numbers, because they are not enabled by default, let's do that with the following:

```typesharp
#compiler numerics-lazy
```

After that, let's make a type, this type will specify our `GameInt`! It will only be a number from 0 - 100.
```typesharp
type GameInt = (x: int) => x in 0..100;
```
Now let's create a game class for our game! This will run our game until the game is over!
Here we'll declare the class, as well as our randomly generated number, which we'll save as `generated`.
```typesharp
class Game {
    static generated: GameInt = random(0..100);
    pub fn loop(): void {
        // ..
    }
}
```
Next, before we can start checking inputs from the user, we need to make a function to loop our game! The game loop will contain all the logic for out game! While you can name it whatever you like, we're naming it `loop` for simplicity. In our loop function (inside the `Game` class) we need to add a way to check for a user input! Let's do that using `readln` from `stdin`. Because `readln` literally reads a line from stdin aka (until the user presses enter or enters a new line) we can wait for the user to guess something and then try to parse it using the `parse` implementation from stdin. However if it fails, we need to output something to the user to let them know that their input was invalid, and then proceed with the game loop.

```typesharp
// Assign the result from readln to a var named "guess"
let guess = readln().parse<GameInt>() || {
    // If parsing fails, print line.
    println("Please input a number from 0 - 100!");
    // Return (continue) the loop.
    return this.loop();
}
```

Now we need to implement the checking for each guess, we're going to use some simple logic operations for this. If `guess` is higher than `generated` we will print "Guess is too high.", and if the guess is too low, we will print "Guess is too low".

```typesharp
if guess == self::generated {
    println("You won! You guessed the number!");
    return;
} else if (guess > self::generated) {
    println("You guessed to high...");
} else {
    println("You guessed to low...");
}
return false;
```

With this completed, we can simply invoke the `loop` function by instancing our class and calling loop! After we do this our simple guessing program should now be complete! The final product should look similar to the following.

```typesharp
use std::math::random;
use std::io::stdin;

type GameInt = (x: int) => x in 0..100;

class Game {
     static generated: GameInt = random(0..100);
     pub fn loop(): void {
        let guess = readln().parse<GameInt>() || {
            // If parsing fails, print line.
            println("Please input a number from 0 - 100!");
            // Return (continue) the loop.
            return this.loop();
        }

        if guess == self::generated {
            println("You won! You guessed the number!");
            return;
        } else if (guess > self::generated) {
            println("You guessed to high...");
        } else {
            println("You guessed to low...");
        }

        this.loop();
     }
}

new Game().loop();
```

## Running our program

There are multiple ways to run a TypeSharp program, you could either do the first, and most recommended solution for production, aka the one you learned in the [Hello World]() example; or you can make use of `ts run`, which will run a "script" or "package" given the command was ran properly, syntax can be seen in **Block.1** or can use the command `ts compile` from the previous guide.

##### Block.1

You will need to first open a terminal in your project's [parent directory]() and execute the following command for this to work:

```shell
ts run .
```

We used `ts compile` and execute the binary in the bin directory in your project, however your final solution should be similar to:
