import { before } from "mocha";
import {
  EntryPoint,
  TestExecAccount,
  TestExecAccount__factory,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  TestExecAccountFactory__factory
} from '../typechain'
import { createAccountOwner, deployEntryPoint, fund } from './testutils'
import { fillSignAndPack } from './UserOp'
import { Signer, Wallet } from 'ethers'
import { ethers } from 'hardhat'
import { defaultAbiCoder, hexConcat, hexStripZeros } from 'ethers/lib/utils'
import { expect } from 'chai'
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  TestExecAccountFactory__factory,
} from "../typechain";
import {
  createAccountOwner,
  deployEntryPoint,
  fund,
  objdump,
} from "./testutils";
import { fillSignAndPack } from "./UserOp";
import { Signer, Wallet } from "ethers";
import { ethers } from "hardhat";
import { defaultAbiCoder, hexConcat, hexStripZeros } from "ethers/lib/utils";
import { expect } from "chai";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

describe("IAccountExecute", () => {
  let ethersSigner: Signer;
  let entryPoint: EntryPoint;
  let account: TestExecAccount;
  let owner: Wallet;
  before(async () => {
    const provider = ethers.provider;
    ethersSigner = provider.getSigner();
    entryPoint = await deployEntryPoint();
    const factory = await new TestExecAccountFactory__factory(
      ethersSigner,
    ).deploy(entryPoint.address);
    owner = createAccountOwner();
    await factory.createAccount(owner.getAddress(), 0);
    const accountAddress = await factory.callStatic.createAccount(
      owner.getAddress(),
      0,
    );
    account = TestExecAccount__factory.connect(accountAddress, provider);
    await fund(accountAddress);
  });

  it("should execute  ", async () => {
    const execSig = account.interface.getSighash("executeUserOp");
    // innerCall, as TestExecAccount.executeUserOp will try to decode it:
    const innerCall = defaultAbiCoder.encode(
      ["address", "bytes"],
      [account.address, account.interface.encodeFunctionData("entryPoint")],
    );

    const userOp = await fillSignAndPack(
      {
        sender: account.address,
        callGasLimit: 100000, // normal estimate also chokes on this callData
        callData: hexConcat([execSig, innerCall]),
      },
      owner,
      entryPoint,
    );

    await entryPoint.handleOps([userOp], ethersSigner.getAddress());

    const e = await account.queryFilter(account.filters.Executed());

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    expect(e.length).to.eq(1, "didn't call inner execUserOp (no Executed event)")
    // validate we retrieved the return value of the called "entryPoint()" function:
    expect(hexStripZeros(e[0].args.innerCallRet)).to.eq(hexStripZeros(entryPoint.address).toLowerCase())
  })
})
=======
    expect(e.length).to.eq(
      1,
      "didn't call inner execUserOp (no Executed event)",
    );
    console.log(e[0].event, objdump(e[0].args));
    // validate we retrieved the return value of the called "entryPoint()" function:
=======
    expect(e.length).to.eq(
      1,
      "didn't call inner execUserOp (no Executed event)",
    );
    console.log(e[0].event, objdump(e[0].args));
    // validate we retrieved the return value of the called "entryPoint()" function:
>>>>>>> Stashed changes
=======
    expect(e.length).to.eq(
      1,
      "didn't call inner execUserOp (no Executed event)",
    );
    console.log(e[0].event, objdump(e[0].args));
    // validate we retrieved the return value of the called "entryPoint()" function:
>>>>>>> Stashed changes
    expect(hexStripZeros(e[0].args.innerCallRet)).to.eq(
      hexStripZeros(entryPoint.address),
    );
  });
});
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
