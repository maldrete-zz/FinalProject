# brace-extra

This is a collection of extra modes for the [brace](https://github.com/thlorenz/brace).

## Installation

    npm install brace-extra

## Provided extra modes

For now this package provides the following modes:

    ljson:   Loose JSON (JSON with a loose format requirement)
    locale:  Locale strings format (simple lines of: "key": "value")

## Usage with the ng2-ace-editor library

You only need to import the appropriate file for the wanted mode:

    import 'brace-extra/mode/ljson';
