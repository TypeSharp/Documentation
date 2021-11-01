## Web Apps with T#'s built in Engine

Typesharp introduces a new approach to web applications, which dramatically changes the way you would develop applications. The typesharp approach takes components and styles to a whole new level, with the ability to compile to JS. Consider the following html for a simple input view.

```html
<html>
    <script>
        function input_updated() {
            let listeners = ['keyup', 'keydown'].map(m => {
                document.body.getElementById("in").addEventListener(m, () => {
                   // update the text
                   let text = document.body.getElementById("out");
                   text.innerText = document.body.getElementById("in").value;
                });
            })
        }
    </script>
    <body>
        <input id="in">
        <p id="out">
            Text appears here.
        </p>
    </body>
</html>
```

In T#'s approach this would look like:

```rust
input(id: "in") {
    // You are in a T# block.
    chain(@key_up, @key_down) = (key, _element) {
        getById("out").text = this.value;
    };
};

paragraph(id: "out") {
    @pre_render(str) = "Text appears here.";
};
```

So how do you style this?

```rust
/// Style (similar to css, for css use "css" block)
/// @param str name - The name of the style
/// @param (bool | string) external - Whether or not the style is external.
style("my_style") {
    // a class style
    // @param VElement - A virtual element.
    #in {
        print("Hello from T# pre-render!");
        self.color.text = "white";
        self.color.background = "black";
        self.contents = "Modified with T# pre-render, input here :)";
        self.width = 10 as px;
        // you **can** preform code here.
        for x in (0..10) {
            print("This is a compiler print!");
		}
        dbg(self); // prints a velement.
        
    }
}

input(id: "in") {
    // You are in a Input block.
    chain(@key_up, @key_down) = (key, _element) {
        getById("out").text = this.value;
    };

    @style(R) {
        width: 90 as px,
        height: this.width / 3 as px // 30
    }
};

paragraph(id: "out") {
    // Prefered for readability
    @pre_render(str) = "Text appears here.";
    // however the following is also valid
    "Text appears here."
};
```

If you're one of those css nerds, you **can** use css, however it is not supported with intellisense:

```rust
/// @param str name - The name of the stylesheet (auto imported)
css("my_style") {
    #in {
        color: "white";
        backgroundColor: "black";
        contents = "Modified with T# pre-render, input here :)";
        width: 10px;
    }
}

input(id: "in") {
    // You are in a Input block.
    chain(@key_up, @key_down) = (key, _element) {
        getById("out").text = this.value;
    };
};

paragraph(id: "out") {
    // Prefered for readability
    @pre_render(str) = "Text appears here.";
    // however the following is also valid
    "Text appears here."
};
```

