# Guessing Game

Now that we've made a very simple program that prints "Hello, world" to console, let's make a simple guessing game. The game will take a number given by the player and check if it matches a randomly generated number by the computer. If the number is too high, the computer will say "too high" and respectively, "too low" if the number the player inputs is too low.

## Getting Setup

We can use what we learned from the [hello world]() example for generating a TypeSharp project by opening a terminal and executing:

```shell
ts init "number_game"
```

Now that we have our project setup, navigate to the `mod.ts` file in the `src` directory of the project and open it in an editor.

If you'd like, you can make sure you did everything correctly by executing the following in the currently open terminal:

```shell
ts run
```

Which should output:

```xaml
Hello, world!
```



## Generating a number

By default, TypeSharp does **not** implement any utilities for generating random numbers, you'll need to include this from the standard library! You can achieve this in one of the following ways:

	- Using the "use" keyword, for example: `use std.math`
	- Using the "import" keyword, which acts a lot like javascript: `import math from std`
	- Using the "import" keyword, with js-like syntax: `import { math } from 'std'`

With that said, we're going to stick to the first way, and the most standardized way of importing in TypeSharp. In your `src/mod.ts` file, add:

```rust
use std.math;
```

#### Making a working prototype

Now that we have our import, we need to add the code to save a random number for the user to guess. By default, TypeSharp is **strict**. Meaning, variables are only mutable to it's predefined type. With that said, let's get some things working!

Firstly we need to store the random number to the heap so we can check later if the user is guessing correctly, let's store this as a scoped constant.

```typescript
const rand_number: int = rand(0, 100);
```

Next, before we can start checking inputs from the user, we need to make a function to verify if the *guessed number* is close to the *rand_number*. We're going to call this function "verify_number", however you can name it whatever you like.

```typescript
function verify_number(guess: int): bool {
    // ...
}
```

Now we need to implement the checking for each guess, we're going to use some simple logic operations for this. If `guess` is higher than `rand_number` we will print "Guess is too high.", and if the guess is too low, we will print "Guess is too low".

```typescript
if (guess > rand_number) {
    println("Guess is too high.");
} else if (guess < rand_number) {
    println("Guess is too low.");
} else if (guess === rand_number) {
    return true;
}
return false;
```

Great, we have the logic implemented, now we need to get an input from the user, and check if the input is equal to `rand_number`, if it is, end the program with a "GG, the number was: <number>". However in order to keep the game running, we're going to wrap this logic in a loop, and end when the verify_number function returns "true". We'll do this by using TypeSharp's standard `input` function from `std.io.util.input`, however we will import all io utilities with `use std.io.util`, so add this import to the top of your program now.

```typescript
function game_loop(): void {
    const guess: int = input("Guess a number from 1 - 100: ") ?? 0;
    const end_game: bool = verify_number(guess);
    if (end_game) {
        println("GG, the number was: " . rand_number);
    } else {
        game_loop();
    }
}
```

With this completed, we can simply invoke the `game_loop` function by using the `@main` decorator in TypeSharp; and after we do this our simple guessing program should now be complete! The final product should look similar to the following.

```typescript
use std.math;
use std.io.util;

const rand_number: int = rand(0, 100);

function verify_number(guess: int): bool {
    if (guess > rand_number) {
        println("Guess is too high.");
    } else if (guess < rand_number) {
        println("Guess is too low.");
    } else if (guess === rand_number) {
        return true;
    }
    return false;
}

@main
function game_loop(): void {
    const guess: int = input("Guess a number from 1 - 100: ") ?? 0;
    const end_game: bool = verify_number(guess);
    if (end_game) {
        println("GG, the number was: " . rand_number);
    } else {
        game_loop();
    }
}
```

## Running our program

There are multiple ways to run a TypeSharp program, you could either do the first, and most recommended solution for production, aka the one you learned in the [Hello World]() example; or you can make use of `ts run`, which will run a "script" or "package" given the command was ran properly, syntax can be seen in **Block.1** or can use the command `ts compile` from the previous guide.

##### Block.1

You will need to first open a terminal in your project's [parent directory]() and execute the following command for this to work:

```shell
ts run .
```

We used `ts compile` and execute the binary in the bin directory in your project, however your final solution should be similar to:

![](https://i.imgur.com/GD3rVAP.gif)