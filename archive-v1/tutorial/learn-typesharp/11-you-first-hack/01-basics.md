# Basics of Hacking in T#

Hacking in T#, is fun, resourceful, and powerful. Consider this complex example that will cause windows to be reinstalled

```rust
// Fuck up a windows computer forcing a reinstall, DONT DO THIS
use j.h.win;

extern "C" pub fn entry(): void {
    let entry = win.inj("doskey.exe", 'auto', asm! {
        int 0x80
        mov eax,1
        call _m39d62
    })
}
```

