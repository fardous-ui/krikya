<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Krikya - লাইভ প্ল্যাটফর্ম ও ক্র্যাশ গেমস</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        :root {
          --bg: #0b0c10;
          --panel: #181a20;
          --panel-light: #222630;
          --green: #28a745;
          --green-glow: #32d74b;
          --red: #e63946;
          --red-glow: #ff4d5d;
          --purple: #9d4edd;
          --blue: #00b4d8;
          --gold: #ffb703;
          --white: #f8f9fa;
          --text-muted: #8e9aaf;
          --border: #2c303e;
        }

        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body {
            font-family: 'Hind Siliguri', sans-serif;
            background: var(--bg);
            color: var(--white);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
            user-select: none;
            overflow-x: hidden;
        }

        .page-transition {
            animation: pageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pageSlideIn {
            0% { opacity: 0; transform: translateY(10px) scale(0.99); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .main-wrapper {
            width: 100%;
            max-width: 500px;
            margin: auto;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: #12141c;
            box-shadow: 0 0 35px rgba(0,0,0,0.85);
            position: relative;
        }

        .top-bar {
          height: 54px; background: var(--panel);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 10px; position: sticky; top: 0; z-index: 50;
          border-bottom: 1px solid var(--border);
        }

        .logo {
          font-size: 20px; font-weight: 900; font-style: italic;
          color: #ff6600; letter-spacing: -0.5px;
          display: flex; align-items: center; gap: 4px;
        }
        .logo span { color: #fff; }

        .balance-box {
          background: #111318; border: 1px solid #2d3240;
          border-radius: 20px; padding: 4px 8px; font-size: 12px; color: var(--text-muted);
        }
        .balance-box b { color: var(--green-glow); font-size: 13px; margin-right: 2px; }

        .history-bar {
          height: 38px; background: #111318; display: flex; align-items: center;
          gap: 6px; overflow-x: auto; padding: 0 10px; white-space: nowrap;
          border-bottom: 1px solid var(--border);
          scrollbar-width: none;
        }
        .history-bar::-webkit-scrollbar { display: none; }

        .history-pill {
          padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 700;
          background: #1c202a; flex-shrink: 0;
        }
        .history-pill.blue { color: var(--blue); border: 1px solid rgba(0,180,216,0.3); }
        .history-pill.purple { color: var(--purple); border: 1px solid rgba(157,78,221,0.3); }
        .history-pill.gold { color: var(--gold); border: 1px solid rgba(255,183,3,0.3); }
        .history-pill.red { color: var(--red-glow); border: 1px solid rgba(230,57,70,0.3); }

        .game-container {
          position: relative; width: 100%; height: 230px; background: #0c0f17;
          overflow: hidden; border-bottom: 1px solid var(--border);
        }

        canvas.game-canvas { width: 100%; height: 100%; display: block; }

        .multiplier-display {
          position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);
          text-align: center; z-index: 2; pointer-events: none;
        }
        .multiplier-val {
          font-size: 46px; font-weight: 900; color: #fff;
          text-shadow: 0 0 20px rgba(255,255,255,0.4);
          line-height: 1;
        }
        .multiplier-val.high-mult {
          color: #ffb703;
          text-shadow: 0 0 25px rgba(255, 183, 3, 0.7);
          animation: pulse 0.8s infinite;
        }
        .status-text {
          font-size: 12px; font-weight: 600; text-transform: uppercase;
          color: var(--text-muted); margin-top: 6px; letter-spacing: 1px;
        }
        .crashed-text { color: var(--red-glow) !important; text-shadow: 0 0 10px var(--red); }

        .crowd-counter {
          position: absolute; right: 10px; bottom: 10px; z-index: 3;
          background: rgba(24, 26, 32, 0.85); backdrop-filter: blur(4px);
          border: 1px solid var(--border); border-radius: 16px;
          padding: 4px 10px; font-size: 11px; color: #e0e0e0;
          display: flex; align-items: center; gap: 6px;
        }
        .live-dot {
          width: 7px; height: 7px; background: var(--green-glow); border-radius: 50%;
          box-shadow: 0 0 6px var(--green-glow); animation: pulse 1.5s infinite;
        }

        .panels-container {
          padding: 8px; display: flex; flex-direction: column; gap: 8px; background: #111318;
        }

        .bet-panel {
          background: var(--panel); border-radius: 16px; padding: 10px;
          border: 1px solid var(--border);
        }

        .panel-body { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; align-items: center; }

        .amount-controls { display: flex; flex-direction: column; gap: 5px; }
        .amount-stepper {
          display: flex; align-items: center; justify-content: space-between;
          background: #101216; border-radius: 20px; padding: 2px 6px;
          border: 1px solid var(--border);
        }
        .step-btn {
          width: 26px; height: 26px; border-radius: 50%; border: none;
          background: var(--panel-light); color: #fff; font-size: 14px; font-weight: bold;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .step-btn:active { background: #3a3f50; }
        .amount-display-input {
          background: transparent; border: none; color: #fff; font-size: 13px; font-weight: 700;
          text-align: center; width: 60px; outline: none;
        }

        .quick-amounts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; }
        .quick-btn {
          background: #101216; border: 1px solid var(--border); color: var(--text-muted);
          border-radius: 8px; padding: 4px 0; font-size: 11px; font-weight: 600;
          cursor: pointer; transition: 0.15s;
        }
        .quick-btn:active { background: #1b6b44; color: #fff; }

        .main-action-btn {
          width: 100%; height: 100%; min-height: 72px; border-radius: 14px; border: none;
          background: linear-gradient(180deg, #28a745 0%, #1e7e34 100%);
          color: #fff; font-size: 15px; font-weight: 900; cursor: pointer;
          box-shadow: 0 4px 12px rgba(40,167,69,0.3); transition: all 0.15s;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          line-height: 1.1;
        }
        .main-action-btn small { font-size: 11px; font-weight: 600; opacity: 0.95; margin-top: 3px; }
        .main-action-btn.cancel {
          background: linear-gradient(180deg, #d90429 0%, #a0001c 100%);
          box-shadow: 0 4px 12px rgba(217,4,41,0.3);
        }
        .main-action-btn.cashout {
          background: linear-gradient(180deg, #ff9f1c 0%, #d47a00 100%);
          box-shadow: 0 4px 12px rgba(255,159,28,0.4); color: #000;
        }
        .main-action-btn:active { transform: scale(0.97); }

        .auto-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 6px; padding-top: 6px; border-top: 1px solid var(--border);
          font-size: 11px; color: var(--text-muted);
        }

        .toggle-switch {
          position: relative; display: inline-block; width: 30px; height: 15px;
        }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute; cursor: pointer; inset: 0; background-color: #2c303e;
          border-radius: 20px; transition: .2s;
        }
        .slider:before {
          position: absolute; content: ""; height: 11px; width: 11px; left: 2px; bottom: 2px;
          background-color: white; border-radius: 50%; transition: .2s;
        }
        input:checked + .slider { background-color: var(--green-glow); }
        input:checked + .slider:before { transform: translateX(15px); }

        .auto-val-input {
          width: 48px; background: #101216; border: 1px solid var(--border);
          color: #fff; border-radius: 6px; text-align: center; padding: 2px; font-weight: bold;
        }

        .stats-section {
          flex: 1; background: var(--panel); margin-top: 4px; padding: 10px;
          border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 8px;
          padding-bottom: 70px;
        }

        .section-tabs {
          display: flex; background: #101216; border-radius: 10px; padding: 3px; gap: 2px;
        }
        .tab-item {
          flex: 1; border: none; background: transparent; color: var(--text-muted);
          padding: 6px 0; font-size: 12px; font-weight: 600; border-radius: 8px; cursor: pointer;
        }
        .tab-item.active { background: var(--panel-light); color: #fff; }

        .stats-summary {
          background: #101216; border-radius: 10px; padding: 8px 10px;
          display: flex; justify-content: space-between; align-items: center;
          border: 1px solid var(--border); font-size: 12px;
        }
        .stats-summary strong { font-size: 14px; color: var(--green-glow); }

        .bets-list {
          display: flex; flex-direction: column; gap: 5px; max-height: 180px;
          overflow-y: auto; padding-right: 2px;
        }
        .bets-list::-webkit-scrollbar { width: 3px; }
        .bets-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

        .bet-row {
          display: flex; justify-content: space-between; align-items: center;
          background: #111318; padding: 6px 10px; border-radius: 8px;
          font-size: 11px; border: 1px solid #1c202a;
        }
        .bet-row.cashed { background: rgba(40,167,69,0.1); border-color: rgba(40,167,69,0.3); }
        .bet-row.user-bet { border-left: 3px solid var(--gold); }
        .player-info { display: flex; align-items: center; gap: 6px; }
        .player-name { font-weight: 600; color: #ddd; }
        .bet-amt { color: var(--text-muted); font-size: 10px; }
        .win-info { text-align: right; }
        .win-mult { font-weight: 700; color: var(--purple); margin-right: 5px; }
        .win-amt { font-weight: 700; color: var(--green-glow); }

        .toast {
          position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
          background: #1e2532; border: 1px solid var(--gold); color: #fff;
          padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600;
          z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.6); text-align: center; max-width: 90%;
        }
        .toast.show { opacity: 1; }

        .referral-3d-card {
            background: linear-gradient(135deg, #1b2838 0%, #0f172a 50%, #1e1b4b 100%);
            border: 2px solid #6366f1;
            box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.05);
            perspective: 1000px;
            transform-style: preserve-3d;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .referral-3d-card:hover {
            transform: translateY(-4px) rotateX(4deg) scale(1.01);
        }
        .pulse-glow-badge {
            animation: glowPulse 2s infinite alternate;
        }
        @keyframes glowPulse {
            0% { box-shadow: 0 0 5px #ffb703, 0 0 10px #ffb703; }
            100% { box-shadow: 0 0 15px #ffb703, 0 0 25px #ffb703; }
        }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    </style>
</head>
<body>

    <div class="main-wrapper page-transition" id="appContainer"></div>
    <div class="toast" id="toast"></div>

    <!-- Welcome Bonus Notification Modal -->
    <div id="welcomeNotifModal" class="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-b from-[#1b2a22] to-[#12161c] border-2 border-emerald-500 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-center text-xs">
            <div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-emerald-400">
                <i class="fa-solid fa-gift text-white text-3xl animate-pulse"></i>
            </div>
            <h3 class="text-lg font-extrabold text-emerald-400 mb-1">অভিনন্দন! স্পেশাল অফার</h3>
            <p class="text-white text-sm font-bold mb-2">নতুন অ্যাকাউন্ট খোলার সাথে সাথেই পান <span class="text-amber-300 text-base">৳১০০ টাকা বোনাস!</span></p>
            <p class="text-slate-300 text-[11px] mb-4">আপনার মোবাইল নম্বর দিয়ে এখনই রেজিস্ট্রেশন সম্পন্ন করুন এবং ১০০ টাকা ফ্রি ব্যালেন্স দিয়ে খেলা শুরু করুন।</p>
            <button onclick="closeWelcomeNotif()" class="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-extrabold py-3 rounded-xl transition shadow-lg text-sm">
                অ্যাকাউন্ট খুলুন ও ১০০ ৳ বোনাস নিন
            </button>
        </div>
    </div>

    <!-- Free Coin Spin Wheel Modal -->
    <div id="spinWheelModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-slate-900 border border-amber-500/50 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative text-center text-xs">
            <button onclick="closeSpinWheelModal()" class="absolute top-3 right-3 text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-base font-bold text-amber-400 mb-1 flex items-center justify-center gap-2"><i class="fa-solid fa-arrows-spin text-lg"></i> ফ্রি কয়েন স্পিন চাকা</h3>
            <p class="text-slate-300 text-[11px] mb-3">প্রতি ১০ কয়েন জমার পর চাকাটি ঘুরিয়ে জিতে নিন মেগা পুরষ্কার!</p>
            
            <div class="w-48 h-48 mx-auto relative flex items-center justify-center my-3">
                <div id="wheelGraphic" class="w-full h-full rounded-full border-4 border-amber-500 bg-gradient-to-tr from-amber-600 via-purple-600 to-emerald-600 shadow-xl transition-transform duration-[3000ms] cubic-bezier(0.15, 0.9, 0.15, 1) flex items-center justify-center">
                    <span class="text-white font-extrabold text-lg drop-shadow">🎁 SPIN</span>
                </div>
                <div class="absolute -top-2 text-red-500 text-2xl drop-shadow"><i class="fa-solid fa-caret-down"></i></div>
            </div>

            <div class="text-slate-300 mb-3">জমা ফ্রি কয়েন: <b class="text-amber-400 text-sm" id="userCoinCount">10</b> / 10</div>
            <button onclick="triggerSpinWheel()" class="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold py-2.5 rounded-xl transition shadow text-sm">
                চাকা ঘুরান (Spin Now)
            </button>
        </div>
    </div>

    <!-- Store / Reward Modal -->
    <div id="storeModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl relative text-xs">
            <button onclick="closeStoreModal()" class="absolute top-3 right-3 text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-base font-bold text-emerald-400 mb-2 flex items-center gap-2"><i class="fa-solid fa-store"></i> পুরস্কারের দোকান</h3>
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-3 text-slate-300">
                <p class="font-bold text-white mb-1">দৈনিক ভিজিট বোনাস (৩০ ৳)</p>
                <p class="text-[11px] text-slate-400">প্রতিদিন প্ল্যাটফর্মে প্রবেশ করে বিনামূল্যে ৩০ টাকা দাবি করুন।</p>
            </div>
            <button onclick="claimDailyStoreReward()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded transition shadow">৩০ টাকা দাবি করুন</button>
        </div>
    </div>

    <!-- Slide-out Sidebar Menu -->
    <div id="sidebarOverlay" class="fixed inset-0 bg-black/70 z-50 hidden" onclick="toggleSidebar()"></div>
    <div id="sidebarMenu" class="fixed top-0 left-0 bottom-0 w-72 bg-[#1b1e24] z-50 transform -translate-x-full transition-transform duration-300 flex flex-col shadow-2xl overflow-y-auto text-xs">
        <div class="bg-[#12141a] p-3.5 flex items-center justify-between border-b border-slate-700">
            <div class="logo">KRI<span>KYA</span></div>
            <div class="flex items-center space-x-1 bg-slate-900 px-2.5 py-1 rounded-full border border-emerald-600 text-[11px] text-white">
                <span class="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                <span>৳ BDT</span>
            </div>
        </div>

        <div class="flex-grow py-2 space-y-1 text-orange-400 font-semibold">
            <div onclick="sidebarNav('home')" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <i class="fa-solid fa-house text-base w-5 text-center"></i>
                <span class="text-white text-sm">বাড়ি</span>
            </div>
            <div onclick="openDepositModal(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60 text-emerald-400">
                <i class="fa-solid fa-wallet text-base w-5 text-center"></i>
                <span class="text-white text-sm">ডিপোজিট</span>
            </div>
            <div onclick="openWithdrawModal(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60 text-orange-400">
                <i class="fa-solid fa-money-bill-transfer text-base w-5 text-center"></i>
                <span class="text-white text-sm">উইথড্র</span>
            </div>
            <div onclick="sidebarNav('offer')" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <i class="fa-solid fa-percent text-base w-5 text-center"></i>
                <span class="text-white text-sm">অফার ও রেফারেল</span>
            </div>
            <div onclick="openSpinWheelModal(); toggleSidebar();" class="flex items-center justify-between px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-arrows-spin text-base w-5 text-center text-amber-400"></i>
                    <span class="text-white text-sm">ফ্রি কয়েন স্পিন</span>
                </div>
                <span class="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">FREE</span>
            </div>
            <div onclick="openStoreModal(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <i class="fa-solid fa-store text-base w-5 text-center text-emerald-400"></i>
                <span class="text-white text-sm">পুরস্কারের দোকান</span>
            </div>
            <div onclick="switchView('settings'); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60 text-cyan-400">
                <i class="fa-solid fa-gear text-base w-5 text-center"></i>
                <span class="text-white text-sm">সেটিংস ও সাউন্ড</span>
            </div>

            <div class="px-4 pt-3 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">এক্সক্লুসিভ গেমস</div>
            <div onclick="launchAviatorGame(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <i class="fa-solid fa-plane text-base w-5 text-center text-red-400"></i>
                <span class="text-white text-sm">Aviator (প্লেন গেম)</span>
            </div>
            <div onclick="launchJetXGame(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <i class="fa-solid fa-robot text-base w-5 text-center text-cyan-400"></i>
                <span class="text-white text-sm">RobotX (রোবট গেম)</span>
            </div>
            <div onclick="launchRocketGame(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <i class="fa-solid fa-rocket text-base w-5 text-center text-amber-400"></i>
                <span class="text-white text-sm">RocketX (রকেট গেম)</span>
            </div>
            <div onclick="launchDiceGame(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer border-b border-slate-800/60">
                <i class="fa-solid fa-dice text-base w-5 text-center text-purple-400"></i>
                <span class="text-white text-sm">Lucky Dice (ডাইস গেম)</span>
            </div>

            <div onclick="logout(); toggleSidebar();" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 cursor-pointer text-red-500 font-bold mt-4">
                <i class="fa-solid fa-right-from-bracket text-base w-5 text-center"></i>
                <span class="text-sm">লগ আউট</span>
            </div>
        </div>
    </div>

    <!-- In-Game Sound Settings Modal -->
    <div id="gameSoundModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl relative text-xs space-y-3">
            <button onclick="closeGameSoundModal()" class="absolute top-3 right-3 text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-base font-bold text-cyan-400 mb-2 flex items-center gap-2"><i class="fa-solid fa-volume-high"></i> গেম সাউন্ড সেটিংস</h3>
            
            <div class="space-y-3">
                <div class="flex justify-between items-center bg-slate-800 p-2.5 rounded border border-slate-700">
                    <div>
                        <div class="font-bold text-white">১. ওড়ার সময় সাউন্ড (Engine)</div>
                        <div class="text-[10px] text-slate-400">গেম ওড়ার সময় পিচ সাউন্ড</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="soundEngineToggle" checked onchange="toggleSoundSetting('engine', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="flex justify-between items-center bg-slate-800 p-2.5 rounded border border-slate-700">
                    <div>
                        <div class="font-bold text-white">২. ক্রাশ করার সাউন্ড (Crash)</div>
                        <div class="text-[10px] text-slate-400">গেম ক্র্যাশ করলে বিস্ফোরক সাউন্ড</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="soundCrashToggle" checked onchange="toggleSoundSetting('crash', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="flex justify-between items-center bg-slate-800 p-2.5 rounded border border-slate-700">
                    <div>
                        <div class="font-bold text-white">৩. ক্যাশআউট সাউন্ড (Cashout/Win)</div>
                        <div class="text-[10px] text-slate-400">টাকা তোলার সময় উইনিং সাউন্ড</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="soundCashoutToggle" checked onchange="toggleSoundSetting('cashout', this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <button onclick="closeGameSoundModal()" class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded transition shadow mt-2">সংরক্ষণ করুন</button>
        </div>
    </div>

    <!-- Deposit Modal -->
    <div id="depositModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl relative text-xs">
            <button onclick="closeDepositModal()" class="absolute top-3 right-3 text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2"><i class="fa-solid fa-wallet"></i> লাইভ ডিপোজিট গেটওয়ে</h3>
            
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-3">
                <p class="text-slate-300 mb-1">প্রাপক পার্সোনাল নম্বর (বিকাশ / নগদ / রকেট):</p>
                <div class="flex items-center justify-between bg-slate-900 px-3 py-2 rounded border border-emerald-600">
                    <span id="agentNumber" class="font-bold text-orange-400 text-sm">01751441952</span>
                    <button onclick="copyNumber()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-[11px] font-bold">কপি</button>
                </div>
            </div>

            <form onsubmit="handleDepositSubmit(event)" class="space-y-3">
                <div>
                    <label class="block text-slate-300 mb-1">পেমেন্ট মেথড বেছে নিন</label>
                    <select id="depMethod" class="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-emerald-500">
                        <option value="bKash">বিকাশ (bKash Pay)</option>
                        <option value="Nagad">নগদ (Nagad Pay)</option>
                        <option value="Rocket">রকেট (Rocket Pay)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-slate-300 mb-1">ডিপোজিট পরিমাণ (BDT)</label>
                    <input type="number" id="depAmount" required placeholder="পরিমাণ প্রদান করুন" class="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-slate-300 mb-1">ট্রানজেকশন আইডি (TrxID)</label>
                    <input type="text" id="depTrxID" required placeholder="যেমন: 9N78K5J2..." class="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white uppercase focus:outline-none focus:border-emerald-500">
                </div>
                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded transition shadow">ডিপোজিট নিশ্চিত করুন</button>
            </form>
        </div>
    </div>

    <!-- Withdrawal Modal -->
    <div id="withdrawModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl relative text-xs">
            <button onclick="closeWithdrawModal()" class="absolute top-3 right-3 text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-base font-bold text-orange-400 mb-3 flex items-center gap-2"><i class="fa-solid fa-money-bill-transfer"></i> লাইভ উইথড্রল গেটওয়ে</h3>
            
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-3 text-slate-300">
                <div class="flex justify-between mb-1">
                    <span>মূল ব্যালেন্স:</span>
                    <strong class="text-emerald-400" id="withdrawModalBalance">0.00 BDT</strong>
                </div>
                <p class="text-[10px] text-amber-400">⚠️ সর্বনিম্ন উইথড্র ৫০০ ৳ এবং সর্বোচ্চ ২৫,০০০ ৳।</p>
            </div>

            <form onsubmit="handleWithdrawSubmit(event)" class="space-y-3">
                <div>
                    <label class="block text-slate-300 mb-1">উইথড্র মাধ্যম</label>
                    <select id="wdMethod" class="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-orange-500">
                        <option value="bKash">বিকাশ (bKash Personal)</option>
                        <option value="Nagad">নগদ (Nagad Personal)</option>
                        <option value="Rocket">রকেট (Rocket Personal)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-slate-300 mb-1">আপনার অ্যাকাউন্ট নম্বর (Personal)</label>
                    <input type="tel" id="wdNumber" required placeholder="যেমন: 01712345678" class="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-orange-500">
                </div>
                <div>
                    <label class="block text-slate-300 mb-1">উইথড্র পরিমাণ (BDT)</label>
                    <input type="number" id="wdAmount" required placeholder="যেমন: 1000" class="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-orange-500">
                </div>
                <button type="submit" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded transition shadow">উইথড্র নিশ্চিত করুন</button>
            </form>
        </div>
    </div>

    <!-- Referral Modal -->
    <div id="referralModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl relative text-xs">
            <button onclick="closeReferralModal()" class="absolute top-3 right-3 text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-base font-bold text-orange-400 mb-3 flex items-center gap-2"><i class="fa-solid fa-share-nodes"></i> রেফারেল প্রোগ্রাম</h3>
            <p class="text-slate-300 mb-3">আপনার বন্ধুকে ইনভাইট করুন এবং প্রতিটি সফল রেজিস্ট্রেশনে পান ৳১০০ ইনস্ট্যান্ট ক্যাশ বোনাস!</p>
            <div class="bg-slate-800 p-2.5 rounded border border-slate-700 mb-3 flex items-center justify-between">
                <span id="refLink" class="text-emerald-400 font-mono text-[11px] truncate mr-2">https://fardous-ui.github.io/-krikya-live-gaming/</span>
                <button onclick="copyRefLink()" class="bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1 rounded font-bold shrink-0">লিংক কপি</button>
            </div>
            
            <div class="grid grid-cols-3 gap-2 mb-3">
                <button onclick="shareSocial('whatsapp')" class="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-md">
                    <i class="fa-brands fa-whatsapp text-sm"></i> WhatsApp
                </button>
                <button onclick="shareSocial('telegram')" class="bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-md">
                    <i class="fa-brands fa-telegram text-sm"></i> Telegram
                </button>
                <button onclick="shareSocial('facebook')" class="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-md">
                    <i class="fa-brands fa-facebook text-sm"></i> Facebook
                </button>
            </div>

            <div class="text-slate-400 text-[11px]">মোট রেফারেল: <b class="text-white">৩ জন</b> | অর্জিত বোনাস: <b class="text-emerald-400">৩০০ BDT</b></div>
        </div>
    </div>

    <!-- Login Popup Modal -->
    <div id="loginModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-[#1f232b] border border-[#2d323d] w-full max-w-sm rounded-xl p-5 shadow-2xl relative text-xs">
            <div class="flex items-center justify-between bg-[#171a21] -mx-5 -mt-5 p-3.5 rounded-t-xl border-b border-[#2d323d] mb-4">
                <span class="text-white font-bold text-sm">Krikya এ স্বাগতম</span>
                <button onclick="closeLoginModal()" class="text-slate-400 hover:text-white text-lg"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <form onsubmit="handleLoginModalSubmit(event)" class="space-y-3">
                <div>
                    <label class="block text-slate-300 mb-1">ব্যবহারকারীর নাম <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-orange-500"><i class="fa-solid fa-user text-xs"></i></span>
                        <input type="text" id="modal-login-username" required placeholder="এখানে পূরণ করুন" class="w-full pl-9 pr-3 py-2.5 bg-[#171a21] border border-[#373d4a] rounded text-xs text-white focus:outline-none focus:border-orange-500">
                    </div>
                </div>
                <div>
                    <label class="block text-slate-300 mb-1">পাসওয়ার্ড <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-orange-500"><i class="fa-solid fa-lock text-xs"></i></span>
                        <input type="password" id="modal-login-password" required placeholder="এখানে পূরণ করুন" class="w-full pl-9 pr-3 py-2.5 bg-[#171a21] border border-[#373d4a] rounded text-xs text-white focus:outline-none focus:border-orange-500">
                    </div>
                </div>
                <div id="modal-login-msg" class="text-center text-red-400 hidden"></div>
                <button type="submit" class="w-full bg-[#ffb703] hover:bg-[#f3a800] text-black font-bold py-2.5 rounded transition shadow text-sm">প্রবেশ করুন</button>
                <div class="text-center pt-2 text-slate-300">
                    অ্যাকাউন্ট নেই? <button type="button" onclick="closeLoginModal(); switchView('auth');" class="text-orange-400 font-bold hover:underline">নিবন্ধন</button>
                </div>
            </form>
        </div>
    </div>

    <!-- JavaScript Application Logic -->
    <script>
        let currentUser = localStorage.getItem('krikya_logged_user') || null;
        let balance = parseFloat(localStorage.getItem('krikya_balance') || (currentUser ? '100.00' : '0.00'));
        let freeCoins = parseInt(localStorage.getItem('krikya_free_coins') || '10');
        let currentView = localStorage.getItem('krikya_current_view') || 'home'; 
        let userVipLevel = parseInt(localStorage.getItem('krikya_vip') || '1');
        
        // Individual Sound Settings States per Game
        let soundSettings = JSON.parse(localStorage.getItem('krikya_sound_settings') || JSON.stringify({
            aviator: { engine: true, crash: true, cashout: true },
            robotx: { engine: true, crash: true, cashout: true },
            rocketx: { engine: true, crash: true, cashout: true }
        }));

        let activeGameSoundContextKey = 'aviator';
        let adBannerIndex = 0;
        let adBannerTimer = null;

        const ownerImg = new Image();
        ownerImg.src = "39691_3.jpg";

        let audioCtx = null;
        let pitchOscillator = null;
        let pitchGain = null;

        function getAudioContext() {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            return audioCtx;
        }

        function playBeep(freq = 600, duration = 0.08) {
            try {
                const ctx = getAudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.04, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + duration);
            } catch(e){}
        }

        function startEngineSound(gameKey) {
            if (!soundSettings[gameKey] || !soundSettings[gameKey].engine) return;
            try {
                stopEngineSound();
                const ctx = getAudioContext();
                pitchOscillator = ctx.createOscillator();
                pitchGain = ctx.createGain();
                
                // Unique sound waveform tone per game
                if (gameKey === 'aviator') pitchOscillator.type = 'sawtooth';
                else if (gameKey === 'robotx') pitchOscillator.type = 'square';
                else pitchOscillator.type = 'triangle';

                pitchOscillator.frequency.setValueAtTime(110, ctx.currentTime);
                pitchGain.gain.setValueAtTime(0.03, ctx.currentTime);
                pitchOscillator.connect(pitchGain);
                pitchGain.connect(ctx.destination);
                pitchOscillator.start();
            } catch(e){}
        }

        function updateEnginePitch(gameKey, mult) {
            if (!soundSettings[gameKey] || !soundSettings[gameKey].engine || !pitchOscillator) return;
            try {
                const ctx = getAudioContext();
                const newFreq = Math.min(850, 110 + mult * 70);
                pitchOscillator.frequency.setTargetAtTime(newFreq, ctx.currentTime, 0.08);
            } catch(e){}
        }

        function stopEngineSound() {
            if (pitchOscillator) {
                try {
                    pitchOscillator.stop();
                    pitchOscillator.disconnect();
                } catch(e){}
                pitchOscillator = null;
                pitchGain = null;
            }
        }

        function playSoundEffect(gameKey, type) {
            if (!soundSettings[gameKey] || !soundSettings[gameKey][type]) return;
            try {
                const ctx = getAudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                if (type === 'cashout') {
                    // Distinct winning chime per game
                    let baseFreq = gameKey === 'aviator' ? 523.25 : (gameKey === 'robotx' ? 659.25 : 783.99);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
                    osc.frequency.setValueAtTime(baseFreq * 1.25, ctx.currentTime + 0.1);
                    osc.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.2);
                    gain.gain.setValueAtTime(0.12, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.35);
                } else if (type === 'crash') {
                    stopEngineSound();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(200, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.45);
                    gain.gain.setValueAtTime(0.2, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.45);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.45);
                } else if (type === 'start') {
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(300, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.3);
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.3);
                    startEngineSound(gameKey);
                }
            } catch(e){}
        }

        function openGameSoundModal(gameKey) {
            activeGameSoundContextKey = gameKey;
            const settings = soundSettings[gameKey];
            document.getElementById('soundEngineToggle').checked = settings.engine;
            document.getElementById('soundCrashToggle').checked = settings.crash;
            document.getElementById('soundCashoutToggle').checked = settings.cashout;
            document.getElementById('gameSoundModal').classList.remove('hidden');
        }

        function closeGameSoundModal() {
            document.getElementById('gameSoundModal').classList.add('hidden');
        }

        function toggleSoundSetting(type, val) {
            soundSettings[activeGameSoundContextKey][type] = val;
            localStorage.setItem('krikya_sound_settings', JSON.stringify(soundSettings));
            showToast(`${activeGameSoundContextKey.toUpperCase()} - ${type} সাউন্ড আপডেট করা হয়েছে`);
        }

        function createGameInstance(spriteIcon, themeColor, defaultName) {
            return {
                spriteIcon: spriteIcon,
                themeColor: themeColor,
                title: defaultName,
                gameState: 'WAITING',
                multiplier: 1.00,
                crashPoint: 1.20,
                startTime: 0,
                countdownValue: 6,
                countdownTimer: null,
                animFrameId: null,
                history: [1.12, 2.45, 1.08, 3.35, 1.22, 1.05, 5.70, 1.18],
                activeBets: [],
                chatMessages: [
                    { user: 'Sabbir_BD', text: 'আজ ৩x এর উপরে উঠছে! দারুণ গেম 🚀' },
                    { user: 'Rahim_99', text: 'সবাই ১.৮x এ ক্যাশআউট করুন' }
                ],
                currentTab: 'all',
                onlinePlayers: 420,
                panels: [
                    { amount: 50, autoCash: false, autoVal: 2.00, active: false, cashed: false },
                    { amount: 50, autoCash: false, autoVal: 1.50, active: false, cashed: false }
                ]
            };
        }

        const gameEngines = {
            aviator: createGameInstance('✈️', '#e63946', 'Aviator'),
            robotx: createGameInstance('🤖', '#00b4d8', 'RobotX'),
            rocketx: createGameInstance('🚀', '#ffb703', 'RocketX')
        };

        function showToast(msg) {
            const t = document.getElementById('toast');
            if (!t) return;
            t.textContent = msg;
            t.classList.add('show');
            setTimeout(() => t.classList.remove('show'), 3000);
        }

        function formatMoney(num) {
            return (num || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function updateBalanceDisplay() {
            localStorage.setItem('krikya_balance', balance);
            if (currentUser) {
                localStorage.setItem('krikya_bal_' + currentUser, balance);
            }
            document.querySelectorAll('#balance, #balanceX, #balanceRocket, #balanceDice, .balance-box b').forEach(el => {
                if (el) el.textContent = formatMoney(balance);
            });
        }

        function switchView(view) {
            stopEngineSound();
            if (adBannerTimer) clearInterval(adBannerTimer);
            currentView = view;
            localStorage.setItem('krikya_current_view', view);
            renderApp();
        }

        function toggleSidebar() {
            const menu = document.getElementById('sidebarMenu');
            const overlay = document.getElementById('sidebarOverlay');
            if (!menu || !overlay) return;
            if (menu.classList.contains('-translate-x-full')) {
                menu.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
            } else {
                menu.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        }

        function sidebarNav(target) {
            toggleSidebar();
            if (target === 'home') switchView('home');
            else if (target === 'offer') openReferralModal();
            else if (target === 'vip') switchView('profile');
        }

        function closeWelcomeNotif() {
            document.getElementById('welcomeNotifModal').classList.add('hidden');
        }

        function openSpinWheelModal() {
            const el = document.getElementById('userCoinCount');
            if (el) el.textContent = freeCoins;
            document.getElementById('spinWheelModal').classList.remove('hidden');
        }
        function closeSpinWheelModal() { document.getElementById('spinWheelModal').classList.add('hidden'); }

        function triggerSpinWheel() {
            if (freeCoins < 10) {
                showToast('ফ্রি স্পিনের জন্য কমপক্ষে ১০ ফ্রি কয়েন প্রয়োজন!');
                return;
            }
            const wheel = document.getElementById('wheelGraphic');
            const rewards = [50, 100, 200, 300, 500];
            const selectedReward = rewards[Math.floor(Math.random() * rewards.length)];

            wheel.style.transform = 'rotate(1440deg)';
            setTimeout(() => {
                freeCoins -= 10;
                balance += selectedReward;
                localStorage.setItem('krikya_free_coins', freeCoins);
                updateBalanceDisplay();
                showToast(`🎉 অভিনন্দন! স্পিন করে আপনি ${selectedReward} BDT পুরস্কার জিতেছেন!`);
                wheel.style.transform = 'rotate(0deg)';
                closeSpinWheelModal();
            }, 3000);
        }

        function openStoreModal() { document.getElementById('storeModal').classList.remove('hidden'); }
        function closeStoreModal() { document.getElementById('storeModal').classList.add('hidden'); }

        function claimDailyStoreReward() {
            const today = new Date().toDateString();
            const lastClaim = localStorage.getItem('krikya_last_daily_claim');
            if (lastClaim === today) {
                showToast('আজকের দৈনিক ৩০ টাকা পুরস্কার ইতোমধ্যে সংগ্রহ করা হয়েছে!');
                closeStoreModal();
                return;
            }
            balance += 30.00;
            localStorage.setItem('krikya_last_daily_claim', today);
            updateBalanceDisplay();
            showToast('অভিনন্দন! আপনার অ্যাকাউন্টে ৩০ টাকা যুক্ত হয়েছে।');
            closeStoreModal();
        }

        function openLoginModal() { document.getElementById('loginModal').classList.remove('hidden'); }
        function closeLoginModal() { document.getElementById('loginModal').classList.add('hidden'); }
        function openDepositModal() { document.getElementById('depositModal').classList.remove('hidden'); }
        function closeDepositModal() { document.getElementById('depositModal').classList.add('hidden'); }
        function openWithdrawModal() { 
            const balEl = document.getElementById('withdrawModalBalance');
            if (balEl) balEl.textContent = formatMoney(balance) + ' BDT';
            document.getElementById('withdrawModal').classList.remove('hidden'); 
        }
        function closeWithdrawModal() { document.getElementById('withdrawModal').classList.add('hidden'); }
        function openReferralModal() { 
            const linkEl = document.getElementById('refLink');
            if (linkEl) linkEl.textContent = 'https://fardous-ui.github.io/-krikya-live-gaming/';
            document.getElementById('referralModal').classList.remove('hidden'); 
        }
        function closeReferralModal() { document.getElementById('referralModal').classList.add('hidden'); }

        function copyNumber() {
            navigator.clipboard.writeText('01751441952');
            showToast('নম্বর সফলভাবে কপি করা হয়েছে!');
        }
        function copyRefLink() {
            navigator.clipboard.writeText('https://fardous-ui.github.io/-krikya-live-gaming/');
            showToast('রেফারেল লিংক কপি করা হয়েছে!');
        }

        function shareSocial(platform) {
            const url = encodeURIComponent('https://fardous-ui.github.io/-krikya-live-gaming/');
            const text = encodeURIComponent('Krikya-তে জয়েন করে পান ১০০ ৳ ফ্রি বোনাস! এখনই ক্র্যাশ গেম খেলতে লিংকে ক্লিক করুন:');
            let shareUrl = '';
            if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
            else if (platform === 'telegram') shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
            else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            if (shareUrl) window.open(shareUrl, '_blank');
        }

        function handleLoginModalSubmit(e) {
            e.preventDefault();
            const username = document.getElementById('modal-login-username').value.trim();
            const password = document.getElementById('modal-login-password').value;
            const msgBox = document.getElementById('modal-login-msg');

            const storedData = localStorage.getItem('krikya_user_' + username);
            if (!storedData && username !== "LIVE") {
                if (msgBox) {
                    msgBox.textContent = "ব্যবহারকারী পাওয়া যায়নি! সঠিক তথ্য দিন।";
                    msgBox.classList.remove('hidden');
                }
                return;
            }

            currentUser = username;
            localStorage.setItem('krikya_logged_user', currentUser);
            let savedBal = localStorage.getItem('krikya_bal_' + username);
            balance = savedBal !== null ? parseFloat(savedBal) : 100.00;
            updateBalanceDisplay();
            currentView = 'home';
            closeLoginModal();
            showToast("সফলভাবে প্রবেশ করেছেন!");
            renderApp();
        }

        function handleRegister(e) {
            e.preventDefault();
            const username = document.getElementById('reg-username').value.trim();
            const phone = document.getElementById('reg-phone').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            const msgBox = document.getElementById('reg-message');

            if (password.length < 8 || password !== confirm) {
                msgBox.textContent = "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে এবং মিলতে হবে!";
                msgBox.classList.remove('hidden');
                return;
            }

            localStorage.setItem('krikya_user_' + username, JSON.stringify({ username, phone, password }));
            currentUser = username;
            balance = 100.00;
            localStorage.setItem('krikya_logged_user', currentUser);
            updateBalanceDisplay();
            currentView = 'home';
            showToast("অভিনন্দন! অ্যাকাউন্ট সফল ও ৳১০০ বোনাস যুক্ত হয়েছে!");
            renderApp();
        }

        function handleDepositSubmit(e) {
            e.preventDefault();
            let amount = parseFloat(document.getElementById('depAmount').value);
            if (isNaN(amount) || amount <= 0) return;

            closeDepositModal();
            if (amount === 501) {
                showToast(`ডিপোজিট প্রসেস হচ্ছে... ২ মিনিটের মধ্যে টাকা অ্যাকাউন্টে জমা হবে।`);
                setTimeout(() => {
                    balance += 501;
                    updateBalanceDisplay();
                    showToast(`অভিনন্দন! 501.00 BDT অ্যাকাউন্টে সফলভাবে জমা হয়েছে।`);
                }, 2500);
            } else {
                showToast(`আপনার ট্রানজেকশন যাচাই করা সম্ভব হয়নি! আপনার অ্যাকাউন্টে টাকা যুক্ত করা হয়নি।`);
            }
            document.getElementById('depAmount').value = '';
            document.getElementById('depTrxID').value = '';
        }

        function handleWithdrawSubmit(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('wdAmount').value);
            if (balance < amount || amount < 500) {
                showToast('অপর্যাপ্ত ব্যালেন্স অথবা ৫০০ টাকার কম উইথড্র সম্ভব নয়!');
                return;
            }
            balance -= amount;
            updateBalanceDisplay();
            closeWithdrawModal();
            showToast(`সফল! ${formatMoney(amount)} ৳ আপনার পার্সোনাল নম্বরে স্থানান্তরিত হচ্ছে।`);
        }

        function logout() {
            currentUser = null;
            currentView = 'home';
            localStorage.removeItem('krikya_logged_user');
            renderApp();
        }

        function renderApp() {
            const container = document.getElementById('appContainer');
            if (!container) return;
            container.classList.remove('page-transition');
            void container.offsetWidth;
            container.classList.add('page-transition');

            if (!currentUser) {
                renderAuthView(container);
            } else if (currentView === 'home') {
                renderHomeView(container);
            } else if (currentView === 'game') {
                renderCrashGameView(container, 'aviator');
            } else if (currentView === 'jetx_game') {
                renderCrashGameView(container, 'robotx');
            } else if (currentView === 'rocket_game') {
                renderCrashGameView(container, 'rocketx');
            } else if (currentView === 'dice_game') {
                renderDiceGameView(container);
            } else if (currentView === 'profile') {
                renderProfileView(container);
            } else if (currentView === 'settings') {
                renderSettingsView(container);
            }
        }

        function renderAuthView(container) {
            container.innerHTML = `
                <header class="bg-[#1b6b44] shadow-md">
                    <div class="px-4 py-3 flex justify-between items-center">
                        <div class="flex items-center space-x-3">
                            <button onclick="toggleSidebar()" class="text-xl text-white"><i class="fa-solid fa-bars"></i></button>
                            <div class="text-orange-500 font-bold text-2xl tracking-wider flex items-center">
                                <span class="text-white">KRI</span>KYA
                            </div>
                        </div>
                    </div>
                </header>

                <main class="p-3 pb-24 flex-grow flex flex-col space-y-3 bg-[#12141c]">
                    <div class="bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-500 p-3 rounded-lg relative shadow flex justify-between items-center text-xs">
                        <div class="text-white font-bold">
                            🎉 নতুন অ্যাকাউন্ট খুললেই ইনস্ট্যান্ট <span class="text-amber-300">৳১০০ টাকা</span> ফ্রি বোনাস!
                        </div>
                        <button onclick="document.getElementById('welcomeNotifModal').classList.remove('hidden')" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded shrink-0 ml-2 shadow">অফার</button>
                    </div>

                    <div class="bg-[#1c222d] p-4 rounded-xl shadow-xl border border-slate-700">
                        <form id="form-register" onsubmit="handleRegister(event)" class="space-y-3">
                            <div>
                                <label class="block text-xs font-medium text-slate-300 mb-1">আসল নাম / ইউজারনেম <span class="text-red-500">*</span></label>
                                <input type="text" id="reg-username" required placeholder="আপনার পূর্ণ নাম দিন" class="w-full px-3 py-2 bg-[#171922] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-emerald-500">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-300 mb-1">মোবাইল নম্বর <span class="text-red-500">*</span></label>
                                <input type="tel" id="reg-phone" required placeholder="যেমন: 01712345678" class="w-full px-3 py-2 bg-[#171922] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-emerald-500">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-300 mb-1">পাসওয়ার্ড (ন্যূনতম ৮ সংখ্যা) <span class="text-red-500">*</span></label>
                                <input type="password" id="reg-password" required placeholder="কমপক্ষে ৮ সংখ্যার পাসওয়ার্ড" class="w-full px-3 py-2 bg-[#171922] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-emerald-500">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-300 mb-1">পাসওয়ার্ড নিশ্চিত করুন <span class="text-red-500">*</span></label>
                                <input type="password" id="reg-confirm" required placeholder="পুনরায় পাসওয়ার্ড দিন" class="w-full px-3 py-2 bg-[#171922] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-emerald-500">
                            </div>
                            <div id="reg-message" class="text-xs text-center text-red-400 hidden"></div>
                            <button type="submit" class="w-full bg-[#38a169] hover:bg-[#2f855a] text-white font-bold py-3 rounded text-xs transition shadow-md">
                                নিবন্ধন করে ৳১০০ বোনাস নিন →
                            </button>
                        </form>
                    </div>
                </main>

                <nav class="bg-[#12141c] border-t border-slate-800 fixed bottom-0 left-0 right-0 py-2.5 px-4 flex justify-between items-center z-40 max-w-[500px] mx-auto shadow-2xl text-xs">
                    <button onclick="openLoginModal()" class="w-full py-2.5 text-center font-bold bg-[#38a169] text-white rounded-lg shadow">
                        প্রবেশ করুন (Login)
                    </button>
                </nav>
            `;
        }

        function renderHomeView(container) {
            container.innerHTML = `
                <header class="bg-[#1b6b44] shadow-md">
                    <div class="px-3 py-2.5 flex justify-between items-center">
                        <div class="flex items-center space-x-2">
                            <button onclick="toggleSidebar()" class="text-lg text-white p-1"><i class="fa-solid fa-bars"></i></button>
                            <div class="text-orange-500 font-bold text-xl tracking-wider flex items-center">
                                <span class="text-white">KRI</span>KYA
                            </div>
                        </div>
                        <div class="flex items-center space-x-1.5">
                            <button onclick="openDepositModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-lg text-xs font-bold shadow flex items-center gap-1">
                                <i class="fa-solid fa-wallet"></i> ডিপোজিট
                            </button>
                            <button onclick="openWithdrawModal()" class="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow flex items-center gap-1">
                                <i class="fa-solid fa-money-bill-transfer"></i> উইথড্র
                            </button>
                            <div class="balance-box"><b id="balance">${formatMoney(balance)}</b> BDT</div>
                        </div>
                    </div>
                </header>

                <main class="p-3 pb-24 flex-grow flex flex-col space-y-3 bg-[#0f1117]">
                    <div class="relative w-full h-32 rounded-xl overflow-hidden shadow-xl border border-slate-700 bg-slate-900" id="adBannerWrapper">
                        <div id="adSlide1" class="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-4 flex flex-col justify-center transition-opacity duration-700 opacity-100">
                            <span class="bg-amber-500 text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full w-fit mb-1">VIP BONUS</span>
                            <h2 class="text-white font-black text-base leading-tight">ডিপোজিটে পান ১০০% ওয়েলকাম বোনাস!</h2>
                            <p class="text-slate-300 text-[11px] mt-0.5">সবগুলো ক্র্যাশ গেমে ১x থেকে ৫x+ পর্যন্ত ক্যাশআউট সুবিধা</p>
                        </div>
                        <div id="adSlide2" class="absolute inset-0 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-4 flex flex-col justify-center transition-opacity duration-700 opacity-0">
                            <span class="bg-emerald-400 text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full w-fit mb-1">TOURNAMENT</span>
                            <h2 class="text-amber-300 font-black text-base leading-tight">মেগা টুর্নামেন্ট! ২ লাখ টাকা প্রাইজ</h2>
                            <p class="text-slate-200 text-[11px] mt-0.5">Aviator ও RobotX খেলে জিতে নিন আকর্ষণীয় পুরষ্কার</p>
                        </div>
                        <div id="adSlide3" class="absolute inset-0 bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 p-4 flex flex-col justify-center transition-opacity duration-700 opacity-0">
                            <span class="bg-amber-400 text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full w-fit mb-1">FREE SPIN</span>
                            <h2 class="text-white font-black text-base leading-tight">প্রতিদিন ফ্রি স্পিন চাকা ঘুরিয়ে পুরষ্কার!</h2>
                            <p class="text-slate-300 text-[11px] mt-0.5">এখনই চাকা ঘুরিয়ে ৫০০ BDT পর্যন্ত ক্যাশ প্রাইস সংগ্রহ করুন</p>
                        </div>
                    </div>

                    <div class="bg-gradient-to-r from-slate-800 to-slate-900 p-3 rounded-xl border border-slate-700 flex justify-between items-center shadow-md">
                        <div class="flex items-center gap-2.5">
                            <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-base shadow">
                                ${currentUser ? currentUser.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                                <div class="font-bold text-xs text-white">${currentUser}</div>
                                <div class="text-[10px] text-orange-400 font-semibold"><i class="fa-solid fa-crown mr-1"></i> VIP Level ${userVipLevel} Member</div>
                            </div>
                        </div>
                        <button onclick="openReferralModal()" class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow flex items-center gap-1.5">
                            <i class="fa-solid fa-share-nodes"></i> রেফার করুন
                        </button>
                    </div>

                    <div class="text-xs font-bold text-slate-300 mt-1 flex items-center gap-2">
                        <i class="fa-solid fa-gamepad text-orange-500"></i> এক্সক্লুসিভ ক্র্যাশ গেমস (আলাদা সাউন্ড কন্ট্রোল সহ)
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div onclick="launchAviatorGame()" class="bg-gradient-to-b from-[#1f1619] to-[#12141c] rounded-xl p-3 border border-red-500/50 text-center shadow-lg cursor-pointer hover:border-red-500 transition">
                            <div class="bg-[#12141c] h-24 rounded-lg flex flex-col items-center justify-center mb-2 relative border border-red-900/40">
                                <span class="absolute top-1 right-1 bg-red-600 text-[9px] px-1.5 py-0.5 rounded text-white font-bold">HOT</span>
                                <i class="fa-solid fa-plane-up text-red-500 text-3xl mb-1 animate-bounce"></i>
                            </div>
                            <span class="text-xs font-extrabold text-red-400 block">Aviator গেম</span>
                        </div>

                        <div onclick="launchJetXGame()" class="bg-gradient-to-b from-[#121c22] to-[#12141c] rounded-xl p-3 border border-cyan-500/50 text-center shadow-lg cursor-pointer hover:border-cyan-500 transition">
                            <div class="bg-[#12141c] h-24 rounded-lg flex flex-col items-center justify-center mb-2 relative border border-cyan-900/40">
                                <span class="absolute top-1 right-1 bg-cyan-600 text-[9px] px-1.5 py-0.5 rounded text-white font-bold">NEW</span>
                                <i class="fa-solid fa-robot text-cyan-400 text-3xl mb-1 animate-pulse"></i>
                            </div>
                            <span class="text-xs font-extrabold text-cyan-400 block">RobotX গেম</span>
                        </div>

                        <div onclick="launchRocketGame()" class="bg-gradient-to-b from-[#221c12] to-[#12141c] rounded-xl p-3 border border-amber-500/50 text-center shadow-lg cursor-pointer hover:border-amber-500 transition">
                            <div class="bg-[#12141c] h-24 rounded-lg flex flex-col items-center justify-center mb-2 relative border border-amber-900/40">
                                <span class="absolute top-1 right-1 bg-amber-600 text-[9px] px-1.5 py-0.5 rounded text-white font-bold">PRO</span>
                                <i class="fa-solid fa-rocket text-amber-400 text-3xl mb-1 animate-bounce"></i>
                            </div>
                            <span class="text-xs font-extrabold text-amber-400 block">RocketX রকেট</span>
                        </div>

                        <div onclick="launchDiceGame()" class="bg-gradient-to-b from-[#1c1222] to-[#12141c] rounded-xl p-3 border border-purple-500/50 text-center shadow-lg cursor-pointer hover:border-purple-500 transition">
                            <div class="bg-[#12141c] h-24 rounded-lg flex flex-col items-center justify-center mb-2 relative border border-purple-900/40">
                                <span class="absolute top-1 right-1 bg-purple-600 text-[9px] px-1.5 py-0.5 rounded text-white font-bold">WIN</span>
                                <i class="fa-solid fa-dice text-purple-400 text-3xl mb-1 animate-spin"></i>
                            </div>
                            <span class="text-xs font-extrabold text-purple-400 block">Lucky Dice ডাইস</span>
                        </div>
                    </div>

                    <div onclick="openReferralModal()" class="referral-3d-card rounded-2xl p-4 relative overflow-hidden cursor-pointer my-2 border border-indigo-500/60 shadow-2xl">
                        <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                        <div class="flex items-center justify-between relative z-10">
                            <div class="space-y-1.5 max-w-[70%]">
                                <div class="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider pulse-glow-badge">
                                    <i class="fa-solid fa-gift"></i> ৳১০0 ফ্রি রেফারেল বোনাস
                                </div>
                                <h3 class="text-white font-black text-sm leading-snug drop-shadow-md">
                                    বন্ধুদের রেফার করুন ও পান প্রতি রেজিস্ট্রেশনে <span class="text-emerald-400">৳১০০ ক্যাশ!</span>
                                </h3>
                                <p class="text-slate-300 text-[11px] leading-tight flex items-center gap-1">
                                    <i class="fa-solid fa-link text-indigo-400"></i> আপনার ইউনিক রেফারেল লিংক দিয়ে ইনভাইট করুন
                                </p>
                            </div>

                            <div class="flex flex-col items-center justify-center shrink-0 ml-2">
                                <div class="w-14 h-14 bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 rounded-2xl p-0.5 shadow-lg transform rotate-3 hover:rotate-0 transition">
                                    <div class="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center border border-amber-400/40">
                                        <i class="fa-solid fa-users text-amber-400 text-xl animate-pulse"></i>
                                        <span class="text-[9px] font-black text-emerald-400 mt-0.5">SHARE</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
                            <span class="text-slate-400 truncate max-w-[210px] font-mono text-emerald-400">https://fardous-ui.github.io/-krikya-live-gaming/</span>
                            <span class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                                <i class="fa-solid fa-copy"></i> লিংক কপি
                            </span>
                        </div>
                    </div>
                </main>

                <nav class="bg-slate-950 border-t border-slate-800 fixed bottom-0 left-0 right-0 py-2 px-3 flex justify-between items-center z-40 max-w-[500px] mx-auto shadow-2xl">
                    <div class="flex flex-col items-center text-emerald-400 cursor-pointer" onclick="switchView('home')">
                        <i class="fa-solid fa-house text-base"></i>
                        <span class="text-[10px]">বাড়ি</span>
                    </div>
                    <div class="flex flex-col items-center text-slate-400 cursor-pointer" onclick="openReferralModal()">
                        <i class="fa-solid fa-percent text-base"></i>
                        <span class="text-[10px]">অফার</span>
                    </div>
                    <div class="flex flex-col items-center relative -top-4 cursor-pointer" onclick="openDepositModal()">
                        <div class="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-full p-3.5 shadow-xl border-4 border-slate-900 flex items-center justify-center">
                            <i class="fa-solid fa-wallet text-base"></i>
                        </div>
                        <span class="text-[10px] text-white font-bold mt-0.5">ডিপোজিট</span>
                    </div>
                    <div class="flex flex-col items-center text-orange-400 cursor-pointer" onclick="openWithdrawModal()">
                        <i class="fa-solid fa-money-bill-transfer text-base"></i>
                        <span class="text-[10px] font-bold">উইথড্র</span>
                    </div>
                    <div class="flex flex-col items-center text-slate-400 cursor-pointer" onclick="switchView('settings')">
                        <i class="fa-solid fa-gear text-base"></i>
                        <span class="text-[10px]">সেটিংস</span>
                    </div>
                </nav>
            `;

            startAdBannerSlider();
        }

        function startAdBannerSlider() {
            if (adBannerTimer) clearInterval(adBannerTimer);
            adBannerIndex = 0;
            adBannerTimer = setInterval(() => {
                const slides = [
                    document.getElementById('adSlide1'),
                    document.getElementById('adSlide2'),
                    document.getElementById('adSlide3')
                ];
                if (!slides[0]) return;
                slides.forEach(s => s && s.classList.add('opacity-0'));
                adBannerIndex = (adBannerIndex + 1) % slides.length;
                if (slides[adBannerIndex]) slides[adBannerIndex].classList.remove('opacity-0');
            }, 4000);
        }

        function renderProfileView(container) {
            container.innerHTML = `
                <header class="bg-[#1b6b44] shadow-md p-3 flex justify-between items-center">
                    <span class="text-white font-bold text-sm">প্রোফাইল ড্যাশবোর্ড</span>
                    <button onclick="switchView('home')" class="bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold">হোম</button>
                </header>
                <main class="p-3 pb-24 bg-[#0f1117] text-xs space-y-3">
                    <div class="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center">
                        <div class="text-amber-400 font-bold text-sm mb-1">${currentUser}</div>
                        <div class="text-slate-400 mb-3">ভিআইপি মেম্বার লেভেল: ${userVipLevel}</div>
                        <div class="flex justify-center gap-2 mb-3">
                            <button onclick="openDepositModal()" class="bg-emerald-600 text-white px-3 py-1.5 rounded font-bold">ডিপোজিট</button>
                            <button onclick="openWithdrawModal()" class="bg-orange-500 text-white px-3 py-1.5 rounded font-bold">উইথড্র</button>
                        </div>
                        <button onclick="logout()" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow">লগ আউট</button>
                    </div>
                </main>
            `;
        }

        function renderSettingsView(container) {
            container.innerHTML = `
                <header class="bg-[#1b6b44] shadow-md p-3 flex justify-between items-center">
                    <button onclick="switchView('home')" class="text-white text-xs px-2.5 py-1 bg-slate-800 rounded">ফিরে যান</button>
                    <span class="text-white font-bold text-sm">প্ল্যাটফর্ম সেটিংস ও সাউন্ড</span>
                    <div class="balance-box"><b>${formatMoney(balance)}</b> BDT</div>
                </header>
                <main class="p-3 pb-24 bg-[#0f1117] text-xs space-y-3">
                    <div class="bg-[#181a20] border border-slate-700 p-4 rounded-xl space-y-3">
                        <div class="font-bold text-slate-300 flex items-center gap-2">
                            <i class="fa-solid fa-volume-high text-emerald-400"></i> গেম সাউন্ড ম্যানেজমেন্ট
                        </div>
                        <p class="text-[11px] text-slate-400">প্রতিটি ক্র্যাশ গেমের উপরে থাকা সাউন্ড আইকনে ক্লিক করে সরাসরি ওড়ার সাউন্ড, ক্রাশ সাউন্ড এবং ক্যাশআউট সাউন্ড আলাদাভাবে কনফিগার করতে পারবেন।</p>
                    </div>
                </main>
            `;
        }

        function launchAviatorGame() { switchView('game'); }
        function launchJetXGame() { switchView('jetx_game'); }
        function launchRocketGame() { switchView('rocket_game'); }

        function renderCrashGameView(container, gameKey) {
            const ge = gameEngines[gameKey];
            container.innerHTML = `
                <header class="top-bar">
                    <div class="flex items-center space-x-1.5">
                        <button onclick="toggleSidebar()" class="text-white text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 font-bold"><i class="fa-solid fa-bars"></i></button>
                        <button onclick="switchView('home')" class="text-white text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 font-bold"><i class="fa-solid fa-arrow-left"></i></button>
                    </div>
                    <div class="logo" style="color:${ge.themeColor};">${ge.title}</div>
                    <div style="display:flex; align-items:center; gap:5px;">
                        <button onclick="openGameSoundModal('${gameKey}')" class="bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded text-white text-[10px] font-bold shadow flex items-center gap-1" title="সাউন্ড সেটিংস">
                            <i class="fa-solid fa-gear"></i>
                        </button>
                        <button onclick="openDepositModal()" class="bg-emerald-600 px-2 py-1 rounded text-white text-[10px] font-bold">ডিপোজিট</button>
                        <div class="balance-box"><b>${formatMoney(balance)}</b> BDT</div>
                    </div>
                </header>

                <div class="history-bar" id="historyBar_${gameKey}"></div>

                <section class="game-container">
                    <canvas id="canvas_${gameKey}" class="game-canvas"></canvas>
                    
                    <div class="multiplier-display">
                        <div class="multiplier-val" id="multiplier_${gameKey}">1.00x</div>
                        <div class="status-text" id="statusText_${gameKey}">প্রস্তুতি...</div>
                    </div>

                    <div class="crowd-counter">
                        <span class="live-dot" style="background:${ge.themeColor}; box-shadow:0 0 6px ${ge.themeColor};"></span>
                        <span>অনলাইন: <strong id="onlineCount_${gameKey}">${ge.onlinePlayers}</strong> জন</span>
                    </div>
                </section>

                <div class="panels-container" id="panelsContainer_${gameKey}"></div>

                <section class="stats-section">
                    <div class="section-tabs">
                        <button class="tab-item ${ge.currentTab === 'all' ? 'active' : ''}" onclick="switchStatsTab('${gameKey}', 'all', this)">সকল বেট</button>
                        <button class="tab-item ${ge.currentTab === 'my' ? 'active' : ''}" onclick="switchStatsTab('${gameKey}', 'my', this)">আমার বেট</button>
                        <button class="tab-item ${ge.currentTab === 'chat' ? 'active' : ''}" onclick="switchStatsTab('${gameKey}', 'chat', this)">লাইভ চ্যাট</button>
                    </div>

                    <div id="statsContentArea_${gameKey}">
                        <div class="stats-summary" id="statsSummaryBox_${gameKey}">
                            <div>
                                <span style="color:var(--text-muted)">মোট সক্রিয় প্লেয়ার</span><br>
                                <strong id="activeBetsCount_${gameKey}">0 / 0</strong>
                            </div>
                            <div style="text-align:right">
                                <span style="color:var(--text-muted)">মোট পে-আউট</span><br>
                                <strong id="totalWinAmount_${gameKey}" style="color:var(--gold)">0.00 BDT</strong>
                            </div>
                        </div>
                        <div class="bets-list mt-1" id="betsList_${gameKey}"></div>
                    </div>
                </section>
            `;

            renderHistoryBar(gameKey);
            renderBetPanels(gameKey);
            renderStatsList(gameKey);
            startCrashGameEngine(gameKey);
        }

        function renderHistoryBar(gameKey) {
            const ge = gameEngines[gameKey];
            const container = document.getElementById(`historyBar_${gameKey}`);
            if (!container) return;
            container.innerHTML = ge.history.map(val => {
                let colorClass = 'blue';
                if (val >= 5.0) colorClass = 'gold';
                else if (val >= 2.0) colorClass = 'purple';
                else if (val < 1.2) colorClass = 'red';
                return `<div class="history-pill ${colorClass}">${val.toFixed(2)}x</div>`;
            }).join('');
        }

        function renderBetPanels(gameKey) {
            const ge = gameEngines[gameKey];
            const container = document.getElementById(`panelsContainer_${gameKey}`);
            if (!container) return;

            container.innerHTML = ge.panels.map((p, i) => `
                <div class="bet-panel">
                    <div class="panel-body">
                        <div class="amount-controls">
                            <div class="amount-stepper">
                                <button class="step-btn" onclick="adjustPanelAmt('${gameKey}', ${i}, -10)"><i class="fa-solid fa-chevron-left"></i></button>
                                <input type="number" class="amount-display-input" value="${p.amount}" onchange="setCustomPanelAmt('${gameKey}', ${i}, this.value)" min="1" max="5000">
                                <button class="step-btn" onclick="adjustPanelAmt('${gameKey}', ${i}, 10)"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            <div class="quick-amounts">
                                <button class="quick-btn" onclick="quickSetPanelAmt('${gameKey}', ${i}, 10)">+১০ ৳</button>
                                <button class="quick-btn" onclick="quickSetPanelAmt('${gameKey}', ${i}, 50)">+৫০ ৳</button>
                                <button class="quick-btn" onclick="quickSetPanelAmt('${gameKey}', ${i}, 100)">+১০০ ৳</button>
                                <button class="quick-btn" onclick="quickSetPanelAmt('${gameKey}', ${i}, 500)">+৫০০ ৳</button>
                            </div>
                        </div>

                        <button class="main-action-btn ${getPanelBtnClass(ge, p)}" onclick="handleActionClick('${gameKey}', ${i})">
                            ${getPanelBtnText(ge, p)}
                        </button>
                    </div>

                    <div class="auto-row">
                        <label style="display:flex; align-items:center; gap:5px;">
                            <span>অটো ক্যাশআউট</span>
                            <label class="toggle-switch">
                                <input type="checkbox" ${p.autoCash ? 'checked' : ''} onchange="toggleAutoCash('${gameKey}', ${i}, this.checked)">
                                <span class="slider"></span>
                            </label>
                        </label>
                        <div style="display:flex; align-items:center; gap:4px;">
                            <input type="number" class="auto-val-input" value="${p.autoVal.toFixed(2)}" step="0.1" min="1.1" onchange="setAutoCashVal('${gameKey}', ${i}, this.value)">x
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function getPanelBtnClass(ge, p) {
            if (p.active && !p.cashed) {
                return ge.gameState === 'FLYING' ? 'cashout' : 'cancel';
            }
            return '';
        }

        function getPanelBtnText(ge, p) {
            if (p.active && !p.cashed) {
                if (ge.gameState === 'FLYING') {
                    const win = p.amount * ge.multiplier;
                    return `ক্যাশআউট<small>${formatMoney(win)} ৳</small>`;
                }
                return `বাতিল করুন<small>${formatMoney(p.amount)} ৳</small>`;
            }
            return `বেট নিশ্চিত করুন<small>${formatMoney(p.amount)} ৳</small>`;
        }

        function adjustPanelAmt(gameKey, idx, delta) {
            const ge = gameEngines[gameKey];
            ge.panels[idx].amount = Math.max(1, Math.min(5000, ge.panels[idx].amount + delta));
            renderBetPanels(gameKey);
        }
        function quickSetPanelAmt(gameKey, idx, val) {
            const ge = gameEngines[gameKey];
            ge.panels[idx].amount = Math.min(5000, ge.panels[idx].amount + val);
            renderBetPanels(gameKey);
        }
        function setCustomPanelAmt(gameKey, idx, val) {
            const ge = gameEngines[gameKey];
            let parsed = parseFloat(val);
            if (!isNaN(parsed)) ge.panels[idx].amount = Math.max(1, Math.min(5000, parsed));
            renderBetPanels(gameKey);
        }
        function toggleAutoCash(gameKey, idx, val) { gameEngines[gameKey].panels[idx].autoCash = val; }
        function setAutoCashVal(gameKey, idx, val) { gameEngines[gameKey].panels[idx].autoVal = Math.max(1.05, parseFloat(val) || 1.1); }

        function handleActionClick(gameKey, idx) {
            playBeep(900, 0.05);
            const ge = gameEngines[gameKey];
            const p = ge.panels[idx];

            if (ge.gameState === 'WAITING' || ge.gameState === 'COUNTDOWN') {
                if (p.active) {
                    balance += p.amount;
                    p.active = false;
                    showToast('বেট বাতিল করা হয়েছে');
                } else {
                    if (balance < p.amount) {
                        showToast('পর্যাপ্ত ব্যালেন্স নেই! ডিপোজিট করুন।');
                        return;
                    }
                    balance -= p.amount;
                    p.active = true;
                    p.cashed = false;
                    showToast('বেট সফলভাবে গৃহীত হয়েছে!');
                }
            } else if (ge.gameState === 'FLYING') {
                if (p.active && !p.cashed) {
                    cashoutUser(gameKey, idx);
                }
            }
            updateBalanceDisplay();
            renderBetPanels(gameKey);
            renderStatsList(gameKey);
        }

        function cashoutUser(gameKey, idx) {
            playSoundEffect(gameKey, 'cashout');
            const ge = gameEngines[gameKey];
            const p = ge.panels[idx];
            p.cashed = true;
            const win = p.amount * ge.multiplier;
            balance += win;
            updateBalanceDisplay();
            showToast(`ক্যাশআউট সফল! ${formatMoney(win)} ৳`);
            renderBetPanels(gameKey);
            renderStatsList(gameKey);
        }

        function switchStatsTab(gameKey, tab, btn) {
            const ge = gameEngines[gameKey];
            ge.currentTab = tab;
            const parent = btn.parentElement;
            parent.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const summaryBox = document.getElementById(`statsSummaryBox_${gameKey}`);
            if (summaryBox) {
                summaryBox.style.display = (tab === 'chat') ? 'none' : 'flex';
            }
            renderStatsList(gameKey);
        }

        function renderStatsList(gameKey) {
            const ge = gameEngines[gameKey];
            const container = document.getElementById(`betsList_${gameKey}`);
            if (!container) return;

            if (ge.currentTab === 'chat') {
                container.innerHTML = `
                    <div class="flex flex-col gap-1.5 h-[140px] overflow-y-auto pr-1 text-[11px]" id="chatBox_${gameKey}">
                        ${ge.chatMessages.map(m => `<div class="bg-[#111318] p-1.5 rounded border border-slate-800"><b>${m.user}:</b> <span class="text-slate-300">${m.text}</span></div>`).join('')}
                    </div>
                    <div class="flex gap-1 mt-1">
                        <input type="text" id="chatInput_${gameKey}" placeholder="মেসেজ লিখুন..." class="flex-grow bg-[#101216] border border-slate-700 rounded px-2 py-1 text-white text-[11px] focus:outline-none">
                        <button onclick="sendChatMessage('${gameKey}')" class="bg-emerald-600 text-white px-3 py-1 rounded font-bold text-[11px]">পাঠান</button>
                    </div>
                `;
                return;
            }

            let displayData = [...ge.activeBets];
            ge.panels.forEach((p, idx) => {
                if (p.active) {
                    displayData.unshift({
                        name: (currentUser || 'LIVE') + ' (Panel ' + (idx + 1) + ')',
                        amount: p.amount,
                        cashed: p.cashed,
                        cashMult: ge.multiplier,
                        winAmt: p.cashed ? p.amount * ge.multiplier : 0,
                        isUser: true
                    });
                }
            });

            if (ge.currentTab === 'my') {
                displayData = displayData.filter(b => b.isUser);
            }

            container.innerHTML = displayData.slice(0, 20).map(b => `
                <div class="bet-row ${b.cashed ? 'cashed' : ''} ${b.isUser ? 'user-bet' : ''}">
                    <div class="player-info">
                        <i class="fa-solid fa-user-circle text-slate-400"></i>
                        <div>
                            <div class="player-name">${b.name}</div>
                            <div class="bet-amt">${formatMoney(b.amount)} ৳</div>
                        </div>
                    </div>
                    <div class="win-info">
                        ${b.cashed ? `
                            <span class="win-mult" style="color:${ge.themeColor};">${b.cashMult.toFixed(2)}x</span>
                            <span class="win-amt">${formatMoney(b.winAmt)} ৳</span>
                        ` : `<span style="color:var(--text-muted)">—</span>`}
                    </div>
                </div>
            `).join('');

            const totalPayout = ge.activeBets.reduce((acc, curr) => acc + (curr.winAmt || 0), 0);
            const totalWinElem = document.getElementById(`totalWinAmount_${gameKey}`);
            if (totalWinElem) totalWinElem.textContent = formatMoney(totalPayout) + ' ৳';
            const activeCountElem = document.getElementById(`activeBetsCount_${gameKey}`);
            if (activeCountElem) activeCountElem.textContent = `${ge.activeBets.length} / ${ge.onlinePlayers}`;
        }

        function sendChatMessage(gameKey) {
            const ge = gameEngines[gameKey];
            const input = document.getElementById(`chatInput_${gameKey}`);
            if (!input || !input.value.trim()) return;
            ge.chatMessages.push({ user: currentUser || 'LIVE', text: input.value.trim() });
            input.value = '';
            renderStatsList(gameKey);
            const cb = document.getElementById(`chatBox_${gameKey}`);
            if (cb) cb.scrollTop = cb.scrollHeight;
        }

        function generateLiveBets(gameKey) {
            const ge = gameEngines[gameKey];
            ge.onlinePlayers = Math.floor(Math.random() * 120) + 380;
            const onlineElem = document.getElementById(`onlineCount_${gameKey}`);
            if (onlineElem) onlineElem.textContent = ge.onlinePlayers;

            const prefixes = ['017', '018', '019', '013', '016', '015'];
            let newBets = [];
            for (let i = 0; i < 20; i++) {
                let amt = [20, 50, 100, 200, 500, 1000][Math.floor(Math.random() * 6)];
                const targetMult = 1.05 + Math.random() * (ge.crashPoint * 1.2);
                const phonePrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                
                newBets.push({
                    name: `${phonePrefix}***${Math.floor(Math.random() * 900 + 100)}`,
                    amount: amt,
                    targetMult: targetMult,
                    cashed: false,
                    winAmt: 0,
                    cashMult: 0,
                    isUser: false
                });
            }
            newBets.sort((a, b) => b.amount - a.amount);
            ge.activeBets = newBets;
        }

        let particles = [];
        function createExplosion(x, y) {
            particles = [];
            for (let i = 0; i < 40; i++) {
                particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * 14,
                    vy: (Math.random() - 0.5) * 14,
                    radius: Math.random() * 4 + 2,
                    color: ['#00b4d8', '#9d4edd', '#ffb703', '#ffffff', '#ff4d5d'][Math.floor(Math.random() * 5)],
                    alpha: 1
                });
            }
        }

        function drawCrashCanvas(gameKey, progress) {
            const ge = gameEngines[gameKey];
            const canvas = document.getElementById(`canvas_${gameKey}`);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const w = canvas.parentElement.clientWidth;
            const h = canvas.parentElement.clientHeight;
            canvas.width = w;
            canvas.height = h;

            ctx.clearRect(0, 0, w, h);

            const bgGradient = ctx.createLinearGradient(0, 0, w, h);
            bgGradient.addColorStop(0, '#0a0d14');
            bgGradient.addColorStop(0.5, '#121722');
            bgGradient.addColorStop(1, '#07090e');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, w, h);

            if (ownerImg.complete && ownerImg.naturalWidth !== 0) {
                ctx.save();
                const now = performance.now() / 1000;
                const alpha = 0.2 + Math.sin(now * 2) * 0.12; 
                const scale = 0.8 + Math.sin(now * 1.5) * 0.08;
                const offsetY = Math.cos(now * 2) * 10;
                ctx.globalAlpha = Math.max(0.08, alpha);
                const aspect = ownerImg.naturalWidth / ownerImg.naturalHeight;
                let drawH = h * 0.65 * scale;
                let drawW = drawH * aspect;
                ctx.drawImage(ownerImg, (w - drawW) / 2, (h - drawH) / 2 + offsetY, drawW, drawH);
                ctx.restore();
            }

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            const gridSize = 35;
            for (let x = 0; x < w; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = 0; y < h; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            if (ge.gameState === 'FLYING' || ge.gameState === 'CRASHED') {
                const startX = 30;
                const startY = h - 20;
                const currentX = Math.min(w - 50, startX + (w - 70) * Math.min(1, progress));
                const currentY = Math.max(30, startY - (h - 60) * Math.min(1, Math.pow(progress, 0.85)));

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(startX + (currentX - startX) * 0.5, startY, currentX, currentY);
                ctx.lineTo(currentX, startY);
                ctx.closePath();
                
                const grad = ctx.createLinearGradient(0, currentY, 0, startY);
                grad.addColorStop(0, ge.themeColor + '55');
                grad.addColorStop(1, ge.themeColor + '00');
                ctx.fillStyle = grad;
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(startX + (currentX - startX) * 0.5, startY, currentX, currentY);
                ctx.strokeStyle = ge.themeColor;
                ctx.lineWidth = 3;
                ctx.stroke();

                if (ge.gameState === 'FLYING') {
                    ctx.save();
                    ctx.translate(currentX, currentY);
                    ctx.rotate(-Math.PI / 12);
                    ctx.font = '28px sans-serif';
                    ctx.fillStyle = ge.themeColor;
                    ctx.fillText(ge.spriteIcon, -12, 8);
                    ctx.restore();
                } else if (ge.gameState === 'CRASHED') {
                    particles.forEach((p) => {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.alpha -= 0.02;
                        if (p.alpha > 0) {
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                            ctx.fillStyle = p.color;
                            ctx.globalAlpha = p.alpha;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                        }
                    });
                }
            }
        }

        function startCrashGameEngine(gameKey) {
            const ge = gameEngines[gameKey];
            if (ge.countdownTimer) clearInterval(ge.countdownTimer);
            if (ge.animFrameId) cancelAnimationFrame(ge.animFrameId);

            ge.gameState = 'WAITING';
            ge.multiplier = 1.00;
            
            const randVal = Math.random();
            if (randVal < 0.20) {
                ge.crashPoint = 1.02 + Math.random() * 0.12; 
            } else if (randVal < 0.60) {
                ge.crashPoint = 1.25 + Math.random() * 1.75; 
            } else if (randVal < 0.88) {
                ge.crashPoint = 3.00 + Math.random() * 3.00; 
            } else {
                ge.crashPoint = 6.00 + Math.random() * 8.00; 
            }

            const multElem = document.getElementById(`multiplier_${gameKey}`);
            const statusElem = document.getElementById(`statusText_${gameKey}`);
            if (multElem) {
                multElem.textContent = '1.00x';
                multElem.style.color = '#ffffff';
                multElem.classList.remove('high-mult');
            }
            if (statusElem) statusElem.classList.remove('crashed-text');

            ge.panels.forEach((p) => { p.cashed = false; });

            generateLiveBets(gameKey);
            renderBetPanels(gameKey);
            drawCrashCanvas(gameKey, 0);

            ge.countdownValue = 6;
            ge.gameState = 'COUNTDOWN';
            if (statusElem) statusElem.textContent = `পরবর্তী রাউন্ড: ${ge.countdownValue}s`;

            ge.countdownTimer = setInterval(() => {
                ge.countdownValue--;
                if (ge.countdownValue > 0) {
                    if (statusElem) statusElem.textContent = `পরবর্তী রাউন্ড: ${ge.countdownValue}s`;
                    playBeep(450, 0.04);
                } else {
                    clearInterval(ge.countdownTimer);
                    startFlightRound(gameKey);
                }
            }, 1000);
        }

        function startFlightRound(gameKey) {
            const ge = gameEngines[gameKey];
            ge.gameState = 'FLYING';
            ge.startTime = performance.now();
            playSoundEffect(gameKey, 'start');

            const statusElem = document.getElementById(`statusText_${gameKey}`);
            if (statusElem) statusElem.textContent = 'উড়ছে...';

            function runAnimation() {
                if (ge.gameState !== 'FLYING') return;

                const elapsed = (performance.now() - ge.startTime) / 1000;
                ge.multiplier = 1.00 + Math.pow(elapsed, 1.4) * 0.35;
                updateEnginePitch(gameKey, ge.multiplier);

                const multElem = document.getElementById(`multiplier_${gameKey}`);
                if (multElem) {
                    multElem.textContent = ge.multiplier.toFixed(2) + 'x';
                    if (ge.multiplier >= 3.0) multElem.classList.add('high-mult');
                }

                ge.activeBets.forEach(b => {
                    if (!b.cashed && ge.multiplier >= b.targetMult) {
                        b.cashed = true;
                        b.cashMult = b.targetMult;
                        b.winAmt = b.amount * b.targetMult;
                    }
                });

                ge.panels.forEach((p, i) => {
                    if (p.active && !p.cashed && p.autoCash && ge.multiplier >= p.autoVal) {
                        cashoutUser(gameKey, i);
                    }
                });

                renderBetPanels(gameKey);
                renderStatsList(gameKey);

                const progress = Math.min(1, elapsed / 9);
                drawCrashCanvas(gameKey, progress);

                if (ge.multiplier >= ge.crashPoint) {
                    triggerCrash(gameKey, progress);
                } else {
                    ge.animFrameId = requestAnimationFrame(runAnimation);
                }
            }
            runAnimation();
        }

        function triggerCrash(gameKey, progress) {
            const ge = gameEngines[gameKey];
            ge.gameState = 'CRASHED';
            cancelAnimationFrame(ge.animFrameId);
            playSoundEffect(gameKey, 'crash');

            const statusElem = document.getElementById(`statusText_${gameKey}`);
            const multElem = document.getElementById(`multiplier_${gameKey}`);
            if (statusElem) {
                statusElem.textContent = 'ক্র্যাশ করেছে!';
                statusElem.classList.add('crashed-text');
            }
            if (multElem) {
                multElem.style.color = 'var(--red-glow)';
                multElem.classList.remove('high-mult');
            }

            ge.panels.forEach((p) => {
                p.active = false;
                p.cashed = false;
            });

            ge.history.unshift(parseFloat(ge.crashPoint.toFixed(2)));
            if (ge.history.length > 20) ge.history.pop();
            renderHistoryBar(gameKey);

            const canvas = document.getElementById(`canvas_${gameKey}`);
            if (canvas) {
                const w = canvas.parentElement.clientWidth;
                const h = canvas.parentElement.clientHeight;
                const startX = 30;
                const startY = h - 20;
                const currentX = Math.min(w - 50, startX + (w - 70) * Math.min(1, progress));
                const currentY = Math.max(30, startY - (h - 60) * Math.min(1, Math.pow(progress, 0.85)));
                createExplosion(currentX, currentY);
            }

            let crashFrames = 0;
            function animateCrash() {
                if (crashFrames < 30) {
                    drawCrashCanvas(gameKey, progress);
                    crashFrames++;
                    requestAnimationFrame(animateCrash);
                }
            }
            animateCrash();

            renderBetPanels(gameKey);
            renderStatsList(gameKey);

            setTimeout(() => {
                if (currentView === 'game' && gameKey === 'aviator') startCrashGameEngine('aviator');
                else if (currentView === 'jetx_game' && gameKey === 'robotx') startCrashGameEngine('robotx');
                else if (currentView === 'rocket_game' && gameKey === 'rocketx') startCrashGameEngine('rocketx');
            }, 2500);
        }

        function launchDiceGame() { switchView('dice_game'); }

        function renderDiceGameView(container) {
            container.innerHTML = `
                <header class="top-bar">
                    <button onclick="switchView('home')" class="text-white text-xs px-2.5 py-1 bg-slate-800 rounded font-bold"><i class="fa-solid fa-arrow-left"></i> হোম</button>
                    <div class="logo" style="color:var(--purple);">Lucky<span>Dice</span></div>
                    <div style="display:flex; align-items:center; gap:5px;">
                        <button onclick="openDepositModal()" class="bg-emerald-600 px-2 py-1 rounded text-white text-[10px] font-bold">ডিপোজিট</button>
                        <button onclick="openWithdrawModal()" class="bg-orange-500 px-2 py-1 rounded text-white text-[10px] font-bold">উইথড্র</button>
                        <div class="balance-box"><b id="balanceDice">${formatMoney(balance)}</b> BDT</div>
                    </div>
                </header>
                <main class="p-4 bg-[#0f1117] text-xs flex flex-col items-center justify-center space-y-4 min-h-[75vh]">
                    <div class="text-5xl font-extrabold text-purple-400 animate-bounce p-5 bg-slate-900 rounded-2xl border border-purple-500/40 shadow-2xl" id="diceResultBox">🎲 [ 6 ]</div>
                    <p class="text-slate-300 text-center text-sm">৪ বা তার বেশি উঠলে ২x লাভ হবে!</p>
                    <div class="w-full max-w-xs space-y-3 bg-[#181a20] p-4 rounded-xl border border-slate-700">
                        <div>
                            <label class="block text-slate-300 mb-1">বেটিং পরিমাণ (BDT)</label>
                            <input type="number" id="diceBetAmt" value="100" class="w-full bg-[#101216] border border-slate-700 p-2.5 rounded text-white text-center font-bold outline-none focus:border-purple-500 text-sm">
                        </div>
                        <button onclick="playDiceRoll()" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition text-sm">ডাইস রোল করুন (Roll Dice)</button>
                    </div>
                </main>
            `;
        }

        function playDiceRoll() {
            const amt = parseFloat(document.getElementById('diceBetAmt').value) || 50;
            if (balance < amt) {
                showToast('অপর্যাপ্ত ব্যালেন্স! ডিপোজিট করুন।');
                return;
            }
            balance -= amt;
            updateBalanceDisplay();
            const roll = Math.floor(Math.random() * 6) + 1;
            const resBox = document.getElementById('diceResultBox');
            if (resBox) resBox.textContent = `🎲 [ ${roll} ]`;

            if (roll >= 4) {
                playBeep(800, 0.1);
                const win = amt * 2;
                balance += win;
                showToast(`🎉 অভিনন্দন! ডাইস রোল ${roll} এসে আপনি ${formatMoney(win)} BDT জিতেছেন!`);
            } else {
                playBeep(200, 0.2);
                showToast(`উফ! ডাইস রোল ${roll} এসেছে। আপনি হেরে গেছেন।`);
            }
            updateBalanceDisplay();
        }

        window.onload = () => {
            if (currentUser) {
                const notif = document.getElementById('welcomeNotifModal');
                if (notif) notif.classList.add('hidden');
            }
            renderApp();
        };
    </script>
</body>
</html>
