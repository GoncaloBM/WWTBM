import React from "react";

function decoding(input='') {
    return input.replace(/&#039;/g, "'").replace(/&quot;/g, `"`)
}

export default decoding