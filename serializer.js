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
      current_version: Buffer.from(forkVersion).toString('hex'),
      genesis_validators_root: Buffer.from(genesisValidatorRoot).toString('hex'),
    }))
}

function computeDomain(domainType, domainConfig) {
  console.log(domainType)
  // Create a ForkData Object's hash tree root
  const forkDataRoot = computeForkRoot(domainConfig.CAPELLA_FORK_VERSION, domainConfig.GENESIS_VALIDATORS_ROOT);

  const domain = new Uint8Array(32);
  domain.set(domainType, 0);
  domain.set(forkDataRoot.slice(0, 28), 4);
  return domain;
}

module.exports = { computeDomain, computeForkRoot, VEMSerializer, SigningDataSerializer, ForkDataSerializer }; 
