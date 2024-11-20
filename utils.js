function fromHex(hex) {
    if (typeof hex !== "string") {
        throw new Error(`hex argument type ${typeof hex} must be of type string`);
    }

    if (hex.startsWith("0x")) {
        hex = hex.slice(2);
    }

    if (hex.length % 2 !== 0) {
        throw new Error(`hex string length ${hex.length} must be multiple of 2`);
    }

    const b = Buffer.from(hex, "hex");
    return new Uint8Array(b.buffer, b.byteOffset, b.length);
}

module.exports = { fromHex };