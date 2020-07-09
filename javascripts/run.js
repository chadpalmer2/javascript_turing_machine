function initialize() {
    form = document.querySelector("form")

    form.addEventListener("submit", function(event) {
        Printer.clear()

        let ruleset = JSON.parse(form.elements['ruleset'].value)
        let tape = new Tape(form.elements['tape'].value)
        let head = new Head(form.elements['head'].value)

        m = new Machine(ruleset, tape, head)
        m.run()

        event.preventDefault()
    })
}

initialize()

