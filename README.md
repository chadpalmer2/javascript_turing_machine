# Javascript Turing Machine

This is a Javascript implementation of a Turing machine, a demonstration that Javascript is a Turing-complete language.

# About

See [this blog post](https://medium.com/@chad.palmer/a-complete-web-page-building-a-turing-machine-in-javascript-d6c32d3708c4?source=friends_link&sk=7569f7204799328c676614eb1b992830) to learn more about my motivations for creating this, and the process behind it.

# Get Started

First, clone down this repository. You will find a single index.html file, which can be launched via http-server or just opened in your browser of choice.

# Usage

I intentionally made this implementation as basic as possible, as this is mostly a proof of concept. There are no safeguards in place preventing infinite loops. Read my blog post linked above to learn more about how Turing machines work and their implications.

Rulesets should be formatted in JSON, where the first layer of keys are the state of the head, the second layer of keys are the symbol the head reads, and each of these second layer keys points to an array of three strings indicating the state the head changes to, the symbol it writes, and the direction it moves, in that order. Recall that this notation requires double quotes. See examples below.

Tapes should be formatted as symbols separated by spaces. B is the blank symbol, and will implicitly occupy any of the infinite (disregarding memory limitations) tape you do not specify. An example is `B 1 0 A B`.

The initial setting of the head should be the initial state followed by the initial placement, separated by a space. An example is `s1 4`.

Any characters are permitted.

# Examples

Here is a ruleset implementing a incrementer function. It will add one to a binary string. Initialize the head at `s1 0`.

```javascript

{
    "s1": {
        "0": ["s1", "0", "R"],
        "1": ["s1", "1", "R"],
        "B": ["s2", "B", "L"]
    },
    "s2": {
        "0": ["s3", "1", "L"],
        "1": ["s2", "0", "L"],
        "B": ["s3", "1", "L"]
    },
    "s3": {
        "0": ["s3", "0", "L"],
        "1": ["s3", "1", "L"],
        "B": ["sh", "B", "R"]
    }
}

```

And here is a binary adder. Separate the two numbers with a blank and initialize the head at the nonblank space farthest to the right.

```javascript

{
    "s1": {
        "B": ["s9", "B", "L"],
        "0": ["s7", "B", "L"],
        "1": ["s2", "B", "L"]
    },
    "s2": {
        "B": ["s3", "B", "L"],
        "0": ["s2", "0", "L"],
        "1": ["s2", "1", "L"],
        "x": ["s2", "x", "L"],
        "y": ["s2", "y", "L"]
    },
    "s3": {
        "B": ["s5", "y", "R"],
        "0": ["s5", "y", "R"],
        "1": ["s4", "x", "L"],
        "x": ["s3", "x", "L"],
        "y": ["s3", "y", "L"]
    },
    "s4": {
        "B": ["s5", "1", "R"],
        "0": ["s5", "1", "R"],
        "1": ["s4", "0", "L"]
    },
    "s5": {
        "B": ["s6", "B", "R"],
        "0": ["s5", "0", "R"],
        "1": ["s5", "1", "R"],
        "x": ["s5", "x", "R"],
        "y": ["s5", "y", "R"]
    },
    "s6": {
        "B": ["s1", "B", "L"],
        "0": ["s6", "0", "R"],
        "1": ["s6", "1", "R"],
        "x": ["s6", "x", "R"],
        "y": ["s6", "y", "R"]
    },
    "s7": {
        "B": ["s8", "B", "L"],
        "0": ["s7", "0", "L"],
        "1": ["s7", "1", "L"],
        "x": ["s7", "x", "L"],
        "y": ["s7", "y", "L"]
    },
    "s8": {
        "B": ["s5", "x", "R"],
        "0": ["s5", "x", "R"],
        "1": ["s5", "y", "R"],
        "x": ["s8", "x", "L"],
        "y": ["s8", "y", "L"]
    },
    "s9": {
        "B": ["s10", "B", "R"],
        "0": ["s10", "0", "R"],
        "1": ["s10", "1", "R"],
        "x": ["s9", "0", "L"],
        "y": ["s9", "1", "L"]
    },
    "s10": {
        "B": ["sh", "B", "L"],
        "0": ["s10", "0", "R"],
        "1": ["s10", "1", "R"],
        "x": ["s10", "x", "R"],
        "y": ["s10", "y", "R"]
    }
}

```