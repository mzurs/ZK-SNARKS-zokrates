const { initialize } = require('zokrates-js')
initialize().then((zokratesProvider) => {
    const source = "def main(private field a) -> field { return a * a; }";
    // console.log()

    // compilation
    const artifacts = zokratesProvider.compile(source);
    // console.log(artifacts)

    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, ["2"]);
// console.log(witness,output)
    // run setup
    const keypair = zokratesProvider.setup(artifacts.program);
    // console.log(keypair)

    // generate proof
    const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
    console.log(proof)

    // export solidity verifier
    const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
    console.log()

    // or verify off-chain
    const isVerified = zokratesProvider.verify(keypair.vk, proof);
    console.log(isVerified)
});
