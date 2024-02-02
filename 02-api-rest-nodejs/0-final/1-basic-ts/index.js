"use strict";
// ?:   required
// :    not required
function calculateAgeOfUser(user) {
    return new Date().getFullYear() - user.birthYear;
}
calculateAgeOfUser('Diego');
calculateAgeOfUser({
    birthYear: 1994
});
// Runtime Type Checking
// Static Type Checking
// NodeJS doesn't understand TS by default unlike
//  BUN and Deno
// INIT A TS Node project
// npm install typescript
// npx tsc --init
// Convert TS to JS
// npx tsc src/index.ts
