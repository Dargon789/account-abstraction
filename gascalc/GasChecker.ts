// calculate gas usage of different bundle sizes
import "../test/aa.init";
import { defaultAbiCoder, hexConcat, parseEther } from "ethers/lib/utils";
import {
  AddressZero,
  createAddress,
  createAccountOwner,
  deployEntryPoint,
  decodeRevertReason,
} from "../test/testutils";
import {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  EntryPoint, EntryPoint__factory, SimpleAccountFactory,
  SimpleAccountFactory__factory, SimpleAccount__factory
} from '../typechain'
import { BigNumberish, Wallet } from 'ethers'
import hre from 'hardhat'
import { fillSignAndPack, fillUserOp, packUserOp, signUserOp } from '../test/UserOp'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { table, TableUserConfig } from 'table'
import { Create2Factory } from '../src/Create2Factory'
import * as fs from 'fs'
import { SimpleAccountInterface } from '../typechain/contracts/accounts/SimpleAccount'
import { PackedUserOperation } from '../test/UserOperation'
import { expect } from 'chai'
import Debug from 'debug'

const debug = Debug('aa.gascheck')
=======
  EntryPoint,
  EntryPoint__factory,
  SimpleAccountFactory,
  SimpleAccountFactory__factory,
  SimpleAccount__factory,
} from "../typechain";
import { BigNumberish, Wallet } from "ethers";
import hre from "hardhat";
import {
  fillSignAndPack,
  fillUserOp,
  packUserOp,
  signUserOp,
} from "../test/UserOp";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { table, TableUserConfig } from "table";
import { Create2Factory } from "../src/Create2Factory";
import * as fs from "fs";
import { SimpleAccountInterface } from "../typechain/contracts/samples/SimpleAccount";
import { PackedUserOperation } from "../test/UserOperation";
import { expect } from "chai";
>>>>>>> Stashed changes

const gasCheckerLogFile = "./reports/gas-checker.txt";

<<<<<<< Updated upstream
const ethers = hre.ethers
const provider = hre.ethers.provider
const junkWallet = Wallet.fromMnemonic('test test test test test test test test test test test junk')
const globalSigner = new Wallet(junkWallet.privateKey, provider)
let lastGasUsed: number
=======
=======
  EntryPoint,
  EntryPoint__factory,
  SimpleAccountFactory,
  SimpleAccountFactory__factory,
  SimpleAccount__factory,
} from "../typechain";
import { BigNumberish, Wallet } from "ethers";
import hre from "hardhat";
import {
  fillSignAndPack,
  fillUserOp,
  packUserOp,
  signUserOp,
} from "../test/UserOp";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { table, TableUserConfig } from "table";
import { Create2Factory } from "../src/Create2Factory";
import * as fs from "fs";
import { SimpleAccountInterface } from "../typechain/contracts/samples/SimpleAccount";
import { PackedUserOperation } from "../test/UserOperation";
import { expect } from "chai";

const gasCheckerLogFile = "./reports/gas-checker.txt";

>>>>>>> Stashed changes
const ethers = hre.ethers;
const provider = hre.ethers.provider;
let ethersSigner = provider.getSigner();
let lastGasUsed: number;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const minDepositOrBalance = parseEther("0.1");

const getBalance = hre.ethers.provider.getBalance;

=======
  EntryPoint,
  EntryPoint__factory,
  SimpleAccountFactory,
  SimpleAccountFactory__factory,
  SimpleAccount__factory,
} from "../typechain";
import { BigNumberish, Wallet } from "ethers";
import hre from "hardhat";
import {
  fillSignAndPack,
  fillUserOp,
  packUserOp,
  signUserOp,
} from "../test/UserOp";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { table, TableUserConfig } from "table";
import { Create2Factory } from "../src/Create2Factory";
import * as fs from "fs";
import { SimpleAccountInterface } from "../typechain/contracts/samples/SimpleAccount";
import { PackedUserOperation } from "../test/UserOperation";
import { expect } from "chai";

const gasCheckerLogFile = "./reports/gas-checker.txt";

const ethers = hre.ethers;
const provider = hre.ethers.provider;
let ethersSigner = provider.getSigner();
let lastGasUsed: number;

const minDepositOrBalance = parseEther("0.1");

const getBalance = hre.ethers.provider.getBalance;

>>>>>>> Stashed changes
function range(n: number): number[] {
  return Array(n)
    .fill(0)
    .map((val, index) => index);
}

interface GasTestInfo {
  title: string;
  diffLastGas: boolean;
  paymaster: string;
  count: number;
  // address, or 'random' or 'self' (for account itself)
  dest: string;
  destValue: BigNumberish;
  destCallData: string;
  beneficiary: string;
  gasPrice: number;
}

export const DefaultGasTestInfo: Partial<GasTestInfo> = {
  dest: "self", // destination is the account itself.
  destValue: parseEther("0"),
  destCallData: "0xb0d691fe", // entryPoint()
  gasPrice: 10e9,
};

interface GasTestResult {
  title: string;
  count: number;
  gasUsed: number; // actual gas used
  accountEst: number; // estimateGas of the inner transaction (from EP to account)
  gasDiff?: number; // different from last test's gas used
  receipt?: TransactionReceipt;
}

/**
 * singleton contract used by all GasChecker modules ("tests")
 * init() static method -
 *  - create the singleton the first time (or return its existing instance)
 *  run
 */

// gas estimate of the "execFromSingleton" methods
// we assume a given call signature has the same gas usage
// (TODO: the estimate also depends on contract code. for test purposes, assume each contract implementation has different method signature)
// at the end of the checks, we report the gas usage of all those method calls
const gasEstimatePerExec: {
  [key: string]: { title: string; accountEst: number };
} = {};

/**
 * helper contract to generate gas test.
 * see runTest() method for "test template" info
 * override for different account implementation:
 * - accountInitCode() - the constructor code
 * - accountExec() the account execution method.
 */
export class GasChecker {
  accounts: { [account: string]: Wallet } = {};

  accountOwner: Wallet;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  accountInterface: SimpleAccountInterface
  private locked: boolean
=======
  accountInterface: SimpleAccountInterface;
>>>>>>> Stashed changes
=======
  accountInterface: SimpleAccountInterface;
>>>>>>> Stashed changes
=======
  accountInterface: SimpleAccountInterface;
>>>>>>> Stashed changes

  constructor() {
    this.accountOwner = createAccountOwner();
    this.accountInterface = SimpleAccount__factory.createInterface();
    void GasCheckCollector.init();
  }

  // generate the "exec" calldata for this account
  accountExec(dest: string, value: BigNumberish, data: string): string {
    return this.accountInterface.encodeFunctionData("execute", [
      dest,
      value,
      data,
    ]);
  }

  // generate the account "creation code"
  accountInitCode(factory: SimpleAccountFactory, salt: BigNumberish): string {
    return hexConcat([
      factory.address,
      factory.interface.encodeFunctionData("createAccount", [
        this.accountOwner.address,
        salt,
      ]),
    ]);
  }

  createdAccounts = new Set<string>();

  /**
   * create accounts up to this counter.
   * make sure they all have balance.
   * do nothing for account already created
   * @param count
   */
  async createAccounts1(count: number): Promise<void> {
    const create2Factory = new Create2Factory(this.entryPoint().provider);
    const factoryAddress = await create2Factory.deploy(
      hexConcat([
        SimpleAccountFactory__factory.bytecode,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        defaultAbiCoder.encode(['address'], [this.entryPoint().address])
      ]), 0, 2885201)
    debug('factaddr', factoryAddress)
    const fact = SimpleAccountFactory__factory.connect(factoryAddress, globalSigner)
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        defaultAbiCoder.encode(["address"], [this.entryPoint().address]),
      ]),
      0,
      2885201,
    );
    console.log("factaddr", factoryAddress);
    const fact = SimpleAccountFactory__factory.connect(
      factoryAddress,
      ethersSigner,
    );
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    // create accounts
    const creationOps: PackedUserOperation[] = [];
    for (const n of range(count)) {
      const salt = n;
      // const initCode = this.accountInitCode(fact, salt)

      const addr = await fact.getAddress(this.accountOwner.address, salt);

      if (!this.createdAccounts.has(addr)) {
<<<<<<< Updated upstream
        const codeSize = await provider.getCode(addr).then(code => code.length)
        if (codeSize === 2) {
          // explicit call to fillUseROp with no "entryPoint", to make sure we manually fill everything and
          // not attempt to fill from blockchain.
          const op = signUserOp(await fillUserOp({
            sender: addr,
            initCode: this.accountInitCode(fact, salt),
=======
        // explicit call to fillUseROp with no "entryPoint", to make sure we manually fill everything and
        // not attempt to fill from blockchain.
        const op = signUserOp(
          await fillUserOp({
            sender: addr,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            nonce: 0,
            callGasLimit: 30000,
            verificationGasLimit: 1000000,
            // paymasterAndData: paymaster,
            preVerificationGas: 1,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            maxFeePerGas: 0
          }), this.accountOwner, this.entryPoint().address, await provider.getNetwork().then(net => net.chainId))
          creationOps.push(packUserOp(op))
        }
        this.createdAccounts.add(addr)
      }

      this.accounts[addr] = this.accountOwner
      const accountBalance = await GasCheckCollector.inst.entryPoint.balanceOf(addr)
=======
            maxFeePerGas: 0,
          }),
          this.accountOwner,
          this.entryPoint().address,
          await provider.getNetwork().then((net) => net.chainId),
        );
        creationOps.push(packUserOp(op));
        this.createdAccounts.add(addr);
      }

=======
            maxFeePerGas: 0,
          }),
          this.accountOwner,
          this.entryPoint().address,
          await provider.getNetwork().then((net) => net.chainId),
        );
        creationOps.push(packUserOp(op));
        this.createdAccounts.add(addr);
      }

>>>>>>> Stashed changes
=======
            maxFeePerGas: 0,
          }),
          this.accountOwner,
          this.entryPoint().address,
          await provider.getNetwork().then((net) => net.chainId),
        );
        creationOps.push(packUserOp(op));
        this.createdAccounts.add(addr);
      }

>>>>>>> Stashed changes
      this.accounts[addr] = this.accountOwner;
      // deploy if not already deployed.
      await fact.createAccount(this.accountOwner.address, salt);
      const accountBalance =
        await GasCheckCollector.inst.entryPoint.balanceOf(addr);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      if (accountBalance.lte(minDepositOrBalance)) {
        await GasCheckCollector.inst.entryPoint.depositTo(addr, {
          value: minDepositOrBalance.mul(5),
        });
      }
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    await this.entryPoint().handleOps(creationOps, globalSigner.getAddress())
=======
    await this.entryPoint().handleOps(creationOps, ethersSigner.getAddress());
>>>>>>> Stashed changes
=======
    await this.entryPoint().handleOps(creationOps, ethersSigner.getAddress());
>>>>>>> Stashed changes
=======
    await this.entryPoint().handleOps(creationOps, ethersSigner.getAddress());
>>>>>>> Stashed changes
  }

  /**
   * helper: run a test scenario, and add a table row
   * @param params - test parameters. missing values filled in from DefaultGasTestInfo
   * note that 2 important params are methods: accountExec() and accountInitCode()
   */
  async addTestRow(params: Partial<GasTestInfo>): Promise<void> {
    await GasCheckCollector.init();
    GasCheckCollector.inst.addRow(await this.runTest(params));
  }

  /**
   * run a single test scenario
   * @param params - test parameters. missing values filled in from DefaultGasTestInfo
   * note that 2 important params are methods: accountExec() and accountInitCode()
   */
  async runTest(params: Partial<GasTestInfo>): Promise<GasTestResult> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const info: GasTestInfo = {
      ...DefaultGasTestInfo,
      ...params,
    } as GasTestInfo;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    debug('== running test count=', info.count)
=======
    console.debug("== running test count=", info.count);
>>>>>>> Stashed changes
=======
    console.debug("== running test count=", info.count);
>>>>>>> Stashed changes
=======
    console.debug("== running test count=", info.count);
>>>>>>> Stashed changes

    // fill accounts up to this code.
    await this.createAccounts1(info.count);

    let accountEst: number = 0;
    const userOps = await Promise.all(
      range(info.count)
        .map((index) => Object.entries(this.accounts)[index])
        .map(async ([account, accountOwner]) => {
          const paymaster = info.paymaster;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        let { dest, destValue, destCallData } = info
        if (dest === 'self') {
          dest = account
        } else if (dest === 'random') {
          dest = createAddress()
          const destBalance = await getBalance(dest)
          if (destBalance.eq(0)) {
            debug('dest replenish', dest)
            await globalSigner.sendTransaction({ to: dest, value: 1 })
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          let { dest, destValue, destCallData } = info;
          if (dest === "self") {
            dest = account;
          } else if (dest === "random") {
            dest = createAddress();
            const destBalance = await getBalance(dest);
            if (destBalance.eq(0)) {
              console.log("dest replenish", dest);
              await ethersSigner.sendTransaction({ to: dest, value: 1 });
            }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          }
          const accountExecFromEntryPoint = this.accountExec(
            dest,
            destValue,
            destCallData,
          );
<<<<<<< Updated upstream
<<<<<<< Updated upstream

          // remove the "dest" from the key to the saved estimations
          // so we have a single estimation per method.
          const estimateGasKey = this.accountExec(
            AddressZero,
            destValue,
            destCallData,
          );

          let est = gasEstimatePerExec[estimateGasKey];
          // technically, each UserOp needs estimate - but we know they are all the same for each test.
          if (est == null) {
            const accountEst = (
              await ethers.provider.estimateGas({
                from: GasCheckCollector.inst.entryPoint.address,
                to: account,
                data: accountExecFromEntryPoint,
              })
            ).toNumber();
            est = gasEstimatePerExec[estimateGasKey] = {
              accountEst,
              title: info.title,
            };
          }
          // console.debug('== account est=', accountEst.toString())
          accountEst = est.accountEst;
          const op = await fillSignAndPack(
            {
              sender: account,
              callData: accountExecFromEntryPoint,
              maxPriorityFeePerGas: info.gasPrice,
              maxFeePerGas: info.gasPrice,
              callGasLimit: accountEst,
              verificationGasLimit: 1000000,
              paymaster: paymaster,
              paymasterVerificationGasLimit: 50000,
              paymasterPostOpGasLimit: 50000,
              preVerificationGas: 1,
            },
            accountOwner,
            GasCheckCollector.inst.entryPoint,
          );
          // const packed = packUserOp(op, false)
          // console.log('== packed cost=', callDataCost(packed), packed)
          return op;
        }),
    );

    const txdata =
      GasCheckCollector.inst.entryPoint.interface.encodeFunctionData(
        "handleOps",
        [userOps, info.beneficiary],
      );
    console.log("=== encoded data=", txdata.length);
    const gasEst = await GasCheckCollector.inst.entryPoint.estimateGas
      .handleOps(userOps, info.beneficiary, {})
      .catch((e) => {
        const data = e.error?.data?.data ?? e.error?.data;
        if (data != null) {
          const e1 =
            GasCheckCollector.inst.entryPoint.interface.parseError(data);
          throw new Error(`${e1.name}(${e1.args?.toString()})`);
        }
        throw e;
      });
    const ret = await GasCheckCollector.inst.entryPoint.handleOps(
      userOps,
      info.beneficiary,
      { gasLimit: gasEst.mul(3).div(2) },
    );
    const rcpt = await ret.wait();
    const gasUsed = rcpt.gasUsed.toNumber();
    const countSuccessOps = rcpt.events?.filter(
      (e) => e.event === "UserOperationEvent" && e.args?.success,
    ).length;

<<<<<<< Updated upstream
        // remove the "dest" from the key to the saved estimations
        // so we have a single estimation per method.
        const estimateGasKey = this.accountExec(AddressZero, destValue, destCallData)

        let est = gasEstimatePerExec[estimateGasKey]
        // technically, each UserOp needs estimate - but we know they are all the same for each test.
        if (est == null) {
          const accountEst = (await ethers.provider.estimateGas({
            from: GasCheckCollector.inst.entryPoint.address,
            to: account,
            data: accountExecFromEntryPoint
          })).toNumber()
          est = gasEstimatePerExec[estimateGasKey] = { accountEst, title: info.title }
        }
        // console.debug('== account est=', accountEst.toString())
        accountEst = est.accountEst
        while (this.locked) {
          await new Promise(resolve => setTimeout(resolve, 1))
        }
        try {
          this.locked = true

          const op = await fillSignAndPack({
            sender: account,
            callData: accountExecFromEntryPoint,
            maxPriorityFeePerGas: info.gasPrice,
            maxFeePerGas: info.gasPrice,
            callGasLimit: accountEst,
            verificationGasLimit: 1000000,
            paymaster: paymaster,
            paymasterVerificationGasLimit: 50000,
            paymasterPostOpGasLimit: 50000,
            preVerificationGas: 1
          }, accountOwner, GasCheckCollector.inst.entryPoint)
          return op
        } finally {
          this.locked = false
        }
      }))

    const txdata = GasCheckCollector.inst.entryPoint.interface.encodeFunctionData('handleOps', [userOps, info.beneficiary])
    debug('=== encoded data=', txdata.length)
    const gasEst = await GasCheckCollector.inst.entryPoint.estimateGas.handleOps(
      userOps, info.beneficiary, {}
    ).catch(e => {
      const data = e.error?.data?.data ?? e.error?.data
      if (data != null) {
        const e1 = GasCheckCollector.inst.entryPoint.interface.parseError(data)
        throw new Error(`${e1.name}(${e1.args?.toString()})`)
      }
      throw e
    })
    const ret = await GasCheckCollector.inst.entryPoint.handleOps(userOps, info.beneficiary, { gasLimit: gasEst.mul(3).div(2) })
    // "ret.wait()" is dead slow without it...
    for (let count = 0; count < 100; count++) {
      if (await provider.getTransactionReceipt(ret.hash) != null) {
        break
      }
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    const rcpt = await ret.wait()
    const gasUsed = rcpt.gasUsed.toNumber()
    const countSuccessOps = rcpt.events?.filter(e => e.event === 'UserOperationEvent' && e.args?.success).length

    rcpt.events?.filter(e => e.event?.match(/PostOpRevertReason|UserOperationRevertReason/)).find(e => {
      throw new Error(`${e.event}(${decodeRevertReason(e.args?.revertReason)})`)
    })
=======
=======

          // remove the "dest" from the key to the saved estimations
          // so we have a single estimation per method.
          const estimateGasKey = this.accountExec(
            AddressZero,
            destValue,
            destCallData,
          );

          let est = gasEstimatePerExec[estimateGasKey];
          // technically, each UserOp needs estimate - but we know they are all the same for each test.
          if (est == null) {
            const accountEst = (
              await ethers.provider.estimateGas({
                from: GasCheckCollector.inst.entryPoint.address,
                to: account,
                data: accountExecFromEntryPoint,
              })
            ).toNumber();
            est = gasEstimatePerExec[estimateGasKey] = {
              accountEst,
              title: info.title,
            };
          }
          // console.debug('== account est=', accountEst.toString())
          accountEst = est.accountEst;
          const op = await fillSignAndPack(
            {
              sender: account,
              callData: accountExecFromEntryPoint,
              maxPriorityFeePerGas: info.gasPrice,
              maxFeePerGas: info.gasPrice,
              callGasLimit: accountEst,
              verificationGasLimit: 1000000,
              paymaster: paymaster,
              paymasterVerificationGasLimit: 50000,
              paymasterPostOpGasLimit: 50000,
              preVerificationGas: 1,
            },
            accountOwner,
            GasCheckCollector.inst.entryPoint,
          );
          // const packed = packUserOp(op, false)
          // console.log('== packed cost=', callDataCost(packed), packed)
          return op;
        }),
    );

    const txdata =
      GasCheckCollector.inst.entryPoint.interface.encodeFunctionData(
        "handleOps",
        [userOps, info.beneficiary],
      );
    console.log("=== encoded data=", txdata.length);
    const gasEst = await GasCheckCollector.inst.entryPoint.estimateGas
      .handleOps(userOps, info.beneficiary, {})
      .catch((e) => {
        const data = e.error?.data?.data ?? e.error?.data;
        if (data != null) {
          const e1 =
            GasCheckCollector.inst.entryPoint.interface.parseError(data);
          throw new Error(`${e1.name}(${e1.args?.toString()})`);
        }
        throw e;
      });
    const ret = await GasCheckCollector.inst.entryPoint.handleOps(
      userOps,
      info.beneficiary,
      { gasLimit: gasEst.mul(3).div(2) },
    );
    const rcpt = await ret.wait();
    const gasUsed = rcpt.gasUsed.toNumber();
    const countSuccessOps = rcpt.events?.filter(
      (e) => e.event === "UserOperationEvent" && e.args?.success,
    ).length;

>>>>>>> Stashed changes
    rcpt.events
      ?.filter((e) =>
        e.event?.match(/PostOpRevertReason|UserOperationRevertReason/),
      )
      .find((e) => {
        // console.log(e.event, e.args)
        throw new Error(
          `${e.event}(${decodeRevertReason(e.args?.revertReason)})`,
        );
      });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    // check for failure with no revert reason (e.g. OOG)
    expect(countSuccessOps).to.eq(
      userOps.length,
      "Some UserOps failed to execute (with no revert reason)",
    );

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    debug('count', info.count, 'gasUsed', gasUsed)
    const gasDiff = gasUsed - lastGasUsed
    if (info.diffLastGas) {
      debug('\tgas diff=', gasDiff)
    }
    lastGasUsed = gasUsed
    debug('handleOps tx.hash=', rcpt.transactionHash)
=======
    console.debug("count", info.count, "gasUsed", gasUsed);
    const gasDiff = gasUsed - lastGasUsed;
    if (info.diffLastGas) {
      console.debug("\tgas diff=", gasDiff);
    }
    lastGasUsed = gasUsed;
    console.debug("handleOps tx.hash=", rcpt.transactionHash);
>>>>>>> Stashed changes
=======
    console.debug("count", info.count, "gasUsed", gasUsed);
    const gasDiff = gasUsed - lastGasUsed;
    if (info.diffLastGas) {
      console.debug("\tgas diff=", gasDiff);
    }
    lastGasUsed = gasUsed;
    console.debug("handleOps tx.hash=", rcpt.transactionHash);
>>>>>>> Stashed changes
=======

          // remove the "dest" from the key to the saved estimations
          // so we have a single estimation per method.
          const estimateGasKey = this.accountExec(
            AddressZero,
            destValue,
            destCallData,
          );

          let est = gasEstimatePerExec[estimateGasKey];
          // technically, each UserOp needs estimate - but we know they are all the same for each test.
          if (est == null) {
            const accountEst = (
              await ethers.provider.estimateGas({
                from: GasCheckCollector.inst.entryPoint.address,
                to: account,
                data: accountExecFromEntryPoint,
              })
            ).toNumber();
            est = gasEstimatePerExec[estimateGasKey] = {
              accountEst,
              title: info.title,
            };
          }
          // console.debug('== account est=', accountEst.toString())
          accountEst = est.accountEst;
          const op = await fillSignAndPack(
            {
              sender: account,
              callData: accountExecFromEntryPoint,
              maxPriorityFeePerGas: info.gasPrice,
              maxFeePerGas: info.gasPrice,
              callGasLimit: accountEst,
              verificationGasLimit: 1000000,
              paymaster: paymaster,
              paymasterVerificationGasLimit: 50000,
              paymasterPostOpGasLimit: 50000,
              preVerificationGas: 1,
            },
            accountOwner,
            GasCheckCollector.inst.entryPoint,
          );
          // const packed = packUserOp(op, false)
          // console.log('== packed cost=', callDataCost(packed), packed)
          return op;
        }),
    );

    const txdata =
      GasCheckCollector.inst.entryPoint.interface.encodeFunctionData(
        "handleOps",
        [userOps, info.beneficiary],
      );
    console.log("=== encoded data=", txdata.length);
    const gasEst = await GasCheckCollector.inst.entryPoint.estimateGas
      .handleOps(userOps, info.beneficiary, {})
      .catch((e) => {
        const data = e.error?.data?.data ?? e.error?.data;
        if (data != null) {
          const e1 =
            GasCheckCollector.inst.entryPoint.interface.parseError(data);
          throw new Error(`${e1.name}(${e1.args?.toString()})`);
        }
        throw e;
      });
    const ret = await GasCheckCollector.inst.entryPoint.handleOps(
      userOps,
      info.beneficiary,
      { gasLimit: gasEst.mul(3).div(2) },
    );
    const rcpt = await ret.wait();
    const gasUsed = rcpt.gasUsed.toNumber();
    const countSuccessOps = rcpt.events?.filter(
      (e) => e.event === "UserOperationEvent" && e.args?.success,
    ).length;

    rcpt.events
      ?.filter((e) =>
        e.event?.match(/PostOpRevertReason|UserOperationRevertReason/),
      )
      .find((e) => {
        // console.log(e.event, e.args)
        throw new Error(
          `${e.event}(${decodeRevertReason(e.args?.revertReason)})`,
        );
      });
    // check for failure with no revert reason (e.g. OOG)
    expect(countSuccessOps).to.eq(
      userOps.length,
      "Some UserOps failed to execute (with no revert reason)",
    );

    console.debug("count", info.count, "gasUsed", gasUsed);
    const gasDiff = gasUsed - lastGasUsed;
    if (info.diffLastGas) {
      console.debug("\tgas diff=", gasDiff);
    }
    lastGasUsed = gasUsed;
    console.debug("handleOps tx.hash=", rcpt.transactionHash);
>>>>>>> Stashed changes
    const ret1: GasTestResult = {
      count: info.count,
      gasUsed,
      accountEst,
      title: info.title,
      // receipt: rcpt
    };
    if (info.diffLastGas) {
      ret1.gasDiff = gasDiff;
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    debug(ret1)
    return ret1
=======
    console.debug(ret1);
    return ret1;
>>>>>>> Stashed changes
=======
    console.debug(ret1);
    return ret1;
>>>>>>> Stashed changes
=======
    console.debug(ret1);
    return ret1;
>>>>>>> Stashed changes
  }

  // helper methods to access the GasCheckCollector singleton
  addRow(res: GasTestResult): void {
    GasCheckCollector.inst.addRow(res);
  }

  entryPoint(): EntryPoint {
    return GasCheckCollector.inst.entryPoint;
  }

  skipLong(): boolean {
    return process.env.SKIP_LONG != null;
  }
}

export class GasCheckCollector {
  static inst: GasCheckCollector;
  static initPromise?: Promise<GasCheckCollector>;

  entryPoint: EntryPoint;

  static async init(): Promise<void> {
    if (this.inst == null) {
      if (this.initPromise == null) {
        this.initPromise = new GasCheckCollector()._init();
      }
      this.inst = await this.initPromise;
    }
  }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  async _init (entryPointAddressOrTest: string = 'test'): Promise<this> {
    debug('signer=', await globalSigner.getAddress())
    DefaultGasTestInfo.beneficiary = createAddress()

    if (entryPointAddressOrTest === 'test') {
      this.entryPoint = await deployEntryPoint(provider)
    } else {
      this.entryPoint = EntryPoint__factory.connect(entryPointAddressOrTest, globalSigner)
=======
  async _init(entryPointAddressOrTest: string = "test"): Promise<this> {
    console.log("signer=", await ethersSigner.getAddress());
    DefaultGasTestInfo.beneficiary = createAddress();

    const bal = await getBalance(ethersSigner.getAddress());
    if (bal.gt(parseEther("100000000"))) {
      console.log("DONT use geth miner.. use account 2 instead");
      await checkForGeth();
      ethersSigner = ethers.provider.getSigner(2);
    }

    if (entryPointAddressOrTest === "test") {
      this.entryPoint = await deployEntryPoint(provider);
    } else {
=======
  async _init(entryPointAddressOrTest: string = "test"): Promise<this> {
    console.log("signer=", await ethersSigner.getAddress());
    DefaultGasTestInfo.beneficiary = createAddress();

    const bal = await getBalance(ethersSigner.getAddress());
    if (bal.gt(parseEther("100000000"))) {
      console.log("DONT use geth miner.. use account 2 instead");
      await checkForGeth();
      ethersSigner = ethers.provider.getSigner(2);
    }

    if (entryPointAddressOrTest === "test") {
      this.entryPoint = await deployEntryPoint(provider);
    } else {
>>>>>>> Stashed changes
=======
  async _init(entryPointAddressOrTest: string = "test"): Promise<this> {
    console.log("signer=", await ethersSigner.getAddress());
    DefaultGasTestInfo.beneficiary = createAddress();

    const bal = await getBalance(ethersSigner.getAddress());
    if (bal.gt(parseEther("100000000"))) {
      console.log("DONT use geth miner.. use account 2 instead");
      await checkForGeth();
      ethersSigner = ethers.provider.getSigner(2);
    }

    if (entryPointAddressOrTest === "test") {
      this.entryPoint = await deployEntryPoint(provider);
    } else {
>>>>>>> Stashed changes
      this.entryPoint = EntryPoint__factory.connect(
        entryPointAddressOrTest,
        ethersSigner,
      );
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }

    const tableHeaders = [
      "handleOps description         ",
      "count",
      "total gasUsed",
      "per UserOp gas\n(delta for\none UserOp)",
      // 'account.exec()\nestimateGas',
      "per UserOp overhead\n(compared to\naccount.exec())",
    ];

    this.initTable(tableHeaders);
    return this;
  }

  tableConfig: TableUserConfig;
  tabRows: any[];

  /**
   * initialize our formatted table.
   * each header define the width of the column, so make sure to pad with spaces
   * (we stream the table, so can't learn the content length)
   */
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  initTable (tableHeaders: string[]): void {
    debug('inittable')
=======
  initTable(tableHeaders: string[]): void {
    console.log("inittable");
>>>>>>> Stashed changes
=======
  initTable(tableHeaders: string[]): void {
    console.log("inittable");
>>>>>>> Stashed changes
=======
  initTable(tableHeaders: string[]): void {
    console.log("inittable");
>>>>>>> Stashed changes

    // multiline header - check the length of the longest line.
    // function columnWidth (header: string): number {
    //   return Math.max(...header.split('\n').map(s => s.length))
    // }

    this.tableConfig = {
      columnDefault: { alignment: "right" },
      columns: [{ alignment: "left" }],
      // columns: tableHeaders.map((header, index) => ({
      //   alignment: index == 0 ? 'left' : 'right',
      //   width: columnWidth(header)
      // })),
      // columnCount: tableHeaders.length
    };
    this.tabRows = [tableHeaders];
  }

  doneTable(): void {
    fs.rmSync(gasCheckerLogFile, { force: true });
    const write = (s: string): void => {
      console.log(s);
      fs.appendFileSync(gasCheckerLogFile, s + "\n");
    };

    write('== gas estimate of direct calling the account\'s "execute" method');
    write(
      '   the destination is "account.entryPoint()", which is known to be "hot" address used by this account',
    );
    write(
      "   it little higher than EOA call: its an exec from entrypoint (or account owner) into account contract, verifying msg.sender and exec to target)",
    );

    write(
      table(
        Object.values(gasEstimatePerExec).map((row) => [
          `gas estimate "${row.title}"`,
          row.accountEst,
        ]),
        this.tableConfig,
      ),
    );

    const tableOutput = table(this.tabRows, this.tableConfig);
    write(tableOutput);
    // process.exit(0)
  }

  addRow(res: GasTestResult): void {
    const gasUsed = res.gasDiff != null ? "" : res.gasUsed; // hide "total gasUsed" if there is a diff
    const perOp = res.gasDiff != null ? res.gasDiff - res.accountEst : "";

    this.tabRows.push([
      res.title,
      res.count,
      gasUsed,
      res.gasDiff ?? "",
      // res.accountEst,
      perOp,
    ]);
  }
}

after(() => {
  GasCheckCollector.inst.doneTable();
});
