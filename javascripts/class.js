class Head {
    constructor(string) {
        let parsed = Head.parse(string)
        let state = parsed[0]
        let location = parsed[1]
        this.update(state, location)
    }

    get status() {
        return `head state: ${this.state} | location: ${this.location}`
    }

    update(state, location) {
        this.state = state
        this.location = location
    }

    static parse(string) {
        let parsed = string.split(" ")
        parsed[1] = parseInt(parsed[1])
        return parsed
    }
}

class Tape {
    constructor(string) {
        this.tape = Tape.parse(string)
    }

    get status() {
        return this.tape.join(" ")
    }

    extendLeft() {
        this.tape.unshift("B")
    }

    extendRight() {
        this.tape.push("B")
    }

    write(symbol, location) {
        this.tape[location] = symbol
    }

    static parse(string) {
        return string.split(" ")
    }
}

class Machine {
    constructor(ruleset, tape, head) {
        this.ruleset = ruleset
        this.tape = tape
        this.head = head
    }

    get status() {
        return this.tape.status + " || " + this.head.status
    }

    shiftHead(move) {
        if (this.head.location == 0 && move == "L") {
            this.tape.extendLeft()
        } else if (this.head.location == this.tape.tape.length - 1 && move == "R") {
            this.tape.extendRight()
            this.head.location += 1
        } else if (move == "L") {
            this.head.location -= 1
        } else {
            this.head.location += 1
        }
    }

    stepLookup() {
        if (this.ruleset[this.head.state] && this.ruleset[this.head.state][this.tape.tape[this.head.location]]) {
            return this.ruleset[this.head.state][this.tape.tape[this.head.location]]
        } else {
            return false
        }
    }

    step() {
        let new_state = this.stepLookup()[0]
        let new_symbol = this.stepLookup()[1]
        let move = this.stepLookup()[2]

        this.tape.write(new_symbol, this.head.location)
        this.head.state = new_state
        this.shiftHead(move)
    }

    run() {
        while ( this.stepLookup() ) {
            Printer.print(this.status)
            this.step()
        }

        Printer.print(this.status)
        Printer.print("halt")
    }
}

class Printer {
    static print(string) {
        let div = document.querySelector("div")
        let p = document.createElement("p")
        p.innerText = string
        div.appendChild(p)
    }

    static clear() {
        let div = document.querySelector("div")
        div.innerHTML = ""
    }
}