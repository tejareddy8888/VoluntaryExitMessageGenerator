const { fromHex } = require("./utils");

//https://github.com/ChainSafe/lodestar/blob/25c2ee5e5bc4b062c545447235c03f235871b061/packages/params/src/index.ts#L143
const DOMAIN_VOLUNTARY_EXIT = Uint8Array.from([4, 0, 0, 0]);;

//https://github.com/ChainSafe/lodestar/blob/unstable/packages/config/src/chainConfig/networks/holesky.ts
const holeskyChainConfig = {
    GENESIS_FORK_VERSION: fromHex("0x01017000"),

    // Forking
    // ---------------------------------------------------------------
    // # Altair
    ALTAIR_FORK_VERSION: fromHex("0x02017000"),
    // # Merge

    BELLATRIX_FORK_VERSION: fromHex("0x03017000"),
    // Capella
    CAPELLA_FORK_VERSION: fromHex("0x04017000"),
    // Deneb
    DENEB_FORK_VERSION: fromHex("0x05017000"),

    // https://github.com/ChainSafe/lodestar/blob/25c2ee5e5bc4b062c545447235c03f235871b061/packages/config/src/networks.ts#L36
    GENESIS_VALIDATORS_ROOT: fromHex("0x9143aa7c615a7f7115e2b6aac319c03529df8242ae705fba9df39b79c59fa8b1"),
}

const mainnetChainConfig = {
    GENESIS_FORK_VERSION: fromHex("0x00000000"),

    // Forking
    // Altair
    ALTAIR_FORK_VERSION: fromHex("0x01000000"),
    // Bellatrix
    BELLATRIX_FORK_VERSION: fromHex("0x02000000"),

    // Capella
    CAPELLA_FORK_VERSION: fromHex("0x03000000"),

    // Deneb
    DENEB_FORK_VERSION: fromHex("0x04000000"),

    // ELECTRA
    ELECTRA_FORK_VERSION: fromHex("0x05000000"),

    // https://github.com/ChainSafe/lodestar/blob/25c2ee5e5bc4b062c545447235c03f235871b061/packages/config/src/networks.ts#L36
    GENESIS_VALIDATORS_ROOT: fromHex("0x4b363db94e286120d76eb905340fdd4e54bfe9f06bf33ff6cf5ad27f511bfe95")

}

module.exports = { DOMAIN_VOLUNTARY_EXIT, mainnetChainConfig, holeskyChainConfig }