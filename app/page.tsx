'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  Copy,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000373c82109a6af192f4de48b4-P7zBMGdjXg1WFpoOC5AfztrRudjvYL.png'

const treasuryWallets = [
  { chain: 'BSC', asset: 'USDT', address: '0xc240766472FEd8bB8fdf39c9362bAbbE7e3086A1' },
  { chain: 'Ethereum', asset: 'USDT / ETH', address: '0xc240766472FEd8bB8fdf39c9362bAbbE7e3086A1' },
  { chain: 'Solana', asset: 'SOL', address: 'AVmgiG5hK6YfCufjC671gyZZVjZ23AJLnxdkjuj58yZi' },
  { chain: 'Bitcoin', asset: 'BTC', address: 'bc1pd8k2d9dljvwfy5nadl9vhzl8ke2k007hfzeale0fwvxgzmtav45sleqex8' },
  { chain: 'TRON', asset: 'USDT', address: 'TRHsaAu4f1gfvEVFmu4YDDmk3ZLTv7guvC' },
]

const assets = [
  { name: 'USDT', network: 'BSC', icon: '₮', tone: 'text-emerald-300', bg: 'bg-emerald-400/10' },
  { name: 'USDT', network: 'Ethereum', icon: '₮', tone: 'text-emerald-300', bg: 'bg-emerald-400/10' },
  { name: 'USDT', network: 'TRC', icon: '₮', tone: 'text-rose-300', bg: 'bg-rose-400/10' },
  { name: 'USDT', network: 'Base', icon: '₮', tone: 'text-sky-300', bg: 'bg-sky-400/10' },
  { name: 'USDT', network: 'Solana', icon: '₮', tone: 'text-violet-300', bg: 'bg-violet-400/10' },
  { name: 'BTC', network: 'Bitcoin', icon: '₿', tone: 'text-orange-300', bg: 'bg-orange-400/10' },
  { name: 'ETH', network: 'Ethereum', icon: '◆', tone: 'text-blue-300', bg: 'bg-blue-400/10' },
  { name: 'SOL', network: 'Solana', icon: '≋', tone: 'text-fuchsia-300', bg: 'bg-fuchsia-400/10' },
]

const plans = [
  { name: 'Starter', range: '$100 – $4,999', returnRate: '4.5%', duration: '30 days', featured: false },
  { name: 'Growth', range: '$5,000 – $24,999', returnRate: '7.2%', duration: '60 days', featured: true },
  { name: 'Elite', range: '$25,000+', returnRate: '10.8%', duration: '90 days', featured: false },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<{ chain: string; address: string } | null>(null)
  const [walletError, setWalletError] = useState<string | null>(null)
  const [connecting, setConnecting] = useState<string | null>(null)

  const connectWallet = async (chain: 'ETH' | 'SOL' | 'TRX' | 'BTC') => {
    setConnecting(chain)
    setWalletError(null)
    try {
      let address = ''
      const browser = window as Window & { ethereum?: { request: (args: { method: string }) => Promise<string[]> }; solana?: { connect: () => Promise<{ publicKey: { toString: () => string } }> }; tronLink?: { request: (args: { method: string }) => Promise<string[]> }; unisat?: { requestAccounts: () => Promise<string[]> } }
      if (chain === 'ETH') {
        if (!browser.ethereum) throw new Error('Install MetaMask or another Ethereum wallet to continue.')
        address = (await browser.ethereum.request({ method: 'eth_requestAccounts' }))[0]
      } else if (chain === 'SOL') {
        if (!browser.solana) throw new Error('Install Phantom or another Solana wallet to continue.')
        address = (await browser.solana.connect()).publicKey.toString()
      } else if (chain === 'TRX') {
        if (!browser.tronLink) throw new Error('Install TronLink to continue.')
        address = (await browser.tronLink.request({ method: 'tron_requestAccounts' }))[0]
      } else {
        if (!browser.unisat) throw new Error('Install UniSat or another Bitcoin wallet to continue.')
        address = (await browser.unisat.requestAccounts())[0]
      }
      setConnectedWallet({ chain, address })
    } catch (error) {
      setWalletError(error instanceof Error ? error.message : 'Wallet connection was cancelled.')
    } finally {
      setConnecting(null)
    }
  }

  const copyTreasuryAddress = async (address: string) => {
  await navigator.clipboard?.writeText(address)
  setCopied(true)
  window.setTimeout(() => setCopied(false), 1600)
  }

  const copyAddress = async () => {
  await navigator.clipboard?.writeText(connectedWallet?.address ?? '')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050a19] text-slate-100 selection:bg-[#f7b928] selection:text-[#071126]">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_70%_8%,rgba(20,79,199,.22),transparent_35%),radial-gradient(circle_at_15%_40%,rgba(246,176,26,.08),transparent_28%)]" />
      <header className="relative z-20 border-b border-white/[.08] bg-[#050a19]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="SharkPay home">
            <img src={logoUrl} alt="SharkPay logo" className="size-11 object-contain" />
            <div><p className="font-semibold tracking-[.2em] text-white">SHARKPAY</p><p className="text-[9px] font-medium tracking-[.28em] text-[#f4ba37]">FAST · SECURE · GLOBAL</p></div>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#plans" className="transition hover:text-[#f6bd3b]">Investment plans</a>
            <a href="#assets" className="transition hover:text-[#f6bd3b]">Supported assets</a>
            <a href="#how-it-works" className="transition hover:text-[#f6bd3b]">How it works</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white">Sign in</button>
            <button onClick={() => setSelectedPlan('Growth')} className="rounded-full bg-[#f4b82e] px-5 py-2.5 text-sm font-semibold text-[#071126] shadow-[0_0_24px_rgba(244,184,46,.18)] transition hover:bg-[#ffd369]">Connect wallet <Wallet className="ml-1 inline size-4" /></button>
          </div>
          <button className="rounded-lg p-2 text-slate-200 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-white/[.08] px-5 py-5 text-sm text-slate-300 md:hidden"><a href="#plans" onClick={() => setMenuOpen(false)}>Investment plans</a><a href="#assets" onClick={() => setMenuOpen(false)}>Supported assets</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a></nav>}
      </header>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#f4b82e]/30 bg-[#f4b82e]/[.08] px-3.5 py-2 text-xs font-medium text-[#fbd77a]"><Sparkles className="size-3.5" /> Digital asset investing, made clear</div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-.045em] text-white sm:text-6xl lg:text-7xl">Put your crypto to <span className="bg-gradient-to-r from-[#ffe39a] via-[#f4b82e] to-[#df8a13] bg-clip-text text-transparent">work.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">A more thoughtful way to grow your digital assets. Choose a strategy, deposit securely, and keep your portfolio working around the clock.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#plans" className="rounded-full bg-[#f4b82e] px-6 py-3.5 text-center font-semibold text-[#071126] shadow-[0_8px_30px_rgba(244,184,46,.2)] transition hover:-translate-y-0.5 hover:bg-[#ffd369]">Explore strategies <ArrowUpRight className="ml-1 inline size-4" /></a><a href="#how-it-works" className="rounded-full border border-white/15 px-6 py-3.5 text-center font-medium text-white transition hover:border-[#f4b82e]/50 hover:bg-white/[.04]">How it works <ChevronDown className="ml-1 inline size-4" /></a></div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-6"><div><p className="text-2xl font-semibold text-white">$48.6M</p><p className="mt-1 text-xs text-slate-500">Assets managed</p></div><div><p className="text-2xl font-semibold text-white">12.8K+</p><p className="mt-1 text-xs text-slate-500">Active investors</p></div><div><p className="text-2xl font-semibold text-white">99.9%</p><p className="mt-1 text-xs text-slate-500">Platform uptime</p></div></div>
        </div>
        <div className="relative flex items-center justify-center lg:justify-end"><div className="absolute size-[360px] rounded-full bg-[#1256d9]/20 blur-[90px]" /><div className="relative rounded-[2rem] border border-[#f4b82e]/20 bg-gradient-to-br from-[#122957]/80 via-[#091631]/90 to-[#071024]/95 p-5 shadow-[0_25px_100px_rgba(0,55,180,.25)] sm:p-7"><img src={logoUrl} alt="SharkPay gold shark emblem" className="mx-auto w-[280px] drop-shadow-[0_0_34px_rgba(21,100,255,.28)] sm:w-[370px]" /><div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm"><span className="text-slate-400">Portfolio status</span><span className="flex items-center gap-2 font-medium text-emerald-300"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_9px_#34d399]" /> Active</span></div></div></div>
      </section>

      <section id="plans" className="relative z-10 border-y border-white/[.07] bg-[#08132a]/70 px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-[#f4b82e]">Build with intention</p><h2 className="text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">Strategies for every stage</h2></div><p className="max-w-md text-sm leading-6 text-slate-400">Transparent terms, flexible deposits, and a simple view of your projected outcome. Rates may change with market conditions.</p></div><div className="grid gap-5 lg:grid-cols-3">{plans.map((plan) => <article key={plan.name} className={`relative rounded-3xl border p-6 transition hover:-translate-y-1 ${plan.featured ? 'border-[#f4b82e]/70 bg-gradient-to-b from-[#1b3155] to-[#0a1830] shadow-[0_12px_45px_rgba(244,184,46,.12)]' : 'border-white/10 bg-white/[.035] hover:border-white/20'}`}>{plan.featured && <span className="absolute -top-3 left-6 rounded-full bg-[#f4b82e] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#071126]">Most popular</span>}<div className="flex items-start justify-between"><div><p className="text-lg font-semibold text-white">{plan.name}</p><p className="mt-1 text-sm text-slate-400">{plan.range}</p></div><div className="rounded-xl bg-[#f4b82e]/10 p-2 text-[#f4c44f]"><TrendingUp className="size-5" /></div></div><div className="my-7 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-.05em] text-white">{plan.returnRate}</span><span className="mb-1 text-sm text-slate-400">projected<br />target</span></div><div className="flex justify-between border-t border-white/10 py-4 text-sm"><span className="text-slate-400">Term</span><span className="font-medium text-white">{plan.duration}</span></div><div className="flex flex-col gap-3 text-sm text-slate-300"><span><Check className="mr-2 inline size-4 text-[#f4b82e]" /> Weekly portfolio updates</span><span><Check className="mr-2 inline size-4 text-[#f4b82e]" /> Secure asset custody</span></div><button onClick={() => setSelectedPlan(plan.name)} className={`mt-7 w-full rounded-full py-3 text-sm font-semibold transition ${plan.featured ? 'bg-[#f4b82e] text-[#071126] hover:bg-[#ffd369]' : 'border border-white/15 text-white hover:border-[#f4b82e]/60 hover:bg-white/[.04]'}`}>Choose {plan.name}</button></article>)}</div></div></section>

      <section id="assets" className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-[#f4b82e]">One account, many rails</p><h2 className="text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">Deposit in the asset you already trust.</h2><p className="mt-5 max-w-md leading-7 text-slate-400">SharkPay supports the networks investors use every day, with clear routing labels so you can send funds with confidence.</p><div className="mt-7 flex flex-wrap gap-3"><span className="flex items-center gap-2 text-xs text-slate-400"><ShieldCheck className="size-4 text-[#f4b82e]" /> Non-custodial withdrawals</span><span className="flex items-center gap-2 text-xs text-slate-400"><LockKeyhole className="size-4 text-[#f4b82e]" /> Encrypted by design</span></div></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{assets.map((asset, index) => <div key={`${asset.name}-${asset.network}-${index}`} className="rounded-2xl border border-white/10 bg-white/[.035] p-4 transition hover:border-[#f4b82e]/40 hover:bg-white/[.06]"><div className={`mb-4 flex size-10 items-center justify-center rounded-xl text-xl font-semibold ${asset.bg} ${asset.tone}`}>{asset.icon}</div><p className="text-sm font-semibold text-white">{asset.name}</p><p className="mt-1 text-xs text-slate-500">{asset.network}</p></div>)}</div></div></section>

      <section id="how-it-works" className="relative z-10 border-t border-white/[.07] bg-[#071127] px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-12 text-center"><p className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-[#f4b82e]">Your journey starts here</p><h2 className="text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">Simple by design</h2></div><div className="grid gap-5 md:grid-cols-3">{[{icon: Wallet, title: 'Choose a strategy', text: 'Pick a plan aligned with your goals and preferred timeline.'}, {icon: CircleDollarSign, title: 'Fund your account', text: 'Deposit supported digital assets across the network of your choice.'}, {icon: BarChart3, title: 'Track your progress', text: 'Follow your portfolio from one clear, focused dashboard.'}].map((step, index) => <div key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[.03] p-6"><span className="absolute right-5 top-5 text-xs font-semibold text-[#f4b82e]">0{index + 1}</span><step.icon className="mb-6 size-6 text-[#f4b82e]" /><h3 className="font-semibold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p></div>)}</div><div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-[#f4b82e]/20 bg-gradient-to-r from-[#172c4d] to-[#0e1d37] p-6 sm:flex-row sm:items-center sm:p-8"><div><p className="text-xl font-semibold text-white">Ready to make your next move?</p><p className="mt-1 text-sm text-slate-400">Start with a plan that fits your strategy.</p></div><a href="#plans" className="rounded-full bg-[#f4b82e] px-6 py-3 text-sm font-semibold text-[#071126] hover:bg-[#ffd369]">View investment plans</a></div></div></section>

      <footer className="relative z-10 border-t border-white/[.07] px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 SharkPay. Digital asset services for informed investors.</p><div className="flex gap-5"><a href="#top" className="hover:text-white">Risk disclosure</a><a href="#top" className="hover:text-white">Terms</a><a href="#top" className="hover:text-white">Privacy</a></div></div></footer>

      {selectedPlan && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020611]/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="invest-title"><div className="w-full max-w-md rounded-3xl border border-[#f4b82e]/25 bg-[#0b1933] p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-[#f4b82e]">Start your journey</p><h2 id="invest-title" className="mt-2 text-2xl font-semibold text-white">{selectedPlan} strategy</h2></div><button onClick={() => setSelectedPlan(null)} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close dialog"><X className="size-5" /></button></div><p className="mt-5 text-sm leading-6 text-slate-400">Connect a compatible wallet before investing. SharkPay supports Ethereum, Solana, TRON, and Bitcoin wallets.</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={() => connectWallet('ETH')} disabled={!!connecting} className="rounded-2xl border border-white/10 bg-[#071126] px-4 py-3 text-left transition hover:border-[#f4b82e]/50 disabled:opacity-60"><span className="text-sm font-semibold text-white">Ethereum</span><span className="mt-1 block text-xs text-slate-500">MetaMask / WalletConnect</span></button><button onClick={() => connectWallet('SOL')} disabled={!!connecting} className="rounded-2xl border border-white/10 bg-[#071126] px-4 py-3 text-left transition hover:border-[#f4b82e]/50 disabled:opacity-60"><span className="text-sm font-semibold text-white">Solana</span><span className="mt-1 block text-xs text-slate-500">Phantom wallet</span></button><button onClick={() => connectWallet('TRX')} disabled={!!connecting} className="rounded-2xl border border-white/10 bg-[#071126] px-4 py-3 text-left transition hover:border-[#f4b82e]/50 disabled:opacity-60"><span className="text-sm font-semibold text-white">TRON</span><span className="mt-1 block text-xs text-slate-500">TronLink</span></button><button onClick={() => connectWallet('BTC')} disabled={!!connecting} className="rounded-2xl border border-white/10 bg-[#071126] px-4 py-3 text-left transition hover:border-[#f4b82e]/50 disabled:opacity-60"><span className="text-sm font-semibold text-white">Bitcoin</span><span className="mt-1 block text-xs text-slate-500">UniSat wallet</span></button></div>{walletError && <p role="alert" className="mt-3 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs leading-5 text-rose-200">{walletError}</p>}{connectedWallet && <p className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs leading-5 text-emerald-200">{connectedWallet.chain} wallet connected: {connectedWallet.address.slice(0, 8)}…{connectedWallet.address.slice(-6)}</p>}<div className="mt-6 rounded-2xl border border-[#f4b82e]/20 bg-[#071126] p-4"><div className="mb-4"><p className="text-sm font-semibold text-white">Investment payment destinations</p><p className="mt-1 text-xs leading-5 text-slate-500">Send funds only to the treasury wallet for the selected network.</p></div><div className="flex flex-col gap-2">{treasuryWallets.map((wallet) => <button key={wallet.chain} type="button" onClick={() => copyTreasuryAddress(wallet.address)} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-3 text-left transition hover:border-[#f4b82e]/50"><span className="min-w-0"><span className="block text-xs font-semibold text-[#f4b82e]">{wallet.chain} · {wallet.asset}</span><span className="mt-1 block truncate font-mono text-[11px] text-slate-300">{wallet.address}</span></span><Copy className="size-4 shrink-0 text-slate-400" /></button>)}</div>{copied && <p className="mt-3 text-xs text-emerald-300">Treasury address copied.</p>}</div><div className="mt-6 rounded-2xl border border-white/10 bg-[#071126] p-4"><p className="text-xs text-slate-500">Demo deposit address</p><div className="mt-2 flex items-center justify-between gap-3"><code className="text-sm text-[#fbd77a]">0x2e7a...9F31</code><button onClick={copyAddress} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Copy address">{copied ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}</button></div></div><button onClick={() => connectedWallet ? setSelectedPlan(null) : setWalletError('Connect a wallet above before continuing securely.')} className="mt-6 w-full rounded-full bg-[#f4b82e] py-3 font-semibold text-[#071126] hover:bg-[#ffd369]">{connectedWallet ? 'Continue securely' : 'Connect wallet to continue'}</button><p className="mt-4 text-center text-[11px] text-slate-500">Illustrative interface only. Investment values can go down as well as up.</p></div></div>}
    </main>
  )
}
