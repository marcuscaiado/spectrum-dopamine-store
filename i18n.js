// ============================================================
// SPECTRUM // INTERNATIONALIZATION ENGINE (EN & PT-BR)
// ============================================================

(function (window) {
  'use strict';

  const LANG_KEY = 'spectrum_lang';
  
  // Default to browser language or saved preference
  const detectedLang = (navigator.language && navigator.language.toLowerCase().startsWith('pt')) ? 'pt' : 'en';
  let currentLang = localStorage.getItem(LANG_KEY) || detectedLang;

  const translations = {
    en: {
      // Header
      brandLabs: '//LABS',
      dopamineLevel: 'DOPAMINE LEVEL',
      signIn: 'Sign In',
      cart: 'Cart',
      toggleTheme: 'Toggle Light / Dark Mode',
      toggleAudio: 'Toggle Sound FX',
      toggleLang: 'Switch to Português (PT-BR)',
      
      // Hero
      heroBadge: 'ZERO LATENCY HARDWARE // ZERO CALORIES // 100% SATISFACTION',
      heroTitleLine1: 'Maximum Serotonin.',
      heroTitleLine2: 'Instant Delivery.',
      heroSubtitle: 'Futuristic conceptual devices engineered for the hyperactive mind. Add to cart to trigger pure digital dopamine rushes.',
      btnLucky: "I'm Feeling Lucky",
      btnRexGame: 'Launch Rex Mini-Game',
      
      // Catalog
      sectionTitle: 'Hardware Inventions',
      sectionDesc: 'Handcrafted non-existent tech. Guaranteed 100% satisfaction or 0% refunds.',
      filterAll: 'All Inventions (8)',
      filterWearable: 'Wearables',
      filterRobotics: 'Robotics',
      filterOffline: 'Offline',
      filterNeural: 'Neural',
      addToCart: '+ ADD TO CART',
      
      // Products
      p_rex_pod_title: 'Rex Offline Survival Pod',
      p_rex_pod_tag: '🦖 OFFLINE MODE',
      p_rex_pod_desc: 'A portable quantum disruption node that blocks all Wi-Fi and 5G signals within a 10-meter radius so you can jump over 8-bit cacti in total peace.',
      p_rex_pod_f1: '✓ 0.00 kbps speed',
      p_rex_pod_f2: '✓ Infinite battery',
      p_rex_pod_f3: '✓ Anti-meeting shield',
      
      p_bugdroid_title: 'Bugdroid Pocket Buddy',
      p_bugdroid_tag: '🤖 DESK BOT',
      p_bugdroid_desc: 'A lime-green desk companion that nods enthusiastically at every refactor you pitch and wiggles its antennae when your code compiles on first try.',
      p_bugdroid_f1: '✓ Unconditional validation',
      p_bugdroid_f2: '✓ Magnetic ears',
      p_bugdroid_f3: '✓ Zero sass',
      
      p_incognito_title: 'Real-Life Incognito Shades',
      p_incognito_tag: '🕶️ STEALTH',
      p_incognito_desc: "Polarized titanium sunglasses that make casual acquaintances in supermarkets pretend they didn't see you making eye contact.",
      p_incognito_f1: '✓ Zero social history',
      p_incognito_f2: '✓ 100% UV & Small-talk blocking',
      
      p_mind_visor_title: 'Mind Autocomplete Visor',
      p_mind_visor_tag: '⚡ 0.0001ms',
      p_mind_visor_desc: 'Predictive neural visor that finishes your sentences and formulates clever replies before your synaptic neurons even complete firing.',
      p_mind_visor_f1: '✓ Telepathic cache',
      p_mind_visor_f2: '✓ Typo-free thoughts',
      p_mind_visor_f3: '✓ Sarcasm tuning',
      
      p_cloud_vapor_title: 'Bottled 15GB Cloud Vapor',
      p_cloud_vapor_tag: '🌐 15GB FREE',
      p_cloud_vapor_desc: 'Atmospheric server-rack vapor distilled directly from high-density data centers. Inhale to instantly feel like you have infinite decentralized storage.',
      p_cloud_vapor_f1: '✓ 99.999% uptime aroma',
      p_cloud_vapor_f2: '✓ Zero physical weight',
      
      p_tab_zero_title: 'Tab Zero: Cerebral RAM Reset',
      p_tab_zero_tag: '💊 RAM RESET',
      p_tab_zero_desc: 'A minimalist nano-capsule that closes the 87 background tabs running in your subconscious mind so you can fall asleep in under 4 minutes.',
      p_tab_zero_f1: '✓ Memory leak purge',
      p_tab_zero_f2: '✓ Zero existential dread',
      
      p_recaptcha_ring_title: 'ReCAPTCHA Bypass Ring',
      p_recaptcha_ring_tag: '🚦 100% HUMAN',
      p_recaptcha_ring_desc: 'Titanium biometric smart ring that radiates undeniable human consciousness to every web browser. Never identify another crosswalk or fire hydrant again.',
      p_recaptcha_ring_f1: '✓ Fire hydrant immune',
      p_recaptcha_ring_f2: '✓ Instant checkbox green check',
      
      p_map_to_nowhere_title: 'Quantum Map to Nowhere',
      p_map_to_nowhere_tag: '🧭 ESCAPE GPS',
      p_map_to_nowhere_desc: 'Handheld holographic compass that plots turn-by-turn walking routes specifically engineered to avoid awkward social obligations and running into coworkers.',
      p_map_to_nowhere_f1: '✓ Social detour algorithm',
      p_map_to_nowhere_f2: '✓ Scenic void routing',
      
      // Cart Drawer
      cartTitle: 'Your Dopamine Stash',
      cartEmptyTitle: 'Your cart is currently starved of dopamine.',
      cartEmptySub: 'Hit "+ Add to Cart" on any gadget to trigger instant neuro-satisfaction.',
      cartPlayRex: 'Play Rex Runner 🌵',
      cartTotalCost: 'Total Cost:',
      cartTotalFree: '$0.00 (Priceless)',
      cartSerotoninBonus: 'Serotonin Bonus:',
      cartCheckoutBtn: 'INJECT DOPAMINE (CLAIM CERTIFICATE)',
      
      // Auth Modal
      authHeaderTitle: 'Operative Authentication',
      authIntro: 'Authenticate to unlock cloud sync and stamp your official Quantum Dopamine Diploma.',
      authPasskeyTitle: '1-Click Biometric Passkey',
      authPasskeySub: 'Apple FaceID, Android TouchID, or Windows Hello',
      authOrEmail: 'OR EMAIL CODE',
      authEmailLabel: 'Your Email Address',
      authNameLabel: 'Operative Name / Codename',
      authDispatchBtn: 'DISPATCH 6-DIGIT QUANTUM CODE ✉️',
      authTransDispatched: 'TRANSMISSION DISPATCHED',
      authTransDesc: 'We generated a 6-digit cryptographic security code for',
      authEnterCodeLabel: 'Enter the 6-Digit Code',
      authVerifyBtn: 'VERIFY & COMPLETE AUTHENTICATION 🚀',
      authBackBtn: '← Back to Options',
      authSignOut: 'SIGN OUT ✕',
      authVerifiedBadge: '✓ 🔑 BIOMETRIC PASSKEY VERIFIED',
      authGateAlert: '🔒 Operative Authentication Required: Sign in with Passkey or Email Code to finish checkout and claim your Quantum Diploma.',
      
      // Diploma
      certToolbarTitle: 'OFFICIAL DIPLOMA ISSUANCE // EXACT 1-PAGE PRINT READY',
      certPrintBtn: '🖨️ Print / Save (1 Page)',
      certCloseBtn: '✕ Close',
      certPretitle: 'OFFICIAL PARODY ISSUANCE & VERIFICATION OF ACQUISITION',
      certTitleText: 'QUANTUM DOPAMINE DIPLOMA',
      certDeclaration: 'This supreme document certifies that the human operative identified as <strong class="cert-user-name">VERIFIED INVENTOR</strong> has successfully claimed and integrated maximum digital serotonin:',
      certClaimedHeader: 'INCORPORATED CONCEPTUAL HARDWARE:',
      certStatusTag: 'STATUS: 100% DEPLOYED',
      certMetricSerotonin: 'TOTAL SEROTONIN INJECTED',
      certMetricNetwork: 'NETWORK CONNECTIVITY',
      certMetricNetworkVal: '0.000% WiFi (REX CERTIFIED)',
      certMetricFinance: 'TOTAL FINANCIAL DEDUCTION',
      certMetricFinanceVal: '$0.00 (ABSOLUTELY PRICELESS)',
      certStampBugdroidTitle: 'BUGDROID APPROVED',
      certStampBugdroidSub: 'Zero Sass / 100% Code Validated',
      certStampRexTitle: 'REX OFFLINE SHIELD',
      certStampRexSub: 'Zero WiFi / Cactus Cleared',
      certSealTop: 'SPECTRUM LABS',
      certSealCenter: '100%',
      certSealSub: 'PURE DOPAMINE',
      certSealBottom: 'VERIFIED',
      certDisclaimer: 'ISSUED BY AUTONOMOUS DOPAMINE PROTOCOL // ZERO LATENCY // NOT VALID FOR REAL WORLD CURRENCY // 100% FICTIONAL & AWESOME',
      
      // Rex Game
      rexGameTitle: 'Rex Cactus Runner // 0% WiFi',
      rexScore: 'SCORE:',
      rexBest: 'BEST:',
      rexJumpBtn: 'SPACE / CLICK TO JUMP',
      rexGameOver: 'GAME OVER! +XP GAINED',
      rexRestart: 'CLICK JUMP OR SPACE TO RESTART',
    },
    
    pt: {
      // Header
      brandLabs: '//LABS',
      dopamineLevel: 'NÍVEL DE DOPAMINA',
      signIn: 'Entrar',
      cart: 'Carrinho',
      toggleTheme: 'Alternar Modo Claro / Escuro',
      toggleAudio: 'Alternar Efeitos Sonoros',
      toggleLang: 'Switch to English (EN)',
      
      // Hero
      heroBadge: 'HARDWARE DE LATÊNCIA ZERO // ZERO CALORIAS // 100% SATISFAÇÃO',
      heroTitleLine1: 'Máxima Serotonina.',
      heroTitleLine2: 'Entrega Instantânea.',
      heroSubtitle: 'Dispositivos conceituais futuristas projetados para a mente hiperativa. Adicione ao carrinho para disparar descargas puras de dopamina digital.',
      btnLucky: 'Estou com Sorte 🎲',
      btnRexGame: 'Jogar Mini-Game do Rex 🦖',
      
      // Catalog
      sectionTitle: 'Invenções de Hardware',
      sectionDesc: 'Tecnologia inexistente feita à mão. Garantia de 100% de satisfação ou 0% de reembolso.',
      filterAll: 'Todas as Invenções (8)',
      filterWearable: 'Vestíveis',
      filterRobotics: 'Robótica',
      filterOffline: 'Offline',
      filterNeural: 'Neural',
      addToCart: '+ ADICIONAR AO CARRINHO',
      
      // Products
      p_rex_pod_title: 'Cápsula de Sobrevivência Offline do Rex',
      p_rex_pod_tag: '🦖 MODO OFFLINE',
      p_rex_pod_desc: 'Um nodo quântico portátil que bloqueia todos os sinais de Wi-Fi e 5G em um raio de 10 metros para você pular cactos de 8 bits em paz total.',
      p_rex_pod_f1: '✓ Velocidade 0.00 kbps',
      p_rex_pod_f2: '✓ Bateria infinita',
      p_rex_pod_f3: '✓ Escudo anti-reunião',
      
      p_bugdroid_title: 'Bugdroid: Parceiro de Bolso',
      p_bugdroid_tag: '🤖 ROBÔ DE MESA',
      p_bugdroid_desc: 'Um assistente de mesa verde-limão que concorda com entusiasmo com cada refatoração sua e mexe as antenas quando o código compila de primeira.',
      p_bugdroid_f1: '✓ Validação incondicional',
      p_bugdroid_f2: '✓ Orelhas magnéticas',
      p_bugdroid_f3: '✓ Zero deboche',
      
      p_incognito_title: 'Óculos Modo Anônimo na Vida Real',
      p_incognito_tag: '🕶️ FURTIVO',
      p_incognito_desc: 'Óculos escuros de titânio polarizados que fazem conhecidos casuais no supermercado fingirem que não viram você fazendo contato visual.',
      p_incognito_f1: '✓ Zero histórico social',
      p_incognito_f2: '✓ 100% bloqueio UV e conversas fiadas',
      
      p_mind_visor_title: 'Visor de Autocompletar Pensamento',
      p_mind_visor_tag: '⚡ 0.0001ms',
      p_mind_visor_desc: 'Visor neural preditivo que termina suas frases e formula respostas inteligentes antes mesmo dos seus neurônios terminarem de disparar.',
      p_mind_visor_f1: '✓ Cache telepático',
      p_mind_visor_f2: '✓ Pensamentos sem erros',
      p_mind_visor_f3: '✓ Ajuste de sarcasmo',
      
      p_cloud_vapor_title: 'Vapor de Nuvem Engarrafado 15GB',
      p_cloud_vapor_tag: '🌐 15GB GRÁTIS',
      p_cloud_vapor_desc: 'Vapor atmosférico de servidores destilado diretamente de data centers de alta densidade. Inale para sentir que possui armazenamento infinito.',
      p_cloud_vapor_f1: '✓ Aroma de 99.999% uptime',
      p_cloud_vapor_f2: '✓ Zero peso físico',
      
      p_tab_zero_title: 'Tab Zero: Reset de RAM Cerebral',
      p_tab_zero_tag: '💊 RESET DE RAM',
      p_tab_zero_desc: 'Uma nanocápsula minimalista que fecha as 87 abas abertas em segundo plano na sua mente para você dormir em menos de 4 minutos.',
      p_tab_zero_f1: '✓ Limpeza de vazamento de memória',
      p_tab_zero_f2: '✓ Zero pânico existencial',
      
      p_recaptcha_ring_title: 'Anel Anti-ReCAPTCHA',
      p_recaptcha_ring_tag: '🚦 100% HUMANO',
      p_recaptcha_ring_desc: 'Anel biométrico de titânio que irradia consciência humana inegável para qualquer navegador. Nunca mais identifique faixas de pedestres ou hidrantes.',
      p_recaptcha_ring_f1: '✓ Imune a hidrantes',
      p_recaptcha_ring_f2: '✓ Checkmark verde instantâneo',
      
      p_map_to_nowhere_title: 'Mapa Quântico para Lugar Nenhum',
      p_map_to_nowhere_tag: '🧭 GPS DE FUGA',
      p_map_to_nowhere_desc: 'Bússola holográfica portátil que calcula rotas a pé projetadas especificamente para evitar obrigações sociais e esbarrar com colegas de trabalho.',
      p_map_to_nowhere_f1: '✓ Algoritmo de desvio social',
      p_map_to_nowhere_f2: '✓ Rotas cênicas no vazio',
      
      // Cart Drawer
      cartTitle: 'Seu Estoque de Dopamina',
      cartEmptyTitle: 'Seu carrinho está faminto por dopamina.',
      cartEmptySub: 'Clique em "+ Adicionar ao Carrinho" em qualquer invenção para disparar neuro-satisfação.',
      cartPlayRex: 'Jogar Rex Runner 🌵',
      cartTotalCost: 'Custo Total:',
      cartTotalFree: 'R$ 0,00 (Não tem preço)',
      cartSerotoninBonus: 'Bônus de Serotonina:',
      cartCheckoutBtn: 'INJETAR DOPAMINA (RESGATAR DIPLOMA)',
      
      // Auth Modal
      authHeaderTitle: 'Autenticação de Operativo',
      authIntro: 'Autentique-se para sincronizar na nuvem e registrar seu Diploma Quântico oficial.',
      authPasskeyTitle: '1-Clique: Chave Biométrica',
      authPasskeySub: 'Apple FaceID, Android TouchID ou Windows Hello',
      authOrEmail: 'OU CÓDIGO POR E-MAIL',
      authEmailLabel: 'Seu Endereço de E-mail',
      authNameLabel: 'Nome / Codinome do Operativo',
      authDispatchBtn: 'DISPARAR CÓDIGO QUÂNTICO DE 6 DÍGITOS ✉️',
      authTransDispatched: 'TRANSMISSÃO DISPARADA',
      authTransDesc: 'Geramos um código criptográfico de segurança de 6 dígitos para',
      authEnterCodeLabel: 'Digite o Código de 6 Dígitos',
      authVerifyBtn: 'VERIFICAR E CONCLUIR ACESSO 🚀',
      authBackBtn: '← Voltar às opções',
      authSignOut: 'SAIR DA CONTA ✕',
      authVerifiedBadge: '✓ 🔑 CHAVE BIOMÉTRICA VERIFICADA',
      authGateAlert: '🔒 Autenticação de Operativo Necessária: Entre com Chave Biométrica ou Código para finalizar o pedido e resgatar seu Diploma Quântico.',
      
      // Diploma
      certToolbarTitle: 'EMISSÃO OFICIAL DE DIPLOMA // PRONTO PARA IMPRESSÃO EM 1 PÁGINA',
      certPrintBtn: '🖨️ Imprimir / Salvar (1 Página)',
      certCloseBtn: '✕ Fechar',
      certPretitle: 'EMISSÃO OFICIAL DE PARÓDIA & COMPROVANTE DE AQUISIÇÃO',
      certTitleText: 'DIPLOMA QUÂNTICO DE DOPAMINA',
      certDeclaration: 'Este documento supremo certifica que o operativo humano identificado como <strong class="cert-user-name">INVENTOR VERIFICADO</strong> reivindicou e integrou com sucesso a máxima serotonina digital:',
      certClaimedHeader: 'HARDWARE CONCEITUAL INCORPORADO:',
      certStatusTag: 'STATUS: 100% IMPLEMENTADO',
      certMetricSerotonin: 'TOTAL DE SEROTONINA INJETADA',
      certMetricNetwork: 'CONECTIVIDADE DE REDE',
      certMetricNetworkVal: '0.000% WiFi (CERTIFICADO PELO REX)',
      certMetricFinance: 'DEDUÇÃO FINANCEIRA TOTAL',
      certMetricFinanceVal: 'R$ 0,00 (ABSOLUTAMENTE INESTIMÁVEL)',
      certStampBugdroidTitle: 'APROVADO PELO BUGDROID',
      certStampBugdroidSub: 'Zero Deboche / 100% Código Validado',
      certStampRexTitle: 'ESCUDO OFFLINE DO REX',
      certStampRexSub: 'Zero WiFi / Cacto Superado',
      certSealTop: 'SPECTRUM LABS',
      certSealCenter: '100%',
      certSealSub: 'PURA DOPAMINA',
      certSealBottom: 'VERIFICADO',
      certDisclaimer: 'EMITIDO PELO PROTOCOLO AUTÔNOMO DE DOPAMINA // LATÊNCIA ZERO // NÃO VÁLIDO COMO MOEDA REAL // 100% FICTÍCIO E ÉPICO',
      
      // Rex Game
      rexGameTitle: 'Rex: Corrida dos Cactos // 0% WiFi',
      rexScore: 'PONTUAÇÃO:',
      rexBest: 'RECORDE:',
      rexJumpBtn: 'ESPAÇO / CLIQUE PARA PULAR',
      rexGameOver: 'FIM DE JOGO! +XP GANHO',
      rexRestart: 'CLIQUE PULAR OU ESPAÇO PARA REINICIAR',
    }
  };

  function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
  }

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'pt') lang = 'en';
    currentLang = lang;
    localStorage.setItem(LANG_KEY, currentLang);
    applyTranslations();
    window.dispatchEvent(new CustomEvent('spectrum:lang_change', { detail: currentLang }));
  }

  function toggleLang() {
    const nextLang = currentLang === 'en' ? 'pt' : 'en';
    setLang(nextLang);
    return nextLang;
  }

  function applyTranslations() {
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[currentLang][key]) {
        el.innerHTML = translations[currentLang][key];
      }
    });

    // Update language toggle button label
    const langBtn = document.getElementById('lang-toggle-text');
    if (langBtn) {
      langBtn.textContent = currentLang === 'en' ? '🌐 PT-BR' : '🌐 ENG';
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
  });

  window.SpectrumI18n = {
    t,
    getLang,
    setLang,
    toggleLang,
    applyTranslations,
  };
})(window);
