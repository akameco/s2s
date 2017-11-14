// @flow

type A = { a: string, b: number }

function helloA(a: A) {}

type B = number

function helloB(b: B) {}

type C = { a: string, b: number }

function helloC({ a }: C) {}

function helloD() {}

function helloE(e) {}
