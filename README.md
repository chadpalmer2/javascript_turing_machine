# Javascript Turing Machine

This is a Javascript implementation of a Turing machine, a demonstration that Javascript is a Turing-complete language.

# About

See this blog post to learn more about my motivations for creating this, and the process behind it.

# Get Started

First, clone down this repository. You will find a single index.html file, which can be launched via http-server or just opened in your browser of choice.

# Usage

I intentionally made this implementation as basic as possible, as this is mostly a proof of concept. There are no safeguards in place preventing infinite loops. Read my blog post linked above to learn more about how Turing machines work and their implications.

Rulesets should be formatted in JSON, where the first layer of keys are the state of the head, the second layer of keys are the symbol the head reads, and each of these second layer keys points to an array of three strings indicating the state the head changes to, the symbol it writes, and the direct it moves, in that order. Recall that this notation requires double quotes. See examples below.

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
