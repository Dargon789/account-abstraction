<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { parseEther } from 'ethers/lib/utils'
import { GasCalcPaymasterWithPostOp__factory } from '../typechain'
import { ethers } from 'hardhat'
import { GasChecker } from './GasChecker'
import { Create2Factory } from '../src/Create2Factory'
import { hexValue } from '@ethersproject/bytes'
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { parseEther } from "ethers/lib/utils";
import { TestPaymasterWithPostOp__factory } from "../typechain";
import { ethers } from "hardhat";
import { GasChecker } from "./GasChecker";
import { Create2Factory } from "../src/Create2Factory";
import { hexValue } from "@ethersproject/bytes";

const ethersSigner = ethers.provider.getSigner();

context("Paymaster with PostOp", function () {
  this.timeout(60000);
  const g = new GasChecker();

  let paymasterAddress: string;

  before(async () => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream

    const paymasterInit = hexValue(new GasCalcPaymasterWithPostOp__factory(ethersSigner).getDeployTransaction(g.entryPoint().address).data!)
    paymasterAddress = await new Create2Factory(ethers.provider, ethersSigner).deploy(paymasterInit, 0)
    const paymaster = GasCalcPaymasterWithPostOp__factory.connect(paymasterAddress, ethersSigner)
    await paymaster.addStake(1, { value: 1 })
    await g.entryPoint().depositTo(paymaster.address, { value: parseEther('10') })
  })

    const paymasterInit = hexValue(
      new TestPaymasterWithPostOp__factory(ethersSigner).getDeployTransaction(
        g.entryPoint().address,
      ).data!,
    );
    paymasterAddress = await new Create2Factory(
      ethers.provider,
      ethersSigner,
    ).deploy(paymasterInit, 0);
    const paymaster = TestPaymasterWithPostOp__factory.connect(
      paymasterAddress,
      ethersSigner,
    );
    await paymaster.addStake(1, { value: 1 });
    await g
      .entryPoint()
      .depositTo(paymaster.address, { value: parseEther("10") });
  });

=======
    const paymasterInit = hexValue(
      new TestPaymasterWithPostOp__factory(ethersSigner).getDeployTransaction(
        g.entryPoint().address,
      ).data!,
    );
    paymasterAddress = await new Create2Factory(
      ethers.provider,
      ethersSigner,
    ).deploy(paymasterInit, 0);
    const paymaster = TestPaymasterWithPostOp__factory.connect(
      paymasterAddress,
      ethersSigner,
    );
    await paymaster.addStake(1, { value: 1 });
    await g
      .entryPoint()
      .depositTo(paymaster.address, { value: parseEther("10") });
  });

>>>>>>> Stashed changes
=======
    const paymasterInit = hexValue(
      new TestPaymasterWithPostOp__factory(ethersSigner).getDeployTransaction(
        g.entryPoint().address,
      ).data!,
    );
    paymasterAddress = await new Create2Factory(
      ethers.provider,
      ethersSigner,
    ).deploy(paymasterInit, 0);
    const paymaster = TestPaymasterWithPostOp__factory.connect(
      paymasterAddress,
      ethersSigner,
    );
    await paymaster.addStake(1, { value: 1 });
    await g
      .entryPoint()
      .depositTo(paymaster.address, { value: parseEther("10") });
  });

>>>>>>> Stashed changes
  it("paymaster with PostOp", async function () {
    await g.addTestRow({
      title: "paymaster+postOp",
      count: 1,
      paymaster: paymasterAddress,
      diffLastGas: false,
    });
    await g.addTestRow({
      title: "paymaster+postOp with diff",
      count: 2,
      paymaster: paymasterAddress,
      diffLastGas: true,
    });
  });

  it("paymaster with postOp 10", async function () {
    if (g.skipLong()) this.skip();

    await g.addTestRow({
      title: "paymaster+postOp",
      count: 10,
      paymaster: paymasterAddress,
      diffLastGas: false,
    });
    await g.addTestRow({
      title: "paymaster+postOp with diff",
      count: 11,
      paymaster: paymasterAddress,
      diffLastGas: true,
    });
  });
<<<<<<< Updated upstream
<<<<<<< Updated upstream

=======
});
>>>>>>> Stashed changes
=======
});
>>>>>>> Stashed changes
