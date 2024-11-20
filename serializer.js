const { ContainerType, ByteVectorType, UintNumberType } = require('@chainsafe/ssz');

const VEMSerializer = new ContainerType(
  {
    epoch: new UintNumberType(8),
    validatorIndex: new UintNumberType(8),
  },
  { typeName: "VoluntaryExit", jsonCase: "eth2", cachePermanentRootStruct: true }
);

const SigningDataSerializer = new ContainerType(
  {
    objectRoot: new ByteVectorType(32),
    domain: new ByteVectorType(32),
  },
  { typeName: 'SigningData', jsonCase: 'eth2' },
);

const ForkDataSerializer = new ContainerType(
  {
    currentVersion: new ByteVectorType(4),
    genesisValidatorsRoot: new ByteVectorType(32),
  },
  { typeName: 'ForkData', jsonCase: 'eth2' },
);

function computeForkRoot(forkVersion, genesisValidatorRoot) {
  return ForkDataSerializer.hashTreeRoot(
    ForkDataSerializer.fromJson({
      current_version: forkVersion,
      genesis_validators_root: genesisValidatorRoot,
    }))
}

function computeDomain(domainType, domainConfig) {
  // Create a ForkData Object's hash tree root
  const forkDataRoot = computeForkRoot(domainConfig.CAPELLA_FORK_VERSION, domainConfig.GENESIS_VALIDATORS_ROOT);

  const domain = new Uint8Array(32);
  domain.set(domainType, 0);
  domain.set(forkDataRoot.slice(0, 28), 4);
  return domain;
}

module.exports = { computeDomain, computeForkRoot, VEMSerializer, SigningDataSerializer, ForkDataSerializer }; 
