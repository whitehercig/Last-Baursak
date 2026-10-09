import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Keypair,Transaction} from '@solana/web3.js';
import {TOKEN_PROGRAM_ID,decodeInitializeMintInstruction,decodeMintToInstruction,decodeSetAuthorityInstruction} from '@solana/spl-token';
import {mintInstructions,MEMO} from '../server/chain';
test('collectible has exactly one unit, no decimals and irrevocably revoked mint authority',()=>{const owner=Keypair.generate(),mint=Keypair.generate(),issuer=Keypair.generate();const ix=mintInstructions(owner.publicKey,mint.publicKey,issuer.publicKey,1461600,'test-run',30.2);assert.equal(decodeInitializeMintInstruction(ix[1]!).data.decimals,0);assert.equal(decodeMintToInstruction(ix[3]!).data.amount,1n);assert.equal(decodeSetAuthorityInstruction(ix[4]!).data.newAuthority,null);assert.ok(ix[5]!.programId.equals(MEMO));const tx=new Transaction({feePayer:owner.publicKey,recentBlockhash:Keypair.generate().publicKey.toBase58()}).add(...ix);tx.partialSign(mint,issuer);assert.ok(tx.serialize({requireAllSignatures:false}).length<=1232);tx.partialSign(owner);assert.ok(tx.verifySignatures());});
