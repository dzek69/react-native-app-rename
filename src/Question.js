import readline from "readline";

class Question {
    _createIfNeeded() {
        if (!this._cli) {
            this._cli = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
        }
    }

    ask(question, defaultValue) {
        this._createIfNeeded();
        return new Promise(resolve => {
            const def = defaultValue ? ` [${defaultValue}]` : "";
            this._cli.question(`${question}?${def} `, response => {
                const resp = response.trim();
                resolve(resp || defaultValue || "");
            });
        });
    }

    close() {
        if (this._cli) {
            this._cli.close();
            this._cli = null;
        }
    }
}

export default Question;
