// ?:   required
// :    not required

function calculateAgeOfUser( user ){
    return new Date().getFullYear() - user.birthYear
}

calculateAgeOfUser('Diego')
calculateAgeOfUser()