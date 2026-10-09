import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getAssociatedTokenAddressSync, createAssociatedTokenAccountIdempotentInstruction, createMintToInstruction, createSetAuthorityInstruction, AuthorityType, createTransferCheckedInstruction } from '@solana/spl-token';
export const MEMO=new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
export const connection=new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com','confirmed');
export function mintInstructions(owner:PublicKey,mint:PublicKey,issuer:PublicKey,rent:number,runId:string,time:number){
 const ata=getAssociatedTokenAddressSync(mint,owner);
 return [SystemProgram.createAccount({fromPubkey:owner,newAccountPubkey:mint,space:MINT_SIZE,lamports:rent,programId:TOKEN_PROGRAM_ID}),createInitializeMintInstruction(mint,0,issuer,null),createAssociatedTokenAccountIdempotentInstruction(owner,ata,owner,mint),createMintToInstruction(mint,ata,issuer,1),createSetAuthorityInstruction(mint,issuer,AuthorityType.MintTokens,null),new TransactionInstruction({programId:MEMO,keys:[{pubkey:issuer,isSigner:true,isWritable:false},{pubkey:owner,isSigner:true,isWritable:false},{pubkey:mint,isSigner:false,isWritable:false}],data:Buffer.from(JSON.stringify({app:'last-baursak',v:1,event:'mint',mint:mint.toBase58(),to:owner.toBase58(),run:runId,seconds:time}))})];
}
export async function buildMint(owner:PublicKey,mint:Keypair,issuer:Keypair,runId:string,time:number){const rent=await connection.getMinimumBalanceForRentExemption(MINT_SIZE);const latest=await connection.getLatestBlockhash();const tx=new Transaction({feePayer:owner,...latest});tx.add(...mintInstructions(owner,mint.publicKey,issuer.publicKey,rent,runId,time));tx.partialSign(mint,issuer);return tx;}
export async function buildTransfer(owner:PublicKey,to:PublicKey,mint:PublicKey,runId:string,time:number){if(owner.equals(to))throw new Error('Выбери кошелёк друга');const src=getAssociatedTokenAddressSync(mint,owner),dest=getAssociatedTokenAddressSync(mint,to);const latest=await connection.getLatestBlockhash();return new Transaction({feePayer:owner,...latest}).add(createAssociatedTokenAccountIdempotentInstruction(owner,dest,to,mint),createTransferCheckedInstruction(src,mint,dest,owner,1,0),new TransactionInstruction({programId:MEMO,keys:[{pubkey:owner,isSigner:true,isWritable:false},{pubkey:to,isSigner:false,isWritable:false},{pubkey:mint,isSigner:false,isWritable:false}],data:Buffer.from(JSON.stringify({app:'last-baursak',v:1,event:'transfer',mint:mint.toBase58(),from:owner.toBase58(),to:to.toBase58(),run:runId,seconds:time}))}));}
export async function readRelay(mint:PublicKey){
 const mintInfo=await connection.getParsedAccountInfo(mint);const parsed=mintInfo.value?.data;
 if(!parsed||!('parsed' in parsed)||parsed.parsed.type!=='mint'||parsed.parsed.info.decimals!==0||parsed.parsed.info.supply!=='1'||parsed.parsed.info.mintAuthority!==null)throw new Error('Предмет не найден или не является уникальным');
 const accounts=await connection.getTokenLargestAccounts(mint);const nonzero=accounts.value.find(a=>a.amount==='1');let owner:string|null=null;
 if(nonzero){const account=await connection.getParsedAccountInfo(nonzero.address);if(account.value?.data&&'parsed'in account.value.data)owner=account.value.data.parsed.info.owner;}
 const signatures=await connection.getSignaturesForAddress(mint,{limit:1000});
 const selected=signatures.length>31?[...signatures.slice(0,30),signatures.at(-1)!]:signatures;const history:Array<{signature:string;from:string;to:string;time:number|null;kind:string}>=[];
 for(const sig of selected.filter(s=>!s.err).reverse()){
  const tx=await connection.getParsedTransaction(sig.signature,{maxSupportedTransactionVersion:0});if(!tx||tx.meta?.err)continue;
  const instructions=tx.transaction.message.instructions;
  for(const ix of instructions){if(!('parsed'in ix)||!ix.programId.equals(MEMO)||typeof ix.parsed!=='string')continue;let data;try{data=JSON.parse(ix.parsed);}catch{continue;}if(data.app!=='last-baursak'||data.mint!==mint.toBase58()||!['mint','transfer'].includes(data.event))continue;
   const actual=instructions.find(i=>'parsed'in i&&i.programId.equals(TOKEN_PROGRAM_ID)&&i.parsed?.type===(data.event==='mint'?'mintTo':'transferChecked'));
   if(!actual||!('parsed'in actual))continue;const info=actual.parsed.info;
   if(info.mint!==mint.toBase58()||(info.tokenAmount?.amount??info.amount)!=='1')continue;
   const destination=getAssociatedTokenAddressSync(mint,new PublicKey(data.to));if(info.destination!==destination.toBase58()&&info.account!==destination.toBase58())continue;
   if(data.event==='transfer'&&info.authority!==data.from)continue;
   history.push({signature:sig.signature,from:data.event==='mint'?info.mintAuthority:data.from,to:data.to,time:sig.blockTime??null,kind:data.event});
  }
 }
 return {mint:mint.toBase58(),owner,history};
}
