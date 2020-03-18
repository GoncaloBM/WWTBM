// No need to import react since you don't use JSX here.
import React from "react";

function decoding(input='') {
    return input.replace(/&#039;/g, "'").replace(/&quot;/g, `"`)
}

export default decoding