/* eslint-disable dot-notation */
import { task, types } from 'hardhat/config'
import { getContract, getProvider } from './helpers'
import fs from 'fs'
// import type { KMCbadge } from '../typechain-types'
import { BigNumber } from 'ethers'
import abi from "./abi.json"
import "@nomiclabs/hardhat-ethers";
import { getContractAt } from '@nomiclabs/hardhat-ethers/internal/helpers'
const { parse } = require('csv-parse/sync')


task("mintTest", 'test external contract')
  .setAction(async (taskArgs, hre) => {

    const contract = await getContractAt(hre, abi, "0x488d69dea61d097158dcd5221d6792faf1e6ab4c");
    for (let i = 0; i <= 10; i++) {
      const tx = await contract['publicMint'](1, { value: 0, gasPrice: 50000000000 });
      console.log(tx.hash);
    }
  })


task('airdrop', 'Push WhiteList from JSON file')
  .addOptionalParam(
    'filename',
    'WhiteList txt file name',
    './scripts/0922.csv'
  )
  .addOptionalParam('index', 'Bulk Send Chunk Index', 100, types.int)
  .addOptionalParam('column', 'Bulk Send amount Column', 'Quantity', types.string)
  .setAction(async (taskArgs, hre) => {
    type CSVColumn = {
      [k: string]: string | number
    }

    const contract = await getContract('KMCbadge', hre, getProvider(hre))
    const records: CSVColumn[] = parse(fs.readFileSync(taskArgs.filename), {
      columns: true,
    })
    const dropList = records.filter((e) => (Number(e[taskArgs.column])) >= 1)
    if (dropList.length === 0)
      throw new Error('records have not value. please check column')
    for (let i = 0; i <= dropList.length; i += taskArgs.index) {
      const ad = dropList.slice(i, i + taskArgs.index)
      const tx = await contract['batchMintTo'](
        ad.map((e: CSVColumn) => e['HolderAddress'] as string),
        4,
        ad.map((e: CSVColumn) => BigNumber.from(1)),
        { gasPrice: 80000000000, gasLimit: 8000000 }
      )

      console.log(tx.hash)
      fs.writeFileSync('./scripts/mint.log', tx.hash + '\n', { flag: 'a' })
      await tx.wait()
    }
  })
