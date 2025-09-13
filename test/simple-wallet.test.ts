<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Wallet } from 'ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { toHex } from 'hardhat/internal/util/bigint'

=======
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
>>>>>>> Stashed changes
=======
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
>>>>>>> Stashed changes
=======
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
>>>>>>> Stashed changes
import {
  ERC1967Proxy__factory,
  EntryPoint,
  SimpleAccount,
  SimpleAccountFactory__factory,
  SimpleAccount__factory,
  TestCounter,
  TestCounter__factory,
  TestUtil,
  TestUtil__factory,
} from "../typechain";
import {
  HashZero,
  ONE_ETH,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  createAccount,
  createAccountOwner,
  createAddress,
  deployEntryPoint,
  getBalance,
  isDeployed
} from './testutils'
import { fillUserOpDefaults, getUserOpHash, encodeUserOp, signUserOp, packUserOp } from './UserOp'
import { parseEther } from 'ethers/lib/utils'
import { UserOperation } from './UserOperation'
import { JsonRpcProvider } from '@ethersproject/providers'

describe('SimpleAccount', function () {
  let entryPoint: EntryPoint
  let accounts: string[]
  let testUtil: TestUtil
  let accountOwner: Wallet
  const ethersSigner = ethers.provider.getSigner()

  before(async function () {
    entryPoint = await deployEntryPoint()
    accounts = await ethers.provider.listAccounts()
=======
  HashZero,
  deployEntryPoint,
} from "./testutils";
import {
  fillUserOpDefaults,
  getUserOpHash,
  encodeUserOp,
  signUserOp,
  packUserOp,
} from "./UserOp";
import { parseEther } from "ethers/lib/utils";
import { UserOperation } from "./UserOperation";

describe("SimpleAccount", function () {
  let entryPoint: string;
  let accounts: string[];
  let testUtil: TestUtil;
  let accountOwner: Wallet;
  const ethersSigner = ethers.provider.getSigner();

  before(async function () {
    entryPoint = await deployEntryPoint().then((e) => e.address);
    accounts = await ethers.provider.listAccounts();
>>>>>>> Stashed changes
    // ignore in geth.. this is just a sanity test. should be refactored to use a single-account mode..
    if (accounts.length < 2) this.skip();
    testUtil = await new TestUtil__factory(ethersSigner).deploy();
    accountOwner = createAccountOwner();
  });

<<<<<<< Updated upstream
  it('owner should be able to call transfer', async () => {
    const { proxy: account } = await createAccount(ethers.provider.getSigner(), accounts[0], entryPoint.address)
    await ethersSigner.sendTransaction({ from: accounts[0], to: account.address, value: parseEther('2') })
    await account.execute(accounts[2], ONE_ETH, '0x')
  })
  it('other account should not be able to call transfer', async () => {
    const { proxy: account } = await createAccount(ethers.provider.getSigner(), accounts[0], entryPoint.address)
    await expect(account.connect(ethers.provider.getSigner(1)).execute(accounts[2], ONE_ETH, '0x'))
      .to.be.revertedWith('account: not Owner or EntryPoint')
  })
=======
=======
  HashZero,
  deployEntryPoint,
} from "./testutils";
import {
  fillUserOpDefaults,
  getUserOpHash,
  encodeUserOp,
  signUserOp,
  packUserOp,
} from "./UserOp";
import { parseEther } from "ethers/lib/utils";
import { UserOperation } from "./UserOperation";

describe("SimpleAccount", function () {
  let entryPoint: string;
  let accounts: string[];
  let testUtil: TestUtil;
  let accountOwner: Wallet;
  const ethersSigner = ethers.provider.getSigner();

  before(async function () {
    entryPoint = await deployEntryPoint().then((e) => e.address);
    accounts = await ethers.provider.listAccounts();
    // ignore in geth.. this is just a sanity test. should be refactored to use a single-account mode..
    if (accounts.length < 2) this.skip();
    testUtil = await new TestUtil__factory(ethersSigner).deploy();
    accountOwner = createAccountOwner();
  });

>>>>>>> Stashed changes
  it("owner should be able to call transfer", async () => {
    const { proxy: account } = await createAccount(
      ethers.provider.getSigner(),
      accounts[0],
      entryPoint,
    );
    await ethersSigner.sendTransaction({
      from: accounts[0],
      to: account.address,
      value: parseEther("2"),
    });
    await account.execute(accounts[2], ONE_ETH, "0x");
  });
  it("other account should not be able to call transfer", async () => {
    const { proxy: account } = await createAccount(
      ethers.provider.getSigner(),
      accounts[0],
      entryPoint,
    );
    await expect(
      account
        .connect(ethers.provider.getSigner(1))
        .execute(accounts[2], ONE_ETH, "0x"),
    ).to.be.revertedWith("account: not Owner or EntryPoint");
  });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  it("should pack in js the same as solidity", async () => {
    const op = await fillUserOpDefaults({ sender: accounts[0] });
    const encoded = encodeUserOp(op);
    const packed = packUserOp(op);
    expect(await testUtil.encodeUserOp(packed)).to.equal(encoded);
  });

=======
  HashZero,
  deployEntryPoint,
} from "./testutils";
import {
  fillUserOpDefaults,
  getUserOpHash,
  encodeUserOp,
  signUserOp,
  packUserOp,
} from "./UserOp";
import { parseEther } from "ethers/lib/utils";
import { UserOperation } from "./UserOperation";

describe("SimpleAccount", function () {
  let entryPoint: string;
  let accounts: string[];
  let testUtil: TestUtil;
  let accountOwner: Wallet;
  const ethersSigner = ethers.provider.getSigner();

  before(async function () {
    entryPoint = await deployEntryPoint().then((e) => e.address);
    accounts = await ethers.provider.listAccounts();
    // ignore in geth.. this is just a sanity test. should be refactored to use a single-account mode..
    if (accounts.length < 2) this.skip();
    testUtil = await new TestUtil__factory(ethersSigner).deploy();
    accountOwner = createAccountOwner();
  });

  it("owner should be able to call transfer", async () => {
    const { proxy: account } = await createAccount(
      ethers.provider.getSigner(),
      accounts[0],
      entryPoint,
    );
    await ethersSigner.sendTransaction({
      from: accounts[0],
      to: account.address,
      value: parseEther("2"),
    });
    await account.execute(accounts[2], ONE_ETH, "0x");
  });
  it("other account should not be able to call transfer", async () => {
    const { proxy: account } = await createAccount(
      ethers.provider.getSigner(),
      accounts[0],
      entryPoint,
    );
    await expect(
      account
        .connect(ethers.provider.getSigner(1))
        .execute(accounts[2], ONE_ETH, "0x"),
    ).to.be.revertedWith("account: not Owner or EntryPoint");
  });

  it("should pack in js the same as solidity", async () => {
    const op = await fillUserOpDefaults({ sender: accounts[0] });
    const encoded = encodeUserOp(op);
    const packed = packUserOp(op);
    expect(await testUtil.encodeUserOp(packed)).to.equal(encoded);
  });

>>>>>>> Stashed changes
  describe("#executeBatch", () => {
    let account: SimpleAccount;
    let counter: TestCounter;
    before(async () => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      ({ proxy: account } = await createAccount(ethersSigner, await ethersSigner.getAddress(), entryPoint.address))
      counter = await new TestCounter__factory(ethersSigner).deploy()
    })

    it('should allow transfer value', async () => {
      const counterJustEmit = await counter.populateTransaction.justemit().then(tx => tx.data!)
      const target = createAddress()
      await ethersSigner.sendTransaction({ from: accounts[0], to: account.address, value: parseEther('2') })
      const rcpt = await account.executeBatch([
        { target: target, value: ONE_ETH, data: '0x' },
        { target: counter.address, value: 0, data: counterJustEmit }
      ]).then(async t => await t.wait())
      expect(await ethers.provider.getBalance(target)).to.equal(ONE_ETH)
      const targetLogs = await counter.queryFilter(counter.filters.CalledFrom(), rcpt.blockHash)
      expect(targetLogs.length).to.eq(1)
    })
  })
=======
      ({ proxy: account } = await createAccount(
        ethersSigner,
        await ethersSigner.getAddress(),
        entryPoint,
      ));
      counter = await new TestCounter__factory(ethersSigner).deploy();
    });

    it("should allow zero value array", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      const rcpt = await account
        .executeBatch(
          [counter.address, counter.address],
          [],
          [counterJustEmit, counterJustEmit],
        )
        .then(async (t) => await t.wait());
      const targetLogs = await counter.queryFilter(
        counter.filters.CalledFrom(),
        rcpt.blockHash,
      );
      expect(targetLogs.length).to.eq(2);
    });

    it("should allow transfer value", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      const target = createAddress();
      await ethersSigner.sendTransaction({
        from: accounts[0],
        to: account.address,
        value: parseEther("2"),
      });
      const rcpt = await account
        .executeBatch(
          [target, counter.address],
          [ONE_ETH, 0],
          ["0x", counterJustEmit],
        )
        .then(async (t) => await t.wait());
      expect(await ethers.provider.getBalance(target)).to.equal(ONE_ETH);
      const targetLogs = await counter.queryFilter(
        counter.filters.CalledFrom(),
        rcpt.blockHash,
      );
      expect(targetLogs.length).to.eq(1);
    });

    it("should fail with wrong array length", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      await expect(
        account.executeBatch(
          [counter.address, counter.address],
          [0],
          [counterJustEmit, counterJustEmit],
        ),
      ).to.be.revertedWith("wrong array lengths");
    });
  });
>>>>>>> Stashed changes

  describe("#validateUserOp", () => {
    let account: SimpleAccount;
    let userOp: UserOperation;
    let userOpHash: string;
    let preBalance: number;
    let expectedPay: number;

=======
      ({ proxy: account } = await createAccount(
        ethersSigner,
        await ethersSigner.getAddress(),
        entryPoint,
      ));
      counter = await new TestCounter__factory(ethersSigner).deploy();
    });

    it("should allow zero value array", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      const rcpt = await account
        .executeBatch(
          [counter.address, counter.address],
          [],
          [counterJustEmit, counterJustEmit],
        )
        .then(async (t) => await t.wait());
      const targetLogs = await counter.queryFilter(
        counter.filters.CalledFrom(),
        rcpt.blockHash,
      );
      expect(targetLogs.length).to.eq(2);
    });

    it("should allow transfer value", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      const target = createAddress();
      await ethersSigner.sendTransaction({
        from: accounts[0],
        to: account.address,
        value: parseEther("2"),
      });
      const rcpt = await account
        .executeBatch(
          [target, counter.address],
          [ONE_ETH, 0],
          ["0x", counterJustEmit],
        )
        .then(async (t) => await t.wait());
      expect(await ethers.provider.getBalance(target)).to.equal(ONE_ETH);
      const targetLogs = await counter.queryFilter(
        counter.filters.CalledFrom(),
        rcpt.blockHash,
      );
      expect(targetLogs.length).to.eq(1);
    });

    it("should fail with wrong array length", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      await expect(
        account.executeBatch(
          [counter.address, counter.address],
          [0],
          [counterJustEmit, counterJustEmit],
        ),
      ).to.be.revertedWith("wrong array lengths");
    });
  });

  describe("#validateUserOp", () => {
    let account: SimpleAccount;
    let userOp: UserOperation;
    let userOpHash: string;
    let preBalance: number;
    let expectedPay: number;

>>>>>>> Stashed changes
=======
      ({ proxy: account } = await createAccount(
        ethersSigner,
        await ethersSigner.getAddress(),
        entryPoint,
      ));
      counter = await new TestCounter__factory(ethersSigner).deploy();
    });

    it("should allow zero value array", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      const rcpt = await account
        .executeBatch(
          [counter.address, counter.address],
          [],
          [counterJustEmit, counterJustEmit],
        )
        .then(async (t) => await t.wait());
      const targetLogs = await counter.queryFilter(
        counter.filters.CalledFrom(),
        rcpt.blockHash,
      );
      expect(targetLogs.length).to.eq(2);
    });

    it("should allow transfer value", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      const target = createAddress();
      await ethersSigner.sendTransaction({
        from: accounts[0],
        to: account.address,
        value: parseEther("2"),
      });
      const rcpt = await account
        .executeBatch(
          [target, counter.address],
          [ONE_ETH, 0],
          ["0x", counterJustEmit],
        )
        .then(async (t) => await t.wait());
      expect(await ethers.provider.getBalance(target)).to.equal(ONE_ETH);
      const targetLogs = await counter.queryFilter(
        counter.filters.CalledFrom(),
        rcpt.blockHash,
      );
      expect(targetLogs.length).to.eq(1);
    });

    it("should fail with wrong array length", async () => {
      const counterJustEmit = await counter.populateTransaction
        .justemit()
        .then((tx) => tx.data!);
      await expect(
        account.executeBatch(
          [counter.address, counter.address],
          [0],
          [counterJustEmit, counterJustEmit],
        ),
      ).to.be.revertedWith("wrong array lengths");
    });
  });

  describe("#validateUserOp", () => {
    let account: SimpleAccount;
    let userOp: UserOperation;
    let userOpHash: string;
    let preBalance: number;
    let expectedPay: number;

>>>>>>> Stashed changes
    const actualGasPrice = 1e9;
    // for testing directly validateUserOp, we initialize the account with EOA as entryPoint.
    let entryPointEoa: string;

    before(async () => {
      entryPointEoa = accounts[2];
      const epAsSigner = await ethers.getSigner(entryPointEoa);

      // cant use "SimpleAccountFactory", since it attempts to increment nonce first
      const implementation = await new SimpleAccount__factory(
        ethersSigner,
      ).deploy(entryPointEoa);
      const proxy = await new ERC1967Proxy__factory(ethersSigner).deploy(
        implementation.address,
        "0x",
      );
      account = SimpleAccount__factory.connect(proxy.address, epAsSigner);

      await ethersSigner.sendTransaction({
        from: accounts[0],
        to: account.address,
        value: parseEther("0.2"),
      });
      const callGasLimit = 200000;
      const verificationGasLimit = 100000;
      const maxFeePerGas = 3e9;
      const chainId = await ethers.provider
        .getNetwork()
        .then((net) => net.chainId);

      userOp = signUserOp(
        fillUserOpDefaults({
          sender: account.address,
          callGasLimit,
          verificationGasLimit,
          maxFeePerGas,
        }),
        accountOwner,
        entryPointEoa,
        chainId,
      );

      userOpHash = await getUserOpHash(userOp, entryPointEoa, chainId);

      expectedPay = actualGasPrice * (callGasLimit + verificationGasLimit);

      preBalance = await getBalance(account.address);
      const packedOp = packUserOp(userOp);
      const ret = await account.validateUserOp(
        packedOp,
        userOpHash,
        expectedPay,
        { gasPrice: actualGasPrice },
      );
      await ret.wait();
    });

    it("should pay", async () => {
      const postBalance = await getBalance(account.address);
      expect(preBalance - postBalance).to.eql(expectedPay);
    });

    it("should return NO_SIG_VALIDATION on wrong signature", async () => {
      const userOpHash = HashZero;
      const packedOp = packUserOp(userOp);
      const deadline = await account.callStatic.validateUserOp(
        { ...packedOp, nonce: 1 },
        userOpHash,
        0,
      );
      expect(deadline).to.eq(1);
    });
  });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  context('SimpleAccountFactory', () => {
    it('should reject calls coming from any address that is not SenderCreator', async () => {
      const ownerAddr = createAddress()
      let deployer = await new SimpleAccountFactory__factory(ethersSigner).deploy(entryPoint.address)
      await expect(deployer.createAccount(ownerAddr, 1234))
        .to.be.revertedWith('only callable from SenderCreator')

      // switch deployer contract to an impersonating signer
      const senderCreator = await entryPoint.senderCreator()
      await (ethersSigner.provider as JsonRpcProvider).send('hardhat_setBalance', [senderCreator, toHex(100e18)])
      const senderCreatorSigner = await ethers.getImpersonatedSigner(senderCreator)
      deployer = deployer.connect(senderCreatorSigner)

      const target = await deployer.callStatic.createAccount(ownerAddr, 1234)
      expect(await isDeployed(target)).to.eq(false)
      await deployer.createAccount(ownerAddr, 1234)
      expect(await isDeployed(target)).to.eq(true)
    })
  })
})
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  context("SimpleAccountFactory", () => {
    it("sanity: check deployer", async () => {
      const ownerAddr = createAddress();
      const deployer = await new SimpleAccountFactory__factory(
        ethersSigner,
      ).deploy(entryPoint);
      const target = await deployer.callStatic.createAccount(ownerAddr, 1234);
      expect(await isDeployed(target)).to.eq(false);
      await deployer.createAccount(ownerAddr, 1234);
      expect(await isDeployed(target)).to.eq(true);
    });
  });
});
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
