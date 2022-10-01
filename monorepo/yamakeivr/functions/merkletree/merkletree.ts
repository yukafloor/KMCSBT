import { Handler } from '@netlify/functions'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

export const handler: Handler = async (event, context) => {
  const address = event.queryStringParameters?.address
  if (!address) {
    return { statusCode: 400, body: 'Set address on API' }
  }
  const addressesLower = addresses.map((x) => x.toLowerCase())
  const addressLower = address.toLowerCase()

  const leafNodes = addressesLower.map((x) => keccak256(x))
  const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const nodeIndex: number = addressesLower.indexOf(addressLower)
  const rootHash = tree.getRoot()
  console.log('rootHash:', tree.getHexRoot())

  console.log('address:', addressLower, 'nodeindex:', nodeIndex)

  if (nodeIndex === -1) {
    return { statusCode: 400, body: "Your Address don't eligible whitelist" }
  }
  const hashedAddress = keccak256(addressLower)
  const hexProof = tree.getHexProof(hashedAddress)
  const verify = tree.verify(hexProof, hashedAddress, rootHash)

  if (!verify) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        address,
        message: 'your address can not verify',
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      hexProof,
    }),
  }
}
const addresses = [
  '0xcD5cF213Cfe34980ae9F1b29351afc1c681792ff',
  '0x90e56349131D187e3349b8B37030adCad980Ce89',
  '0x62C4d02DEbAC74061981B28e00a2b6682C16f328',
  '0xd7E44A7adeac691aDfFcD2E56c587A30109F67b0',
  '0x56A13f6B07031a61E9c8F6446cFAe9ec4Def2E44',
  '0x30DE09EB48b128cECAe4549Fd32D5019B6664158',
  '0x394B9f09c4e0Cf8138016bC4cea8D87011B2bE5d',
  '0xd2068c256E1bb3e2b65E7db1C7FF9aEC72E17382',
  '0x00b38ECf9E3F5F4a4991996113a2F18698ad0Cf8',
  '0x920c963B1f501C7C46ce1E38Ca9c03B161efb17c',
  '0xe6a7478492Ec9C1cc16028d59630a00f03073885',
  '0x99C9730a96cBfDCE1A1195e0f3A68fe594dB76b4',
  '0xc39DA4d109b30b7f0A3E1d383aCB528488a3Fe8A',
  '0x821E49E8E8CDBcD46a1E1593836D6a91abbA49e9',

  '0x29A1263FaA4332d95a351DeD204Bd3c6753558b4',
  '0xFaf63A0C578730A195E387B2063Cbba940Ba7FBF',
  '0x30DE09EB48b128cECAe4549Fd32D5019B6664158',
  '0x64a18349B11F3cedfF42C80733013F7f409e2AeE',
  '0x14c2b489D661A11DC63FAFae1cFE22Ac4c6C550d',
  '0x25840064B55Ac9b1531875a6Bfc8417fEb566CA6',
  '0x9154da29A2Ef2fB3b248461fFE0842CA83d24AC8',
  '0x0333F6c7b94C154f8c3D8f89cC34523103AAB704',
  '0x403Ca284c16795263c704F3411360A5A11cE91DC',
  '0xa5b2eE569fF5Fea84261533b5804E69af4227979',
  '0xD046C0b2bB977b4443b2DaD0575B0afF2487DB1c',
  '0xB761A31068abE9893d63198E7812E44cf8a698ec',
  '0x9E82f3302084B846F71CcB4230b42340EF2ADFF3',
  '0x93fa4e6b7d6f747d3f0a5b64f5a9c76a8a0ef45d',
  '0xcad25c376cF744561dF0C3a2440384666713cf2e',
  '0xA5E8Aa9Fb1f573f8fe1563fa89b17254D11eD586',
  '0xF48b098A36E0cFc16BB824E5EAcE21D0475f2627',
  '0x8Cf8C79Fa88A283b8baD08269b06b3346EBe0de3',
  '0x438e3Dd73F1F1B70c16B085a8732a67e5dA00beb',
  '0xCdd2B4b25953a392b9d7267364877A23aa34F152',
  '0x5e130cB7F8CDCfB5A15018ee5846769703Ec4478',
  '0x1f77A19c0ea4484E9DBD0713Ea4c0ec95ed642db',
  '0xBACb4dB3dCC49c9493163eF9EB3E7Fb0254a0D00',
  '0x709eB29F076699F75DB1dE286a46520334D63ef5',
  '0xE962587325D6F8f682F93B335483789362917DCe',
  '0x910B2353F7ac2A7CdB4A26709A10CEd6345dBBE8',
  '0xe054c0C913AAfc6a6755E7C25d01F98137C7dBD6',
  '0xd1fd6ab07417871112c7bd3ea43834a5bf350384',
  '0x45997a94fABf9BC8a2664dC77a378011E0E1F3F4',
  '0x179974A3f72464949E0269Af45caC14fa14Daf4B',
  '0x2f61efad6b7577663d83d78e1f63acabd97f099a',
  '0xd0c877b474cd51959931a7f70d7a6c60f50cdae7',
  '0x490d0E643B1734DCF056Eb8543d7618073D49381',
  '0x00b38ECf9E3F5F4a4991996113a2F18698ad0Cf8',
  '0xF739C59B9303100283C5BF85f95e239a2fF3f7f2',
  '0xb0db92f32f733F46A892Ff366Ba02d601A87fd2A',
  '0xb726dfCA37aAb125877925eE3d99DCD8DeD26DD2',
  '0x3bE564Ca43257A6695530782f20569223f56310a',
  '0x1A4370fdd7173d0a41FF7C63a8e0249479BA0225',
  '0x94d95c69d7f99b0afe8061526b08ca6a6c50d503',
  '0xDb5C70D55D427AC1063330129499e1806C50cb0A',
  '0x05FcD4EB87caA5a4757f1CCF830bCEDd5d1d033d',
  '0xa643dc880fC594336f28fece21BE8858ce988C0f',
  '0x969Bebaee31128012356db1a39427B253fC8db6a',
  '0x785874fcAd624765f3ECed2097694e3Cb08983d8',
  '0x01cb023186cab05220554ee75b4d69921dd051f1',
  '0x908debeff55efefbbb8bb232ec614d809e868bce',
  '0x7bEED30332656CA4220CB2ce8E4508fb18013E8d',
  '0x7a7235e946b83213739950de0a71cac7651b0c36',
  '0xfB8C4cD81514787330127D10fbfF6915AC312c5B',
  '0x836e7cBfE79A896962bDa54BE27e495a3E0b2A02',
  '0xe75eDD240A14D0DCBD5C0ec1aBe062A2222993A8',
  '0x6134B2D1b87E10c7e21CdfCc4092F5Aa1B6Aba93',
  '0x1e7d6fdeca57d5fb389180bcbe7b902343cf338b',
  '0xDc2B050d6042686171160670bA2C624954f51D3e',
  '0x981f0bd6909901caeafc49177c229ae091bbd492',
  '0xC77D4b74B461B0ddE2Aa121058c0765806e8BA7c',
  '0xFe7048128Ba126108E395FbaEb1C4DdDa7de6227',
  '0xd2B08A58cD3e7cfC5788122D802Ca65d4F9440B1',
  '0xa27be4084d7548d8019931877dd9bb75cc028696',
  '0xe10772c3c2e8879b13d5d2886ef8e9f9b95b83aa',
  '0xe24dc0bb5754685f62b3b851116b16bed23ab82b',
  '0xE250c7540ffC0fE802A3cd1ba907addE9D410051',
  '0xB961D17dBCE3Fa9f54959FA7Ca245cE511d28DFd',
  '0xec7f66cd42286a5fc48e5b719035fee75181103d',
  '0x33fe4A6B3E79615067E75bDa042F8820D7666d82',
  '0x00a249A0A9882D9E0E7d687F0Aa2E87C52200d2c',
  '0xaf6b82050a12b5caca3373b0d2771a953afaa624',
  '0x1404d62e02B437102F0DA2F36185f3BCbedfCcC7',
  '0xf823825dc97a8c81ec09d53b6e3f734e76e60cb6',
  '0x247bcdaaee715428a0a8b02b79a641c051f3a111',
  '0x0251a655c2193b1d1435019dc833cfd8b2adff71',
  '0x387Aad218b486D4e37FA01cC282ac105A7243c4C',
  '0xF7fc9EB6fDd9E646dCEAe6CaeCac5eAD6E2C2836',
  '0xDB6D71A5BD8b5299f5a111f686A23d0Fc4dB2a6C',
  '0x33D712949C468BC582F297bA7add7a47F40C1C34',
  '0xCEA525eE12e751379e3B0e8fE4a737E8A8d15622',
  '0xF24E4D48CfEB2F84Fc7Bb388C3de266d6144338f',
  '0xCe874Bcf0633F01ED849B948FEC45D1ae5ba2A57',
  '0xcc11547FAeb2FA1C3002e018730A62c6c86462Cf',
  '0x67866042159DC89E73fa71Fd8C5E26FFA6Ea5F2f',
  '0x6270Dba473200106b6587e2B1bca0E3D6c7485c0',
  '0x9A1ccbF94906fc9C44420D48ab8Ee7B2c884b609',
  '0x3F2aDab919e971a02370aD33da950F23FA356b76',
  '0x761e4dE49B3Cbb53972f8372c4CEc44E4d8b36ec',
  '0xDd3EEFb7830f9cf9B2a8adCa069D2Dbc6E3C7A11',
  '0x54b6D7337085A90699Dba4fEe76f9Fb291625226',
  '0xa1d339bBD5d47f56C71EF5030c01407b0f51C609',
  '0x3b9FCfeEF6cb999B18317361acd825F49bd0c515',
  '0xed18AE6881D9b45a22D0F910edd33cf19Fd41bdB',
  '0x8C68A303D725afeF6DEeAEea04F37aeF808EFC1b',
  '0xe44bed6523ba7dC2F204953F01Cd7cEa3d0B98e6',
  '0x3d3B69457Ce7e7998f19e85E018B5a296Aed781e',
  '0x724E5d0cf13BdB8Dd6FEad83180c19d1CFD367bB',
  '0x9F9aF0E5a16Cf2755E6717f8476907Bdf89e47d9',
  '0x4A33cEBC2d819a422e7217c5cAe804792f41F9e8',
  '0xAe13d5c548138762645c1a3a9251D56e2E358AE0',
  '0x4899c161BF167bd234e55CEF0810e38386E546BA',
  '0x4d683F25c9EA084B796097c1903685d9E45D7aDf',
  '0xdA40cB6c84d370173fD122F74e4aff056E8Db4E9',
  '0x870BA521b5830Ce144DD0e824DA837269491C8FA',
  '0x12aac91AbD363Cc93A950A0f668c9745eBbd88db',
  '0x55Fbd3a20f1B975De9556897e07a2e018D229D97',
  '0x3f2B9232Ce37d489f846d4464648F14036c6ca12',
  '0x878483566730f7f685e6114E527771AEc8826dB9',
  '0xa0751827DA7a5cE235D85694164382Ee8920648D',
  '0x281E6148d1CE38575cCb19447f283A220B48CEb3',
  '0x8c8460eC09d3D58D289961CC5Fb887061323da64',
  '0x58E74E94E836D36c27fdCa268d2f0fbd4B76b24A',
  '0x69CfF3cd34486944A2145189106C08219E447f74',
  '0xf7Ea0b11054213B4a53492FC2DD6eeE64D7DE066',
  '0xf7Ea0b11054213B4a53492FC2DD6eeE64D7DE066',
  '0xbBd3Bf98ba31c8d7FBfE8Ee749644786d2b1cB0f',
  '0x5c051c0FF69b6f5FDD47E847EB370DD48726Ec4d',
  '0xb13dAc27BEbF08778ac5aEC9387E56413773B875',
]
