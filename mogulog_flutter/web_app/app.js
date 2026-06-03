// ==========================================================================
// 1. 初期データとState管理
// ==========================================================================

const DEFAULT_CARDS = [
  {
    id: "1",
    imageUrl: "assets/ramen.png",
    title: "極濃魚介豚骨そば",
    comment: "スープにとろみがあって麺によく絡む！チャーシューがとろけました。✨",
    shopName: "麺屋 むぎわら",
    prefecture: "大阪府",
    area: "梅田",
    genre: "ラーメン",
    lat: 34.702485,
    lng: 135.495951,
    isLimited: false,
    isUnlocked: false,
    isMyCard: false
  },
  {
    id: "2",
    imageUrl: "assets/pancake.png",
    title: "極厚ふわとろスフレパンケーキ",
    comment: "口に入れた瞬間になくなる！メープルシロップとの相性が最高です。🥞",
    shopName: "Cafe de Float",
    prefecture: "大阪府",
    area: "難波",
    genre: "カフェ",
    lat: 34.6662,
    lng: 135.5022,
    isLimited: true,
    isUnlocked: true,
    isMyCard: false
  },
  {
    id: "3",
    imageUrl: "assets/sushi.png",
    title: "極上本マグロ大トロ握り",
    comment: "脂が上品で口の中でふわっと広がります。職人さんの技が光る一品。🍣",
    shopName: "鮨処 すずき",
    prefecture: "大阪府",
    area: "梅田",
    genre: "寿司",
    lat: 34.7011,
    lng: 135.4965,
    isLimited: false,
    isUnlocked: false,
    isMyCard: false
  },
  {
    id: "4",
    imageUrl: "assets/ramen.png",
    title: "炙り味噌バター麺",
    comment: "香ばしい味噌の香りとバターのコクが重なって、最後までぽかぽかでした。✨",
    shopName: "麺処 こがね",
    prefecture: "大阪府",
    area: "天王寺",
    genre: "ラーメン",
    lat: 34.6472,
    lng: 135.5139,
    isLimited: true,
    isUnlocked: true,
    isMyCard: false
  },
  {
    id: "5",
    imageUrl: "assets/pancake.png",
    title: "焦がしキャラメルラテ",
    comment: "ほろ苦い香りがやさしく広がって、午後のごほうびにぴったりでした。☕",
    shopName: "Cafe Amber",
    prefecture: "大阪府",
    area: "心斎橋",
    genre: "カフェ",
    lat: 34.6713,
    lng: 135.5013,
    isLimited: false,
    isUnlocked: true,
    isMyCard: false
  },
  {
    id: "6",
    imageUrl: "assets/sushi.png",
    title: "鯛と柚子のひとくち寿司",
    comment: "柚子の香りがふわっと抜けて、ひと口ごとに気分が明るくなります。🍣",
    shopName: "鮨 はるの",
    prefecture: "大阪府",
    area: "難波",
    genre: "寿司",
    lat: 34.6668,
    lng: 135.5031,
    isLimited: false,
    isUnlocked: true,
    isMyCard: false
  },
  {
    id: "7",
    imageUrl: "assets/ramen.png",
    title: "スパイス香る欧風カレー",
    comment: "ルーの香りが豊かで、ひと皿の満足感がしっかりありました。🍛",
    shopName: "洋食堂 ルミエール",
    prefecture: "大阪府",
    area: "梅田",
    genre: "カレー",
    lat: 34.7041,
    lng: 135.4971,
    isLimited: false,
    isUnlocked: false,
    isMyCard: false
  },
  {
    id: "8",
    imageUrl: "assets/pancake.png",
    title: "季節果実のミニパフェ",
    comment: "果実のみずみずしさがきらっとして、見ているだけで楽しい一品でした。🍓",
    shopName: "パーラー ひなた",
    prefecture: "大阪府",
    area: "心斎橋",
    genre: "カフェ",
    lat: 34.6722,
    lng: 135.4998,
    isLimited: true,
    isUnlocked: false,
    isMyCard: false
  },
  {
    id: "9",
    imageUrl: "assets/ramen.png",
    title: "香味ねぎの追いスープそば",
    comment: "同じお店でも違う表情の一杯。ねぎの香りが立って、食欲がふわっと上がります。🍜",
    shopName: "麺屋 むぎわら",
    prefecture: "大阪府",
    area: "梅田",
    genre: "ラーメン",
    lat: 34.7031,
    lng: 135.4962,
    isLimited: false,
    isUnlocked: false,
    isMyCard: false
  },
  {
    id: "10",
    imageUrl: "assets/sushi.png",
    title: "鴨川そばの手まり寿司",
    comment: "小さな宝石みたいな見た目で、ひとつずつ選ぶ時間まで楽しいです。✨",
    shopName: "京寿司 みやこ",
    prefecture: "京都府",
    area: "京都河原町",
    genre: "寿司",
    lat: 35.0037,
    lng: 135.7690,
    isLimited: true,
    isUnlocked: false,
    isMyCard: false
  },
  {
    id: "11",
    imageUrl: "assets/pancake.png",
    title: "港町ベイクドチーズケーキ",
    comment: "香ばしい焼き目とクリームのなめらかさが心地よい、ゆっくり味わいたい一皿です。🍰",
    shopName: "Kobe Harbor Cafe",
    prefecture: "兵庫県",
    area: "神戸三宮",
    genre: "カフェ",
    lat: 34.6947,
    lng: 135.1955,
    isLimited: false,
    isUnlocked: false,
    isMyCard: false
  }
];

const CARD_IMAGE_MAX_SIZE = 1400;
const CARD_IMAGE_QUALITY = 0.82;

let cards = [];
let mapInstance = null;
let mapMarkers = [];
let currentFilterMode = "area"; // area or genre
let selectedMapGenre = "All"; // 【追加！】マップ用ソートジャンル
let mapSearchQuery = "";
let memoSearchQuery = "";
let memoStatusFilter = "all";
let selectedDetailCardId = null;
let manualExchangeTargetId = null;
const PERSONAL_WEB_MODE = true;
const TIMELINE_LIMIT = 20;
const DECK_LIMIT = 5;
const FAVORITE_LIMIT = 3;
const WEEKLY_EXCHANGE_COUNT = 2;
const EXCHANGE_SETTINGS_KEY = "mogu_log_exchange_settings";
const FRIENDS_KEY = "mogu_log_friends";
const SHARE_DELIVERIES_KEY = "mogu_log_share_deliveries";
const LOCAL_CARDS_KEY = "mogu_log_cards";
const LOCAL_UPDATED_AT_KEY = "mogu_log_updated_at";
const MOGULOG_CONFIG = window.MOGULOG_CONFIG || {};
const SYNC_ENDPOINT = MOGULOG_CONFIG.syncEndpoint || "/api/mogulog";
let serverSyncAvailable = MOGULOG_CONFIG.syncMode !== "local" && window.location.protocol !== "file:";
let syncSaveTimer = null;
const DEFAULT_FRIENDS = [
  { id: "mika", name: "mika", mutualFollow: true, requested: false },
  { id: "sora", name: "sora", mutualFollow: true, requested: false },
  { id: "kei", name: "kei", mutualFollow: false, requested: true }
];
let friends = [];
let shareDeliveries = [];
const AREA_PROFILES = {
  "梅田": { prefecture: "大阪府", lat: 34.7024, lng: 135.4959 },
  "難波": { prefecture: "大阪府", lat: 34.6662, lng: 135.5022 },
  "心斎橋": { prefecture: "大阪府", lat: 34.6713, lng: 135.5013 },
  "天王寺": { prefecture: "大阪府", lat: 34.6472, lng: 135.5139 },
  "京都河原町": { prefecture: "京都府", lat: 35.0037, lng: 135.7690 },
  "神戸三宮": { prefecture: "兵庫県", lat: 34.6947, lng: 135.1955 }
};
const GOOGLE_MAPS_HOURS_MOCK = {
  "麺屋むぎわら|梅田": "11:00-15:00 / 17:30-22:00",
  "CafedeFloat|難波": "9:00-20:00",
  "鮨処すずき|梅田": "17:00-23:00",
  "麺処こがね|天王寺": "11:30-15:00 / 18:00-22:00",
  "CafeAmber|心斎橋": "8:30-19:00",
  "鮨はるの|難波": "12:00-14:30 / 17:30-22:30",
  "洋食堂ルミエール|梅田": "11:00-21:30",
  "パーラーひなた|心斎橋": "10:00-20:00",
  "京寿司みやこ|京都河原町": "11:30-15:00 / 17:00-22:00",
  "KobeHarborCafe|神戸三宮": "8:00-21:00"
};
const GENRE_HOURS_FALLBACK = {
  "ラーメン": "11:00-15:00 / 17:00-22:00",
  "カフェ": "9:00-20:00",
  "寿司": "12:00-14:30 / 17:00-22:30",
  "洋食": "11:00-21:00",
  "カレー": "11:00-21:30"
};
let exchangeSettings = {
  preferredArea: "梅田",
  allowOutOfPrefecture: false,
  lastExchangeWeek: "",
  lastExchangeAt: "",
  lastExchangeSummary: "まだ交換は行われていません。"
};

// ローカルストレージから読み込み、または初期化
function loadState() {
  const saved = localStorage.getItem(LOCAL_CARDS_KEY);
  if (saved) {
    try {
      cards = JSON.parse(saved);
    } catch (e) {
      cards = [...DEFAULT_CARDS];
    }
  } else {
    cards = [...DEFAULT_CARDS];
  }

  cards = mergeDefaultCards(cards).map(normalizeCard);
  loadFriends();
  loadShareDeliveries();

  const savedExchangeSettings = localStorage.getItem(EXCHANGE_SETTINGS_KEY);
  if (savedExchangeSettings) {
    try {
      exchangeSettings = {
        ...exchangeSettings,
        ...JSON.parse(savedExchangeSettings)
      };
    } catch (e) {
      exchangeSettings.lastExchangeWeek = getExchangeWeekKey();
    }
  } else {
    exchangeSettings.lastExchangeWeek = getExchangeWeekKey();
  }

  if (!PERSONAL_WEB_MODE) {
    initializeDeck();
    runWeeklyExchangeIfNeeded();
  }
  saveState({ sync: false });
}

function saveState(options = {}) {
  const shouldSync = options.sync !== false;
  try {
    localStorage.setItem(LOCAL_CARDS_KEY, JSON.stringify(cards));
    localStorage.setItem(EXCHANGE_SETTINGS_KEY, JSON.stringify(exchangeSettings));
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
    localStorage.setItem(SHARE_DELIVERIES_KEY, JSON.stringify(shareDeliveries));
    localStorage.setItem(LOCAL_UPDATED_AT_KEY, new Date().toISOString());
  } catch (error) {
    updateSyncStatus("端末保存容量を超過 / サーバー同期中", "pending");
    showToast("写真データが大きく、端末保存容量を超えました。写真を少なめにするか、クラウド同期導入後に保存してください。");
  }

  if (shouldSync) {
    scheduleServerSync();
  }
}

function buildSyncPayload() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    cards,
    exchangeSettings,
    friends,
    shareDeliveries
  };
}

function isServerSyncEnabled() {
  return serverSyncAvailable;
}

function applySyncPayload(payload) {
  if (!payload || !Array.isArray(payload.cards) || payload.cards.length === 0) return false;

  cards = mergeDefaultCards(payload.cards).map(normalizeCard);
  if (payload.exchangeSettings) {
    exchangeSettings = {
      ...exchangeSettings,
      ...payload.exchangeSettings
    };
  }
  if (Array.isArray(payload.friends)) {
    friends = payload.friends.map(normalizeFriend);
  }
  if (Array.isArray(payload.shareDeliveries)) {
    shareDeliveries = payload.shareDeliveries
      .map(normalizeShareDelivery)
      .filter(delivery => delivery.friendId && delivery.sourceCardId && delivery.card);
  }

  saveState({ sync: false });
  return true;
}

function scheduleServerSync() {
  if (!isServerSyncEnabled()) {
    updateSyncStatus("スマホ保存", "local");
    return;
  }

  updateSyncStatus("同期待ち", "pending");
  window.clearTimeout(syncSaveTimer);
  syncSaveTimer = window.setTimeout(syncToServer, 500);
}

async function syncToServer() {
  if (!isServerSyncEnabled()) return;

  try {
    updateSyncStatus("同期中", "pending");
    const response = await fetch(SYNC_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildSyncPayload())
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const saved = await response.json();
    updateSyncStatus(`同期済み ${formatSyncTime(saved.updatedAt)}`, "synced");
  } catch (error) {
    updateSyncStatus("ローカル保存中", "offline");
  }
}

async function syncFromServerOnStart() {
  if (!isServerSyncEnabled()) {
    updateSyncStatus("スマホ保存", "local");
    return;
  }

  try {
    updateSyncStatus("同期確認中", "pending");
    const response = await fetch(SYNC_ENDPOINT, { cache: "no-store" });
    if (response.status === 404) {
      serverSyncAvailable = false;
      updateSyncStatus("スマホ保存", "local");
      return;
    }
    if (response.status === 401) {
      updateSyncStatus("アクセスキーが必要", "offline");
      return;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const serverState = await response.json();
    const applied = applySyncPayload(serverState);
    if (applied) {
      renderTimeline();
      if (!PERSONAL_WEB_MODE) renderDeckScreen();
      renderCollection();
      if (mapInstance) initOrRefreshMap();
      updateSyncStatus(`同期済み ${formatSyncTime(serverState.updatedAt)}`, "synced");
    } else {
      await syncToServer();
    }
  } catch (error) {
    serverSyncAvailable = false;
    updateSyncStatus("スマホ保存", "local");
  }
}

function updateSyncStatus(label, mode = "local") {
  const syncStatus = document.getElementById("sync-status");
  if (!syncStatus) return;

  syncStatus.classList.remove("synced", "pending", "offline", "local");
  syncStatus.classList.add(mode);
  syncStatus.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> ${label}`;
}

function formatSyncTime(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function mergeDefaultCards(savedCards) {
  const savedIds = new Set(savedCards.map(card => card.id));
  const missingDefaults = DEFAULT_CARDS.filter(card => !savedIds.has(card.id));
  return [...savedCards, ...missingDefaults];
}

function normalizeCard(card) {
  const areaProfile = getAreaProfile(card.area);
  const providedHours = typeof card.businessHours === "string" && card.businessHours.trim().length > 0;
  const position = normalizeCardPosition(card, areaProfile);
  return {
    ...card,
    prefecture: card.prefecture || areaProfile.prefecture,
    address: card.address || card.placeAddress || "",
    placeId: card.placeId || "",
    lat: position.lat,
    lng: position.lng,
    locationSource: card.locationSource || position.source,
    creatorName: card.creatorName || card.originalCreatorName || card.photographerName || getFallbackCreatorName(card),
    creatorId: card.creatorId || card.originalCreatorId || "",
    businessHours: providedHours ? card.businessHours.trim() : lookupGoogleMapsBusinessHours(card),
    businessHoursSource: providedHours ? (card.businessHoursSource || "manual") : "google_maps_mock",
    isLimited: Boolean(card.isLimited),
    isUnlocked: Boolean(card.isUnlocked),
    isMyCard: Boolean(card.isMyCard),
    isInDeck: Boolean(card.isInDeck),
    isFavorite: Boolean(card.isFavorite),
    isNewInDeck: Boolean(card.isNewInDeck),
    hasVisited: Boolean(card.hasVisited),
    visitedAt: card.visitedAt || "",
    aiProcessed: card.aiProcessed !== false,
    sharedWith: Array.isArray(card.sharedWith) ? card.sharedWith : [],
    acquiredAt: card.acquiredAt || new Date().toISOString()
  };
}

function normalizeCardPosition(card, areaProfile) {
  const lat = Number(card.lat);
  const lng = Number(card.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return {
      lat,
      lng,
      source: card.locationSource || "saved_location"
    };
  }

  const fallback = randomLatLngForArea(card.area);
  return {
    lat: fallback.lat || areaProfile.lat,
    lng: fallback.lng || areaProfile.lng,
    source: "area_fallback"
  };
}

function getFallbackCreatorName(card) {
  if (card.isMyCard) return "あなた";
  const creatorPool = ["mika", "sora", "kei", "nana", "tomo"];
  const parsedId = Number.parseInt(card.id, 10);
  const index = Number.isFinite(parsedId) ? parsedId % creatorPool.length : 0;
  return creatorPool[index];
}

function normalizeFriend(friend) {
  return {
    id: friend.id || createFriendId(friend.name || "friend"),
    name: friend.name || "friend",
    mutualFollow: Boolean(friend.mutualFollow),
    requested: Boolean(friend.requested)
  };
}

function createFriendId(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return slug || `friend-${Date.now()}`;
}

function loadFriends() {
  const savedFriends = localStorage.getItem(FRIENDS_KEY);
  if (savedFriends) {
    try {
      friends = JSON.parse(savedFriends).map(normalizeFriend);
      return;
    } catch (e) {
      friends = DEFAULT_FRIENDS.map(normalizeFriend);
      return;
    }
  }
  friends = DEFAULT_FRIENDS.map(normalizeFriend);
}

function normalizeShareDelivery(delivery) {
  return {
    id: delivery.id || `delivery-${Date.now()}`,
    friendId: delivery.friendId || "",
    friendName: delivery.friendName || "",
    sourceCardId: delivery.sourceCardId || "",
    receivedAt: delivery.receivedAt || new Date().toISOString(),
    registeredInCollection: delivery.registeredInCollection !== false,
    registeredInMap: delivery.registeredInMap !== false,
    card: delivery.card ? normalizeCard(delivery.card) : null
  };
}

function loadShareDeliveries() {
  const savedDeliveries = localStorage.getItem(SHARE_DELIVERIES_KEY);
  if (!savedDeliveries) {
    shareDeliveries = [];
    return;
  }

  try {
    shareDeliveries = JSON.parse(savedDeliveries)
      .map(normalizeShareDelivery)
      .filter(delivery => delivery.friendId && delivery.sourceCardId && delivery.card);
  } catch (e) {
    shareDeliveries = [];
  }
}

function normalizePlaceKey(value) {
  return String(value || "").replace(/\s+/g, "").replace(/　+/g, "").trim();
}

function lookupGoogleMapsBusinessHours(card) {
  const shopName = normalizePlaceKey(card.shopName);
  const area = normalizePlaceKey(card.area);
  const exactKey = `${shopName}|${area}`;

  // Prototype hook: replace this mock lookup with Google Places Details
  // opening_hours.weekday_text when API keys and backend storage are ready.
  return GOOGLE_MAPS_HOURS_MOCK[exactKey]
    || GENRE_HOURS_FALLBACK[card.genre]
    || "Google Mapsで営業時間を確認中";
}

function getBusinessHoursSourceLabel(card) {
  return card.businessHoursSource === "manual" ? "投稿者入力" : "Google Maps参照";
}

function setBusinessHours(card, inputValue) {
  const value = String(inputValue || "").trim();
  if (value) {
    card.businessHours = value;
    card.businessHoursSource = "manual";
  } else {
    card.businessHours = lookupGoogleMapsBusinessHours(card);
    card.businessHoursSource = "google_maps_mock";
  }
}

function isCollected(card) {
  return card.isMyCard || card.isUnlocked || card.isInDeck;
}

function getDeckCards() {
  return cards.filter(card => card.isInDeck);
}

function isDeckNewBadgeVisible(card) {
  if (!card.isNewInDeck) return false;
  const acquiredTime = Date.parse(card.acquiredAt);
  if (!Number.isFinite(acquiredTime)) return true;
  return Date.now() - acquiredTime <= 7 * 24 * 60 * 60 * 1000;
}

function getExchangeWeekKey(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - start) / 86400000);
  const week = Math.floor(dayOfYear / 7) + 1;
  return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

function getNextExchangeDateLabel() {
  const now = new Date();
  const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilMonday);
  return `${next.getMonth() + 1}/${next.getDate()}`;
}

function shuffleCards(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function getAreaProfile(area) {
  return AREA_PROFILES[area] || AREA_PROFILES["梅田"];
}

function randomLatLngForArea(area) {
  const profile = getAreaProfile(area);
  return {
    lat: profile.lat + (Math.random() - 0.5) * 0.012,
    lng: profile.lng + (Math.random() - 0.5) * 0.012
  };
}

function isValidCoordinate(lat, lng) {
  return Number.isFinite(Number(lat))
    && Number.isFinite(Number(lng))
    && Math.abs(Number(lat)) <= 90
    && Math.abs(Number(lng)) <= 180;
}

function formatLatLng(card) {
  if (!isValidCoordinate(card.lat, card.lng)) return "";
  return `${Number(card.lat).toFixed(5)}, ${Number(card.lng).toFixed(5)}`;
}

function getLocationSourceLabel(card) {
  const labels = {
    browser_geolocation: "現在地から記録",
    manual_coordinate: "手入力座標",
    osm_geocode: "店名・住所から自動検索",
    saved_location: "保存済み座標",
    area_fallback: "エリア中心の仮位置"
  };
  return labels[card.locationSource] || "保存済み座標";
}

function getGoogleMapsUrl(card) {
  if (isValidCoordinate(card.lat, card.lng) && card.locationSource !== "area_fallback") {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${card.lat},${card.lng}`)}`;
  }

  const query = [card.shopName, card.address, card.area, card.prefecture]
    .filter(Boolean)
    .join(" ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getUserPrefecture() {
  return getAreaProfile(exchangeSettings.preferredArea).prefecture;
}

function getExchangeCandidatePool() {
  const userPrefecture = getUserPrefecture();
  const base = cards.filter(card => !card.isInDeck);
  const sameArea = shuffleCards(base.filter(card => card.area === exchangeSettings.preferredArea));
  const samePrefecture = shuffleCards(
    base.filter(card => card.area !== exchangeSettings.preferredArea && card.prefecture === userPrefecture)
  );
  const outsidePrefecture = exchangeSettings.allowOutOfPrefecture
    ? shuffleCards(base.filter(card => card.prefecture !== userPrefecture))
    : [];

  return [...sameArea, ...samePrefecture, ...outsidePrefecture];
}

function initializeDeck() {
  if (getDeckCards().length === 0) {
    const initialCards = cards
      .filter(card => isCollected(card))
      .concat(cards.filter(card => !isCollected(card)))
      .slice(0, DECK_LIMIT);

    initialCards.forEach(card => {
      card.isInDeck = true;
      card.isUnlocked = true;
    });
  }

  fillDeckFromArea(exchangeSettings.preferredArea);
  enforceDeckRules();
}

function enforceDeckRules() {
  const deckCards = getDeckCards();
  deckCards
    .filter(card => card.isFavorite)
    .slice(FAVORITE_LIMIT)
    .forEach(card => {
      card.isFavorite = false;
    });

  const refreshedDeck = getDeckCards();
  if (refreshedDeck.length > DECK_LIMIT) {
    const removable = refreshedDeck.filter(card => !card.isFavorite);
    const overflow = refreshedDeck.length - DECK_LIMIT;
    removable.slice(-overflow).forEach(card => {
      card.isInDeck = false;
    });
  }
}

function fillDeckFromArea(area) {
  let shortage = DECK_LIMIT - getDeckCards().length;
  if (shortage <= 0) return;

  getExchangeCandidatePool().slice(0, shortage).forEach(card => {
    card.isInDeck = true;
    card.isUnlocked = true;
  });
}

function addCardToDeck(card, replaceIfFull = false) {
  if (card.isInDeck) return true;

  if (getDeckCards().length < DECK_LIMIT) {
    card.isInDeck = true;
    card.isUnlocked = true;
    return true;
  }

  if (!replaceIfFull) return false;

  const target = getDeckCards().find(deckCard => !deckCard.isFavorite);
  if (!target) return false;

  target.isInDeck = false;
  card.isInDeck = true;
  card.isUnlocked = true;
  return true;
}

function runWeeklyExchangeIfNeeded() {
  const currentWeek = getExchangeWeekKey();
  if (exchangeSettings.lastExchangeWeek !== currentWeek) {
    performDeckExchange(false);
  }
}

function performDeckExchange(force = true) {
  enforceDeckRules();

  const replaceTargets = shuffleCards(
    getDeckCards().filter(card => !card.isFavorite)
  ).slice(0, WEEKLY_EXCHANGE_COUNT);

  if (replaceTargets.length === 0) {
    exchangeSettings.lastExchangeSummary = "お気に入り以外のカードがないため、交換は行われませんでした。";
    exchangeSettings.lastExchangeWeek = getExchangeWeekKey();
    exchangeSettings.lastExchangeAt = new Date().toISOString();
    if (force) showToast("⭐ お気に入り以外のカードがないため、交換はスキップされました。");
    saveState();
    return;
  }

  const candidatePool = getExchangeCandidatePool();

  if (candidatePool.length === 0) {
    exchangeSettings.lastExchangeSummary = "交換候補カードがないため、手持ちはそのままです。";
    exchangeSettings.lastExchangeWeek = getExchangeWeekKey();
    exchangeSettings.lastExchangeAt = new Date().toISOString();
    if (force) showToast("交換候補カードがまだありません。");
    saveState();
    return;
  }

  const exchangedPairs = [];
  replaceTargets.forEach((outgoing, index) => {
    const incoming = candidatePool[index];
    if (!incoming) return;

    outgoing.isInDeck = false;
    outgoing.isNewInDeck = false;
    incoming.isInDeck = true;
    incoming.isUnlocked = true;
    incoming.acquiredAt = new Date().toISOString();
    incoming.isNewInDeck = true;
    incoming.exchangeCount = (incoming.exchangeCount || 0) + 1;

    exchangedPairs.push(`${outgoing.title} → ${incoming.title}`);
  });

  fillDeckFromArea(exchangeSettings.preferredArea);
  enforceDeckRules();

  exchangeSettings.lastExchangeSummary = exchangedPairs.length > 0
    ? exchangedPairs.join(" / ")
    : "交換候補が足りなかったため、手持ちはそのままです。";
  exchangeSettings.lastExchangeWeek = getExchangeWeekKey();
  exchangeSettings.lastExchangeAt = new Date().toISOString();

  saveState();

  if (force) {
    renderTimeline();
    renderDeckScreen();
    renderCollection();
    if (mapInstance) initOrRefreshMap();
    showToast(`🔄 ${exchangedPairs.length}枚のカードを交換しました！`);
  }
}

function toggleFavorite(cardId) {
  const card = cards.find(c => c.id === cardId);
  if (!card || !card.isInDeck) return;

  if (card.isFavorite) {
    card.isFavorite = false;
    showToast(`☆ ${card.title} をお気に入りから外しました。`);
  } else {
    const favoriteCount = getDeckCards().filter(c => c.isFavorite).length;
    if (favoriteCount >= FAVORITE_LIMIT) {
      showToast(`⭐ お気に入り固定は最大${FAVORITE_LIMIT}枚までです。`);
      return;
    }
    card.isFavorite = true;
    showToast(`⭐ ${card.title} を交換されないカードに固定しました。`);
  }

  saveState();
  renderDeckScreen();
}

// ==========================================================================
// 2. ポジティブコメントフィルター
// ==========================================================================
const NEGATIVE_WORDS = [
  '不味い', 'まずい', 'マズい',
  '遅い', 'おそい', 'オソい',
  '高い', 'たかい', 'タカい',
  '最悪', 'まずかっ', '汚い',
  'うるさい', 'サービス悪い', '二度と行かない'
];

function validateComment(text) {
  for (let word of NEGATIVE_WORDS) {
    if (text.includes(word)) {
      return false;
    }
  }
  return true;
}

// ==========================================================================
// 3. 画面の切り替えロジック
// ==========================================================================
const screens = document.querySelectorAll(".app-screen");
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    const targetScreen = item.getAttribute("data-screen");
    
    // ナビのアクティブ表示切替
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // 画面の非表示・表示切替
    screens.forEach(screen => {
      screen.classList.remove("active");
      if (screen.id === `screen-${targetScreen}`) {
        screen.classList.add("active");
      }
    });

    // 画面固有の再描画
    if (targetScreen === "timeline") {
      renderTimeline();
    } else if (targetScreen === "deck") {
      renderDeckScreen();
    } else if (targetScreen === "collection") {
      renderCollection();
    } else if (targetScreen === "friends") {
      renderFriendsScreen();
    } else if (targetScreen === "map") {
      initOrRefreshMap();
    }
  });
});

// ==========================================================================
// 4. タイムライン画面のカード描画とフリップ処理
// ==========================================================================
const timelineList = document.getElementById("timeline-list");
const timelineCount = document.getElementById("timeline-count");
const memoSearchInput = document.getElementById("memo-search-input");
const memoStatusFilters = document.getElementById("memo-status-filters");
const statTotalCards = document.getElementById("stat-total-cards");
const statVisitedCards = document.getElementById("stat-visited-cards");
const statWantCards = document.getElementById("stat-want-cards");
const statAreaCount = document.getElementById("stat-area-count");

if (memoSearchInput) {
  memoSearchInput.addEventListener("input", (e) => {
    memoSearchQuery = e.target.value.trim().toLowerCase();
    renderTimeline();
  });
}

if (memoStatusFilters) {
  memoStatusFilters.querySelectorAll(".memo-filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      memoStatusFilters.querySelectorAll(".memo-filter-chip").forEach(item => item.classList.remove("active"));
      chip.classList.add("active");
      memoStatusFilter = chip.getAttribute("data-status") || "all";
      renderTimeline();
    });
  });
}

function formatCreatorName(name) {
  const safeName = name || "unknown";
  return safeName.startsWith("@") ? safeName : `@${safeName}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function getSafeImageUrl(value) {
  const url = String(value || "").trim();
  if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(url)) return url;
  if (/^assets\/[a-z0-9._/-]+$/i.test(url)) return url;
  if (/^https:\/\/images\.unsplash\.com\//i.test(url)) return url;
  return "assets/ramen.png";
}

// フリップ可能なカードHTML部品を生成する共通関数（店舗名表示追加）
function createCardHtml(card, insideModal = false) {
  const isUnlocked = card.isUnlocked || card.isMyCard;
  const safeId = escapeAttr(card.id);
  const safeImageUrl = escapeAttr(getSafeImageUrl(card.imageUrl));
  const safeTitle = escapeHtml(card.title);
  const safeTitleAttr = escapeAttr(card.title);
  const safeShopName = escapeHtml(card.shopName);
  const safeComment = escapeHtml(card.comment);
  const safeGenre = escapeHtml(card.genre);
  const safeArea = escapeHtml(card.area);
  const safePrefecture = escapeHtml(card.prefecture);
  const safeAddress = escapeHtml(card.address);
  const safeCreator = escapeHtml(formatCreatorName(card.creatorName));
  const safeHours = escapeHtml(card.businessHours);
  const safeGoogleUrl = escapeAttr(getGoogleMapsUrl(card));
  const imageClass = card.aiProcessed ? "sizzled" : "";
  const steamHtml = card.aiProcessed
    ? `
          <div class="steam-container">
            <div class="steam-line"></div>
            <div class="steam-line"></div>
            <div class="steam-line"></div>
          </div>
      `
    : "";
  const sparkleHtml = card.aiProcessed && card.isLimited
    ? `
            <div class="sparkle-container">
              <div class="sparkle size-1"></div>
              <div class="sparkle size-2"></div>
              <div class="sparkle size-3"></div>
              <div class="sparkle size-1"></div>
              <div class="sparkle size-2"></div>
            </div>
      `
    : "";
  const visitedBadgeHtml = card.hasVisited
    ? `<div class="card-visited-tag"><i class="fa-solid fa-circle-check"></i> 行った</div>`
    : "";
  const wantButtonHtml = isUnlocked
    ? `<button class="btn-want unlocked"><i class="fa-solid fa-bookmark"></i> メモ済み</button>`
    : `<button class="btn-want" onclick="handleWantClick(event, '${safeId}')"><i class="fa-solid fa-bookmark"></i> メモに保存</button>`;
  const manualExchangeButtonHtml = PERSONAL_WEB_MODE
    ? ""
    : (card.isInDeck
      ? `<button class="btn-manual-exchange in-deck" disabled><i class="fa-solid fa-layer-group"></i> 手持ち中</button>`
      : `<button class="btn-manual-exchange" onclick="openManualExchange(event, '${safeId}')"><i class="fa-solid fa-right-left"></i> 手持ちと交換</button>`);

  return `
    <div class="food-card">
      <!-- 表面 (Front) -->
      <div class="card-front">
        <div class="card-image-area">
          <img class="${imageClass}" src="${safeImageUrl}" alt="${safeTitleAttr}">
          
          <!-- 【追加要望！】カード表面に店舗名を表示 -->
          <div class="card-shop-tag">
            <i class="fa-solid fa-store"></i> ${safeShopName}
          </div>
          <div class="card-creator-tag">
            <i class="fa-solid fa-camera"></i> 撮影 ${safeCreator}
          </div>
          ${visitedBadgeHtml}

          <!-- 湯気エフェクト -->
          ${steamHtml}
          <!-- キラキラエフェクト (限定のみ) -->
          ${sparkleHtml}
          ${card.isLimited ? `<div class="limited-badge"><i class="fa-solid fa-star"></i> LIMITED CARD</div>` : ''}
          <div class="card-comment-bubble">💬 「${safeComment}」</div>
        </div>
        <div class="card-footer">
          <div class="card-info">
            <h4 class="card-title">${safeTitle}</h4>
            <div class="card-meta">
              <span class="card-tag">${safeGenre}</span>
              <span class="card-tag">${safeArea}</span>
              <span class="card-tag">${card.aiProcessed ? 'AI加工' : '無加工'}</span>
            </div>
          </div>
          ${insideModal ? '' : `<div class="card-actions">${wantButtonHtml}${manualExchangeButtonHtml}</div>`}
        </div>
      </div>
      
      <!-- 裏面 (Back) -->
      <div class="card-back">
        <div class="back-header">
          <span class="unlock-title"><i class="fa-solid fa-note-sticky"></i> 店舗メモ</span>
          ${insideModal ? '' : `<button class="btn-flip-back" onclick="handleFlipBack(event, '${safeId}')"><i class="fa-solid fa-xmark"></i></button>`}
        </div>
        <h3 class="shop-name">${safeShopName}</h3>
        <div class="shop-address"><i class="fa-solid fa-map-pin"></i> エリア: ${safePrefecture} ${safeArea} 地区</div>
        ${card.address ? `<div class="shop-address"><i class="fa-solid fa-location-dot"></i> ${safeAddress}</div>` : ''}
        <div class="shop-address"><i class="fa-solid fa-crosshairs"></i> ${escapeHtml(formatLatLng(card))} / ${escapeHtml(getLocationSourceLabel(card))}</div>
        <div class="creator-note"><i class="fa-solid fa-copyright"></i> Original photo by ${safeCreator}</div>
        <div class="shop-hours">
          <i class="fa-solid fa-clock"></i>
          <div>
            <span>営業時間</span>
            <strong>${safeHours}</strong>
            <small>${getBusinessHoursSourceLabel(card)}</small>
          </div>
        </div>
        ${card.hasVisited ? `<div class="visited-note"><i class="fa-solid fa-circle-check"></i> 自分で実際に行ったお店</div>` : ''}
        
        <div class="shop-map-preview">
          <img class="map-bg-mock" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=60" alt="Map">
          <div class="map-marker-mock">
            <i class="fa-solid fa-location-dot"></i>
            <span>${safeShopName}</span>
          </div>
        </div>
        
        <a class="btn-open-google" href="${safeGoogleUrl}" target="_blank" rel="noopener">
          <i class="fa-solid fa-up-right-from-square"></i> Google Mapsで開く
        </a>
      </div>
    </div>
  `;
}

function renderTimeline() {
  timelineList.innerHTML = "";
  renderMemoStats();
  const timelineCards = getFilteredMemoCards().slice(0, TIMELINE_LIMIT);
  if (timelineCount) {
    timelineCount.textContent = `${timelineCards.length}件表示`;
  }

  if (timelineCards.length === 0) {
    timelineList.innerHTML = `
      <div class="collection-empty compact">
        <i class="fa-solid fa-magnifying-glass"></i>
        <h4>条件に合うメモがありません</h4>
        <p>検索ワードやフィルターを変えるか、右下のカメラボタンから新しいお店を追加しましょう。</p>
      </div>
    `;
    return;
  }
  
  timelineCards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = `card-perspective ${card.isLimited ? 'limited-card' : ''}`;
    cardEl.setAttribute("data-id", card.id);
    
    cardEl.innerHTML = createCardHtml(card, false);

    // カードをタップしたら裏返す (wantボタンやリンクを直接押した時を除く)
    cardEl.addEventListener("click", (e) => {
      if (e.target.closest("button") || e.target.closest("a")) return;
      
      if (!card.isUnlocked && !card.isMyCard) {
        unlockCard(card.id);
        const btn = cardEl.querySelector(".btn-want");
        if (btn) {
          btn.outerHTML = `<button class="btn-want unlocked"><i class="fa-solid fa-bookmark"></i> メモ済み</button>`;
        }
      }
      cardEl.classList.toggle("flipped");
    });

    timelineList.appendChild(cardEl);
  });
}

function renderMemoStats() {
  const collected = cards;
  const visited = cards.filter(card => card.hasVisited);
  const want = cards.filter(card => !card.hasVisited);
  const areas = new Set(cards.map(card => card.area).filter(Boolean));

  if (statTotalCards) statTotalCards.textContent = String(collected.length);
  if (statVisitedCards) statVisitedCards.textContent = String(visited.length);
  if (statWantCards) statWantCards.textContent = String(want.length);
  if (statAreaCount) statAreaCount.textContent = String(areas.size);
}

function getFilteredMemoCards() {
  return cards.filter(card => {
    if (memoStatusFilter === "visited" && !card.hasVisited) return false;
    if (memoStatusFilter === "want" && card.hasVisited) return false;

    if (!memoSearchQuery) return true;
    const haystack = [
      card.title,
      card.shopName,
      card.area,
      card.prefecture,
      card.genre,
      card.comment,
      card.address,
      card.businessHours
    ].join(" ").toLowerCase();
    return haystack.includes(memoSearchQuery);
  });
}

// Want(行きたい)ボタンのクリックハンドラ
function handleWantClick(e, id) {
  e.stopPropagation();
  unlockCard(id);
  
  const cardEl = document.querySelector(`.card-perspective[data-id="${id}"]`);
  if (cardEl) {
    const btn = cardEl.querySelector(".btn-want");
    if (btn) {
      btn.outerHTML = `<button class="btn-want unlocked"><i class="fa-solid fa-bookmark"></i> メモ済み</button>`;
    }
    setTimeout(() => {
      cardEl.classList.add("flipped");
    }, 150);
  }
}

const manualExchangeModal = document.getElementById("manual-exchange-modal");
const btnCloseManualExchange = document.getElementById("btn-close-manual-exchange");
const manualExchangeTarget = document.getElementById("manual-exchange-target");
const manualDeckList = document.getElementById("manual-deck-list");

btnCloseManualExchange.addEventListener("click", () => {
  closeManualExchange();
});
manualExchangeModal.addEventListener("click", (e) => {
  if (e.target === manualExchangeModal) {
    closeManualExchange();
  }
});

function closeManualExchange() {
  manualExchangeTargetId = null;
  manualExchangeModal.classList.remove("show");
}

function openManualExchange(e, id) {
  e.stopPropagation();
  const targetCard = cards.find(c => c.id === id);
  if (!targetCard) return;

  if (targetCard.isInDeck) {
    showToast("このカードはすでに手持ちに入っています。");
    return;
  }

  manualExchangeTargetId = id;
  manualExchangeTarget.innerHTML = `
    <img src="${escapeAttr(getSafeImageUrl(targetCard.imageUrl))}" alt="${escapeAttr(targetCard.title)}">
    <div>
      <span>交換で入れるカード</span>
      <strong>${escapeHtml(targetCard.title)}</strong>
      <small>${escapeHtml(targetCard.shopName)} / ${escapeHtml(targetCard.area)} · ${escapeHtml(targetCard.genre)}</small>
    </div>
  `;

  const deckCards = getDeckCards();
  if (deckCards.length === 0) {
    manualDeckList.innerHTML = `
      <div class="collection-empty compact">
        <i class="fa-solid fa-box-open"></i>
        <h4>交換できる手持ちカードがありません</h4>
      </div>
    `;
  } else {
    manualDeckList.innerHTML = deckCards.map(card => `
      <button class="manual-deck-card" onclick="performManualExchange('${escapeAttr(card.id)}')">
        <img src="${escapeAttr(getSafeImageUrl(card.imageUrl))}" alt="${escapeAttr(card.title)}">
        <span>${card.isFavorite ? '<i class="fa-solid fa-star"></i>' : ''}${escapeHtml(card.title)}</span>
        <small>${escapeHtml(card.shopName)}</small>
      </button>
    `).join("");
  }

  manualExchangeModal.classList.add("show");
}

function performManualExchange(outgoingId) {
  const incoming = cards.find(c => c.id === manualExchangeTargetId);
  const outgoing = cards.find(c => c.id === outgoingId);
  if (!incoming || !outgoing || !outgoing.isInDeck) return;

  outgoing.isInDeck = false;
  outgoing.isFavorite = false;
  outgoing.isNewInDeck = false;
  incoming.isInDeck = true;
  incoming.isUnlocked = true;
  incoming.acquiredAt = new Date().toISOString();
  incoming.isNewInDeck = true;
  incoming.manualExchangeCount = (incoming.manualExchangeCount || 0) + 1;

  exchangeSettings.lastExchangeSummary = `手動交換: ${outgoing.title} → ${incoming.title}`;
  saveState();
  renderTimeline();
  renderDeckScreen();
  renderCollection();
  if (mapInstance) initOrRefreshMap();
  closeManualExchange();
  showToast(`🔁 ${incoming.title} を手持ちに入れました！`);
}

// フリップ裏面の閉じるボタンハンドラ
function handleFlipBack(e, id) {
  e.stopPropagation();
  const cardEl = document.querySelector(`.card-perspective[data-id="${id}"]`);
  if (cardEl) {
    cardEl.classList.remove("flipped");
  }
}

// カードのアンロック処理
function unlockCard(id) {
  const card = cards.find(c => c.id === id);
  if (card && !card.isUnlocked) {
    card.isUnlocked = true;
    const addedToDeck = PERSONAL_WEB_MODE ? false : addCardToDeck(card, false);
    saveState();
    if (!PERSONAL_WEB_MODE) renderDeckScreen();
    renderTimeline();
    renderCollection();
    showToast(PERSONAL_WEB_MODE
      ? `📌 ${card.shopName} をグルメメモに保存しました！`
      : (addedToDeck
        ? `🗝️ ${card.shopName} がアンロックされ、手持ちにも入りました！`
        : `🗝️ ${card.shopName} が図鑑に登録されました！`));
  }
}

// ポジティブなトースト通知
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${escapeHtml(message)}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 50);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ==========================================
// 5. マイ図鑑/コレクション画面の描画 ＆ タップ時詳細反転モーダル
// ==========================================
const collectionList = document.getElementById("collection-list");
const collectionCount = document.getElementById("collection-count");
const filterTabs = document.querySelectorAll(".filter-tab");
const deckCount = document.getElementById("deck-count");
const deckList = document.getElementById("deck-list");
const exchangeAreaSelect = document.getElementById("exchange-area-select");
const toggleOutPrefecture = document.getElementById("toggle-out-prefecture");
const btnRunExchange = document.getElementById("btn-run-exchange");
const exchangeStatus = document.getElementById("exchange-status");

const collectionDetailModal = document.getElementById("collection-detail-modal");
const detailCardSlot = document.getElementById("detail-card-slot");
const btnCloseDetail = document.getElementById("btn-close-detail");
const shareFriendSelect = document.getElementById("share-friend-select");
const btnShareCard = document.getElementById("btn-share-card");
const friendSearchInput = document.getElementById("friend-search-input");
const btnSendFriendRequest = document.getElementById("btn-send-friend-request");
const friendList = document.getElementById("friend-list");

// モーダルを閉じるイベント
btnCloseDetail.addEventListener("click", () => {
  selectedDetailCardId = null;
  collectionDetailModal.classList.remove("show");
});
collectionDetailModal.addEventListener("click", (e) => {
  if (e.target === collectionDetailModal) {
    selectedDetailCardId = null;
    collectionDetailModal.classList.remove("show");
  }
});

filterTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    filterTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilterMode = tab.getAttribute("data-filter");
    renderCollection();
  });
});

exchangeAreaSelect.addEventListener("change", (e) => {
  exchangeSettings.preferredArea = e.target.value;
  fillDeckFromArea(exchangeSettings.preferredArea);
  saveState();
  renderDeckScreen();
  showToast(`📍 交換エリアを${exchangeSettings.preferredArea}に設定しました。`);
});

toggleOutPrefecture.addEventListener("change", (e) => {
  exchangeSettings.allowOutOfPrefecture = e.target.checked;
  saveState();
  renderDeckScreen();
  showToast(exchangeSettings.allowOutOfPrefecture
    ? "🗾 県外エリアとの交換をONにしました。"
    : "📍 県内エリアだけで交換する設定にしました。");
});

btnRunExchange.addEventListener("click", () => {
  performDeckExchange(true);
});

btnShareCard.addEventListener("click", () => {
  shareSelectedCard();
});

btnSendFriendRequest.addEventListener("click", () => {
  sendFriendRequest();
});

friendSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendFriendRequest();
  }
});

function renderFriendShareOptions(card) {
  if (!Array.isArray(card.sharedWith)) card.sharedWith = [];
  if (friends.length === 0) {
    shareFriendSelect.innerHTML = `<option value="">フレンドがまだいません</option>`;
    return;
  }

  shareFriendSelect.innerHTML = friends.map(friend => {
    const status = friend.mutualFollow ? "フォロー中" : "未フォロー";
    const alreadyShared = card.sharedWith.includes(friend.id) || hasDeliveredShare(card, friend.id);
    return `
      <option value="${escapeAttr(friend.id)}" ${friend.mutualFollow ? "" : "disabled"}>
        ${friend.name} / ${status}${alreadyShared ? " / 図鑑・マップ登録済み" : ""}
      </option>
    `;
  }).join("");
}

function shareSelectedCard() {
  const card = cards.find(c => c.id === selectedDetailCardId);
  if (!card || !isCollected(card)) return;

  const friend = friends.find(item => item.id === shareFriendSelect.value);
  if (!friend || !friend.mutualFollow) {
    showToast("カードのおすそわけは相互フォローのフレンド限定です。");
    return;
  }

  if (!card.sharedWith.includes(friend.id)) {
    card.sharedWith.push(friend.id);
  }
  const deliveredNow = deliverSharedCardToFriend(card, friend);

  saveState();
  renderFriendShareOptions(card);
  renderFriendsScreen();
  showToast(deliveredNow
    ? `🎁 ${friend.name} におすそわけしました。相手の図鑑とマップに登録されました！`
    : `🎁 ${friend.name} の図鑑とマップには登録済みです。`);
}

function hasDeliveredShare(card, friendId) {
  return shareDeliveries.some(delivery =>
    delivery.sourceCardId === card.id
    && delivery.friendId === friendId
    && delivery.registeredInCollection
    && delivery.registeredInMap
  );
}

function deliverSharedCardToFriend(card, friend) {
  const existing = shareDeliveries.find(delivery =>
    delivery.sourceCardId === card.id && delivery.friendId === friend.id
  );

  if (existing) {
    existing.registeredInCollection = true;
    existing.registeredInMap = true;
    existing.receivedAt = existing.receivedAt || new Date().toISOString();
    existing.card = buildReceivedCardCopy(card, friend);
    return false;
  }

  shareDeliveries.unshift({
    id: `delivery-${friend.id}-${card.id}-${Date.now()}`,
    friendId: friend.id,
    friendName: friend.name,
    sourceCardId: card.id,
    receivedAt: new Date().toISOString(),
    registeredInCollection: true,
    registeredInMap: true,
    card: buildReceivedCardCopy(card, friend)
  });
  return true;
}

function buildReceivedCardCopy(card, friend) {
  return normalizeCard({
    ...card,
    id: `received-${friend.id}-${card.id}`,
    sourceCardId: card.id,
    receiverId: friend.id,
    receiverName: friend.name,
    isMyCard: false,
    isUnlocked: true,
    isInDeck: false,
    isFavorite: false,
    isNewInDeck: false,
    hasVisited: false,
    visitedAt: "",
    acquiredAt: new Date().toISOString()
  });
}

function syncShareDeliveriesForCard(card) {
  shareDeliveries
    .filter(delivery => delivery.sourceCardId === card.id)
    .forEach(delivery => {
      delivery.card = buildReceivedCardCopy(card, {
        id: delivery.friendId,
        name: delivery.friendName
      });
    });
}

function renderDeckScreen() {
  const deckCards = getDeckCards();
  const favoriteCount = deckCards.filter(card => card.isFavorite).length;

  exchangeAreaSelect.value = exchangeSettings.preferredArea;
  toggleOutPrefecture.checked = exchangeSettings.allowOutOfPrefecture;
  deckCount.textContent = `${deckCards.length}/${DECK_LIMIT}`;
  exchangeStatus.innerHTML = `
    <span><i class="fa-solid fa-star"></i> お気に入り ${favoriteCount}/${FAVORITE_LIMIT}</span>
    <span><i class="fa-solid fa-calendar-week"></i> 次回交換 ${getNextExchangeDateLabel()} 予定</span>
    <span><i class="fa-solid fa-location-crosshairs"></i> ${getUserPrefecture()} ${exchangeSettings.preferredArea} 優先 / 県外交換 ${exchangeSettings.allowOutOfPrefecture ? 'ON' : 'OFF'}</span>
    <span><i class="fa-solid fa-clock-rotate-left"></i> ${exchangeSettings.lastExchangeSummary}</span>
    <span class="premium-note"><i class="fa-solid fa-crown"></i> Premium予定: 手持ち10枚・お気に入り枠拡張</span>
  `;

  if (deckCards.length === 0) {
    deckList.innerHTML = `
      <div class="collection-empty compact">
        <i class="fa-solid fa-layer-group"></i>
        <h4>手持ちカードがありません</h4>
        <p>タイムラインで行きたい！を押すか、カードを投稿すると手持ちに入ります。</p>
      </div>
    `;
    return;
  }

  deckList.innerHTML = deckCards.map(card => {
    const showNewBadge = isDeckNewBadgeVisible(card);
    return `
    <article class="deck-card ${card.isFavorite ? 'favorite' : ''} ${showNewBadge ? 'new-in-deck' : ''}">
      <img src="${escapeAttr(getSafeImageUrl(card.imageUrl))}" alt="${escapeAttr(card.title)}">
      ${showNewBadge ? `<div class="deck-new-badge"><i class="fa-solid fa-star"></i> NEW</div>` : ''}
      <button class="deck-favorite" onclick="toggleFavorite('${escapeAttr(card.id)}')" title="お気に入り固定">
        <i class="${card.isFavorite ? 'fa-solid' : 'fa-regular'} fa-star"></i>
      </button>
      <div class="deck-card-info">
        <strong>${escapeHtml(card.title)}</strong>
        <span>${escapeHtml(card.area)} · ${escapeHtml(card.genre)}</span>
        <small>撮影 ${escapeHtml(formatCreatorName(card.creatorName))}</small>
      </div>
      <div class="deck-card-actions">
        <button type="button" class="deck-card-btn" onclick="editCardText(event, '${escapeAttr(card.id)}')">
          <i class="fa-solid fa-pen"></i> 文言編集
        </button>
        <button type="button" class="deck-card-btn primary" onclick="openCollectionDetail('${escapeAttr(card.id)}')">
          <i class="fa-solid fa-gift"></i> おすそわけ
        </button>
      </div>
    </article>
  `}).join("");
}

function renderCollection() {
  collectionList.innerHTML = "";
  
  const collected = cards.filter(c => isCollected(c));
  collectionCount.textContent = `(${collected.length}枚)`;

  if (collected.length === 0) {
    collectionList.innerHTML = `
      <div class="collection-empty">
        <i class="fa-solid fa-box-open"></i>
        <h4>まだカードが集まっていません</h4>
        <p>メモ一覧で「メモに保存」を押すか、右下のカメラボタンから好きなお店を追加しましょう。</p>
      </div>
    `;
    return;
  }

  const groups = {};
  collected.forEach(card => {
    const key = currentFilterMode === "area" ? card.area : card.genre;
    if (!groups[key]) groups[key] = [];
    groups[key].push(card);
  });

  Object.keys(groups).sort().forEach(groupName => {
    const groupCards = groups[groupName];
    
    const section = document.createElement("div");
    section.className = "category-section";
    
    section.innerHTML = `
      <h3 class="category-title">${escapeHtml(groupName)} (${groupCards.length}枚)</h3>
      <div class="collection-grid">
        ${groupCards.map(c => `
          <div class="grid-item ${c.isLimited ? 'limited' : ''}" onclick="openCollectionDetail('${escapeAttr(c.id)}')">
            <img src="${escapeAttr(getSafeImageUrl(c.imageUrl))}" alt="${escapeAttr(c.title)}">
            ${c.isLimited ? `<i class="fa-solid fa-star grid-item-star"></i>` : ''}
            <button type="button" class="grid-edit-btn" onclick="editCardText(event, '${escapeAttr(c.id)}')" title="文言編集">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="grid-visited-btn ${c.hasVisited ? 'active' : ''}" onclick="toggleVisited(event, '${escapeAttr(c.id)}')" title="実際に行ったマーク">
              <i class="${c.hasVisited ? 'fa-solid' : 'fa-regular'} fa-circle-check"></i>
            </button>
            ${c.hasVisited ? `<div class="grid-visited-ribbon"><i class="fa-solid fa-circle-check"></i> 行った</div>` : ''}
            <div class="grid-item-info">
              <span class="grid-item-title">${escapeHtml(c.title)}</span>
              <span class="grid-item-shop">${escapeHtml(c.shopName)}</span>
              <span class="grid-item-creator">撮影 ${escapeHtml(formatCreatorName(c.creatorName))}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    collectionList.appendChild(section);
  });
}

// 【機能変更！】マイ図鑑カードタップ時にフリップモーダルを表示
function openCollectionDetail(id) {
  const card = cards.find(c => c.id === id);
  if (!card) return;
  selectedDetailCardId = id;

  // モーダルスロットの初期化
  detailCardSlot.innerHTML = "";
  
  // モーダル内に3Dフリップカードを作成 (Wantボタンは出さず、店舗情報が先に見えるよう flipped クラスをトグル可能にする)
  const detailCardEl = document.createElement("div");
  detailCardEl.className = `card-perspective ${card.isLimited ? 'limited-card' : ''}`;
  detailCardEl.innerHTML = createCardHtml(card, true);

  // 初期状態で「裏面（店舗詳細）」を見せる演出（または表面でもOK。ここでは「反転して店舗情報が見える」という要望なので、表面から開始し、タップで反転するか、あるいは最初から裏面で見せてタップで表面に戻せるようにする。
  // ここでは最初は表面を見せ、ユーザーがタップしてフリップする楽しさを提供します）
  detailCardEl.addEventListener("click", () => {
    detailCardEl.classList.toggle("flipped");
  });

  detailCardSlot.appendChild(detailCardEl);
  renderFriendShareOptions(card);
  collectionDetailModal.classList.add("show");
}

function editCardText(eventOrId, maybeId) {
  if (eventOrId && typeof eventOrId.stopPropagation === "function") {
    eventOrId.stopPropagation();
  }

  const id = typeof eventOrId === "string" ? eventOrId : maybeId;
  const card = cards.find(c => c.id === id);
  if (!card || !isCollected(card)) return;

  const nextTitle = prompt("料理名を編集します", card.title);
  if (nextTitle === null) return;

  const trimmedTitle = nextTitle.trim();
  if (!trimmedTitle) {
    showToast("料理名は空にできません。");
    return;
  }

  const nextComment = prompt("カードの一言コメントを編集します", card.comment);
  if (nextComment === null) return;

  const trimmedComment = nextComment.trim();
  if (!trimmedComment) {
    showToast("コメントは空にできません。");
    return;
  }

  if (!validateComment(trimmedComment)) {
    showToast("もっと美味しい表現で伝えてみませんか？");
    return;
  }

  const nextHours = prompt("営業時間を編集します（空欄ならGoogle Mapsから自動補完）", card.businessHours || "");
  if (nextHours === null) return;

  card.title = trimmedTitle;
  card.comment = trimmedComment;
  setBusinessHours(card, nextHours);
  syncShareDeliveriesForCard(card);
  saveState();
  renderTimeline();
  renderDeckScreen();
  renderCollection();
  if (mapInstance) initOrRefreshMap();
  if (selectedDetailCardId === id && collectionDetailModal.classList.contains("show")) {
    openCollectionDetail(id);
  }
  showToast("✏️ カードの文言を更新しました。撮影者名はそのまま残ります。");
}

function toggleVisited(eventOrId, maybeId) {
  if (eventOrId && typeof eventOrId.stopPropagation === "function") {
    eventOrId.stopPropagation();
  }

  const id = typeof eventOrId === "string" ? eventOrId : maybeId;
  const card = cards.find(c => c.id === id);
  if (!card || !isCollected(card)) return;
  const keepMapPopupOpen = typeof mapPopupCard !== "undefined"
    && mapPopupCard
    && mapPopupCard.style.display !== "none";

  card.hasVisited = !card.hasVisited;
  card.visitedAt = card.hasVisited ? new Date().toISOString() : "";

  saveState();
  renderTimeline();
  renderDeckScreen();
  renderCollection();
  if (mapInstance) {
    initOrRefreshMap();
    if (keepMapPopupOpen) showMapPopupCard(card);
  }
  if (selectedDetailCardId === id && collectionDetailModal.classList.contains("show")) {
    openCollectionDetail(id);
  }

  showToast(card.hasVisited
    ? `✅ ${card.shopName} を「実際に行った店」にしました。`
    : `○ ${card.shopName} の「行った」マークを外しました。`);
}

function renderFriendsScreen() {
  if (!friendList) return;

  if (friends.length === 0) {
    friendList.innerHTML = `
      <div class="collection-empty compact">
        <i class="fa-solid fa-user-plus"></i>
        <h4>フレンドがまだいません</h4>
        <p>ユーザー名を入力してフレンド申請を送ってみましょう。</p>
      </div>
    `;
    return;
  }

  friendList.innerHTML = friends.map(friend => {
    const deliveryCount = shareDeliveries.filter(delivery => delivery.friendId === friend.id).length;
    return `
    <article class="friend-card ${friend.mutualFollow ? 'mutual' : ''}">
      <div class="friend-avatar">${friend.name.slice(0, 1).toUpperCase()}</div>
      <div class="friend-info">
        <strong>${formatCreatorName(friend.name)}</strong>
        <span>${friend.mutualFollow ? 'フォロー中 / おすそわけOK' : '未フォロー / 申請中'}${deliveryCount ? ` / 受け取り済み${deliveryCount}枚` : ''}</span>
      </div>
      <div class="friend-actions">
        <button type="button" onclick="toggleFriendMutual('${friend.id}')">
          ${friend.mutualFollow ? 'フォローを外す' : 'フォローする'}
        </button>
        <button type="button" class="danger" onclick="removeFriend('${friend.id}')">
          リストから外す
        </button>
      </div>
    </article>
  `}).join("");
}

function sendFriendRequest() {
  const name = friendSearchInput.value.trim().replace(/^@+/, "");
  if (!name) {
    showToast("ユーザー名を入力してください。");
    return;
  }

  const exists = friends.find(friend => friend.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    showToast(`${formatCreatorName(exists.name)} はすでにフレンド一覧にいます。`);
    return;
  }

  const friend = normalizeFriend({
    id: createFriendId(name),
    name,
    mutualFollow: false,
    requested: true
  });

  friends.unshift(friend);
  friendSearchInput.value = "";
  saveState();
  renderFriendsScreen();
  renderFriendShareOptionsForOpenCard();
  showToast(`🤝 ${formatCreatorName(friend.name)} にフレンド申請を送りました。`);
}

function toggleFriendMutual(id) {
  const friend = friends.find(item => item.id === id);
  if (!friend) return;

  friend.mutualFollow = !friend.mutualFollow;
  friend.requested = !friend.mutualFollow;
  saveState();
  renderFriendsScreen();
  renderFriendShareOptionsForOpenCard();
  showToast(friend.mutualFollow
    ? `${formatCreatorName(friend.name)} をフォローしました。`
    : `${formatCreatorName(friend.name)} のフォローを外しました。`);
}

function removeFriend(id) {
  const friend = friends.find(item => item.id === id);
  if (!friend) return;

  if (!confirm(`${formatCreatorName(friend.name)} をフレンドリストから外しますか？`)) {
    return;
  }

  friends = friends.filter(item => item.id !== id);
  cards.forEach(card => {
    if (Array.isArray(card.sharedWith)) {
      card.sharedWith = card.sharedWith.filter(friendId => friendId !== id);
    }
  });
  saveState();
  renderFriendsScreen();
  renderFriendShareOptionsForOpenCard();
  showToast(`${formatCreatorName(friend.name)} をフレンドリストから外しました。`);
}

function renderFriendShareOptionsForOpenCard() {
  if (!selectedDetailCardId || !collectionDetailModal.classList.contains("show")) return;
  const card = cards.find(c => c.id === selectedDetailCardId);
  if (card) renderFriendShareOptions(card);
}

// ==========================================
// 6. グルメ・マイマップ画面 (Leaflet.js連携 & ソート)
// ==========================================
const mapPopupCard = document.getElementById("map-popup-card");
const mapFilterChips = document.getElementById("map-filter-chips");
const mapSearchInput = document.getElementById("map-search-input");

// ソートフィルターチップのイベント登録
mapFilterChips.querySelectorAll(".map-filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    mapFilterChips.querySelectorAll(".map-filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    selectedMapGenre = chip.getAttribute("data-genre");
    
    // フィルターに連動してマップマーカーを更新
    initOrRefreshMap();
  });
});

mapSearchInput.addEventListener("input", (e) => {
  mapSearchQuery = e.target.value.trim().toLowerCase();
  initOrRefreshMap();
});

function initOrRefreshMap() {
  const mapContainer = document.getElementById("map-container");

  if (typeof L === "undefined") {
    mapPopupCard.style.display = "none";
    mapContainer.innerHTML = `
      <div class="map-fallback">
        <i class="fa-solid fa-map-location-dot"></i>
        <h3>マップライブラリを読み込めませんでした</h3>
        <p>インターネット接続がある環境では、ここにアンロック済みカードのピンが表示されます。</p>
      </div>
    `;
    return;
  }
  
  if (!mapInstance) {
    mapContainer.innerHTML = "";
    mapInstance = L.map(mapContainer, {
      zoomControl: false,
      attributionControl: false
    }).setView([34.69, 135.50], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
  }

  // 既存マーカーのクリア
  mapMarkers.forEach(marker => mapInstance.removeLayer(marker));
  mapMarkers = [];
  mapPopupCard.style.display = "none";

  // アンロックされたカードを抽出
  let mapCards = cards.filter(c => isCollected(c));

  // 【追加要望！】マップのジャンルソートの適用
  if (selectedMapGenre !== "All") {
    mapCards = mapCards.filter(c => c.genre === selectedMapGenre);
  }

  if (mapSearchQuery) {
    mapCards = mapCards.filter(c =>
      c.shopName.toLowerCase().includes(mapSearchQuery) ||
      c.title.toLowerCase().includes(mapSearchQuery) ||
      c.area.toLowerCase().includes(mapSearchQuery) ||
      c.genre.toLowerCase().includes(mapSearchQuery) ||
      String(c.address || "").toLowerCase().includes(mapSearchQuery) ||
      String(c.businessHours || "").toLowerCase().includes(mapSearchQuery)
    );
  }

  mapCards = mapCards.filter(card => isValidCoordinate(card.lat, card.lng));

  mapCards.forEach(card => {
    const safeId = escapeAttr(card.id);
    const safeImageUrl = escapeAttr(getSafeImageUrl(card.imageUrl));
    const pinIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="pin-wrapper" id="map-pin-${safeId}">
          <div class="pin-img-ring ${card.isLimited ? 'limited' : ''} ${card.hasVisited ? 'visited' : ''}">
            <img src="${safeImageUrl}" alt="">
          </div>
          <div class="pin-stem"></div>
        </div>
      `,
      iconSize: [36, 44],
      iconAnchor: [18, 44]
    });

    const marker = L.marker([card.lat, card.lng], { icon: pinIcon }).addTo(mapInstance);
    
    marker.on("click", (e) => {
      document.querySelectorAll(".pin-img-ring").forEach(el => el.classList.remove("selected"));
      
      const ring = document.querySelector(`#map-pin-${card.id} .pin-img-ring`);
      if (ring) ring.classList.add("selected");
      
      showMapPopupCard(card);
      mapInstance.panTo([card.lat - 0.003, card.lng]);
    });

    mapMarkers.push(marker);
  });

  // フィット
  if (mapCards.length > 0) {
    const bounds = L.latLngBounds(mapCards.map(c => [c.lat, c.lng]));
    mapInstance.fitBounds(bounds.pad(0.2));
  }
}

function showMapPopupCard(card) {
  const safeId = escapeAttr(card.id);
  const safeImageUrl = escapeAttr(getSafeImageUrl(card.imageUrl));
  const safeTitle = escapeHtml(card.title);
  const safeTitleAttr = escapeAttr(card.title);
  const safeShopName = escapeHtml(card.shopName);
  const safeArea = escapeHtml(card.area);
  const safeGenre = escapeHtml(card.genre);
  const safeCreator = escapeHtml(formatCreatorName(card.creatorName));
  const safeAddress = escapeHtml(card.address);
  const safeHours = escapeHtml(card.businessHours);
  const safeGoogleUrl = escapeAttr(getGoogleMapsUrl(card));
  mapPopupCard.innerHTML = `
    <img class="map-card-img" src="${safeImageUrl}" alt="${safeTitleAttr}">
    <div class="map-card-info">
      <div class="map-card-title">${safeTitle}</div>
      <div class="map-card-shop">${safeShopName}</div>
      <div class="map-card-meta">${safeArea} 地区 · ${safeGenre} · 撮影 ${safeCreator}</div>
      ${card.address ? `<div class="map-card-address"><i class="fa-solid fa-location-dot"></i> ${safeAddress}</div>` : ''}
      <div class="map-card-hours"><i class="fa-solid fa-clock"></i> ${safeHours}</div>
      <div class="map-card-source"><i class="fa-solid fa-crosshairs"></i> ${escapeHtml(getLocationSourceLabel(card))}</div>
      ${card.hasVisited ? `<div class="map-card-visited"><i class="fa-solid fa-circle-check"></i> 実際に行った店</div>` : ''}
    </div>
    <!-- 【挙動変更！】マップポップアップから図鑑と同様の詳細フリップモーダルを直接呼び出す -->
    <a class="btn-map-google" href="${safeGoogleUrl}" target="_blank" rel="noopener" title="Google Mapsで開く">
      <i class="fa-solid fa-up-right-from-square"></i>
    </a>
    <button class="btn-map-route" onclick="openCollectionDetail('${safeId}')">
      <i class="fa-solid fa-circle-chevron-right"></i>
    </button>
    <button class="btn-map-visited ${card.hasVisited ? 'active' : ''}" onclick="toggleVisited(event, '${safeId}')" title="実際に行った店として管理">
      <i class="${card.hasVisited ? 'fa-solid' : 'fa-regular'} fa-circle-check"></i>
    </button>
    <button class="btn-map-delete" onclick="deleteRecordedCard('${safeId}')">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;
  mapPopupCard.style.display = "flex";
}

function deleteRecordedCard(id) {
  const card = cards.find(c => c.id === id);
  if (!card) return;

  if (!confirm(`${card.title} の記録をマイマップと図鑑から削除しますか？`)) {
    return;
  }

  if (card.isMyCard) {
    cards = cards.filter(c => c.id !== id);
  } else {
    card.isUnlocked = false;
    card.isInDeck = false;
    card.isFavorite = false;
    card.isNewInDeck = false;
    card.hasVisited = false;
    card.visitedAt = "";
    card.sharedWith = [];
  }

  saveState();
  renderTimeline();
  renderDeckScreen();
  renderCollection();
  initOrRefreshMap();
  showToast(`🗑️ ${card.title} の記録を削除しました。`);
}

// ==========================================
// 7. 新規投稿モーダル処理 ＆ カメラ・ファイル選択
// ==========================================
const btnOpenPost = document.getElementById("btn-open-post");
const btnClosePost = document.getElementById("btn-close-post");
const postModal = document.getElementById("post-modal");
const postForm = document.getElementById("post-form");
const postPreviewWrapper = document.getElementById("post-preview-wrapper");
const postPreviewImg = document.getElementById("post-preview-img");
const imageEmptyState = document.getElementById("image-empty-state");
const previewSteam = document.getElementById("preview-steam");
const previewSparkles = document.getElementById("preview-sparkles");
const toggleSizzle = document.getElementById("toggle-sizzle");
const toggleLimited = document.getElementById("toggle-limited");
const postError = document.getElementById("post-error");

// ファイル選択関連要素
const btnTriggerUpload = document.getElementById("btn-trigger-upload");
const postFileInput = document.getElementById("post-file-input");
const postAddressInput = document.getElementById("post-address");
const postLatInput = document.getElementById("post-lat");
const postLngInput = document.getElementById("post-lng");
const postLocationStatus = document.getElementById("post-location-status");
const btnUseCurrentLocation = document.getElementById("btn-use-current-location");

let selectedImagePath = "";

// カメラ・ファイル選択トリガー
btnTriggerUpload.addEventListener("click", () => {
  postFileInput.click();
});

if (btnUseCurrentLocation) {
  btnUseCurrentLocation.addEventListener("click", () => {
    useCurrentLocationForPost();
  });
}

function loadImageElementFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("画像を読み込めませんでした。"));
      image.src = evt.target.result;
    };
    reader.onerror = () => reject(new Error("画像ファイルを読み込めませんでした。"));
    reader.readAsDataURL(file);
  });
}

async function prepareCardImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("画像ファイルを選択してください。");
  }

  const image = await loadImageElementFromFile(file);
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const scale = Math.min(1, CARD_IMAGE_MAX_SIZE / Math.max(width, height));
  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  return canvas.toDataURL("image/jpeg", CARD_IMAGE_QUALITY);
}

// ローカルファイル選択イベント（カメラで撮った画像/端末内画像の取り込み）
postFileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      showToast("📸 画像を取り込んでいます...");
      selectedImagePath = await prepareCardImage(file);
      postPreviewImg.src = selectedImagePath;
      postPreviewWrapper.classList.remove("empty");
      imageEmptyState.style.display = "none";
      previewSteam.style.display = toggleSizzle.checked ? "block" : "none";
      previewSparkles.style.display = toggleSizzle.checked && toggleLimited.checked ? "block" : "none";

      showToast("📸 画像を軽量化して取り込みました！");
    } catch (error) {
      selectedImagePath = "";
      postFileInput.value = "";
      showToast(error.message || "画像を取り込めませんでした。");
    }
  }
});

// 開く・閉じる
btnOpenPost.addEventListener("click", () => {
  postForm.reset();
  selectedImagePath = "";
  postFileInput.value = ""; // ファイル選択クリア
  postPreviewImg.removeAttribute("src");
  postPreviewWrapper.classList.add("empty");
  imageEmptyState.style.display = "flex";
  postPreviewImg.className = "sizzled";
  previewSteam.style.display = "none";
  previewSparkles.style.display = "none";
  postError.style.display = "none";
  setPostLocationStatus("未入力なら、無料の場所検索で候補を探します。");

  postModal.classList.add("show");
});

btnClosePost.addEventListener("click", () => {
  postModal.classList.remove("show");
});

// AIシズル感トグル
toggleSizzle.addEventListener("change", (e) => {
  if (e.target.checked) {
    postPreviewImg.classList.add("sizzled");
    previewSteam.style.display = selectedImagePath ? "block" : "none";
    previewSparkles.style.display = selectedImagePath && toggleLimited.checked ? "block" : "none";
  } else {
    postPreviewImg.classList.remove("sizzled");
    previewSteam.style.display = "none";
    previewSparkles.style.display = "none";
  }
});

// 限定フラグトグル
toggleLimited.addEventListener("change", (e) => {
  if (e.target.checked && toggleSizzle.checked && selectedImagePath) {
    previewSparkles.style.display = "block";
  } else {
    previewSparkles.style.display = "none";
  }
});

function setPostLocationStatus(message) {
  if (postLocationStatus) postLocationStatus.textContent = message;
}

function useCurrentLocationForPost() {
  if (!navigator.geolocation) {
    setPostLocationStatus("このブラウザでは現在地を取得できません。住所入力か座標入力を使ってください。");
    return;
  }

  setPostLocationStatus("現在地を取得しています...");
  navigator.geolocation.getCurrentPosition(
    position => {
      postLatInput.value = position.coords.latitude.toFixed(6);
      postLngInput.value = position.coords.longitude.toFixed(6);
      setPostLocationStatus("現在地を記録位置にセットしました。");
    },
    () => {
      setPostLocationStatus("現在地を取得できませんでした。スマホではHTTPS以外だと制限される場合があります。住所入力で記録できます。");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}

async function geocodePlace(shop, area, address) {
  const query = [shop, address, area, "日本"].filter(Boolean).join(" ");
  if (!query.trim()) return null;

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: { "Accept": "application/json" }
    });
    if (!response.ok) return null;
    const results = await response.json();
    const first = Array.isArray(results) ? results[0] : null;
    if (!first || !isValidCoordinate(first.lat, first.lon)) return null;

    return {
      lat: Number(first.lat),
      lng: Number(first.lon),
      address: address || first.display_name || "",
      source: "osm_geocode"
    };
  } catch (error) {
    return null;
  }
}

async function resolvePostLocation(shop, area, address) {
  const latValue = String(postLatInput?.value || "").trim();
  const lngValue = String(postLngInput?.value || "").trim();
  const manualLat = Number(latValue);
  const manualLng = Number(lngValue);
  if (latValue && lngValue && isValidCoordinate(manualLat, manualLng)) {
    return {
      lat: manualLat,
      lng: manualLng,
      address,
      source: "manual_coordinate"
    };
  }

  setPostLocationStatus("店名・住所から場所を探しています...");
  const found = await geocodePlace(shop, area, address);
  if (found) {
    postLatInput.value = found.lat.toFixed(6);
    postLngInput.value = found.lng.toFixed(6);
    setPostLocationStatus("場所候補を見つけました。地図にこの位置で保存します。");
    return found;
  }

  const fallback = randomLatLngForArea(area);
  setPostLocationStatus("場所候補が見つからなかったため、エリア付近の仮位置で保存します。あとで編集できます。");
  return {
    lat: fallback.lat,
    lng: fallback.lng,
    address,
    source: "area_fallback"
  };
}

// フォーム送信
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  postError.style.display = "none";

  const title = document.getElementById("post-title").value.trim();
  const shop = document.getElementById("post-shop").value.trim();
  const address = document.getElementById("post-address").value.trim();
  const businessHours = document.getElementById("post-hours").value.trim();
  const area = document.getElementById("post-area").value;
  const genre = document.getElementById("post-genre").value;
  const comment = document.getElementById("post-comment").value.trim();

  if (!selectedImagePath) {
    postError.innerHTML = `📸 <strong>料理写真を選択してください。</strong><br>プリセットではなく、撮影した写真や端末内の料理写真を使います。`;
    postError.style.display = "block";
    return;
  }

  // コメントのAIフィルター
  if (!validateComment(comment)) {
    postError.innerHTML = `✨ <strong>もっと美味しい表現で伝えてみませんか？</strong> ✨<br>(「不味い」「遅い」などのネガティブな表現を美味しい言葉に変えてみましょう！)`;
    postError.style.display = "block";
    return;
  }

  // 緯度経度のランダム割り当て（エリア付近）
  const position = await resolvePostLocation(shop, area, address);
  const areaProfile = getAreaProfile(area);

  const newCard = {
    id: Date.now().toString(),
    imageUrl: selectedImagePath,
    title: title,
    comment: comment,
    shopName: shop,
    businessHours: businessHours,
    businessHoursSource: businessHours ? "manual" : "google_maps_mock",
    prefecture: areaProfile.prefecture,
    address: position.address || address,
    area: area,
    genre: genre,
    lat: position.lat,
    lng: position.lng,
    locationSource: position.source,
    isLimited: toggleLimited.checked,
    aiProcessed: toggleSizzle.checked,
    creatorName: "あなた",
    creatorId: "local-user",
    isUnlocked: true, // 自分の投稿はアンロック済み
    isMyCard: true,
    isNewInDeck: false,
    hasVisited: true,
    visitedAt: new Date().toISOString(),
    sharedWith: [],
    acquiredAt: new Date().toISOString()
  };
  if (!businessHours) {
    newCard.businessHours = lookupGoogleMapsBusinessHours(newCard);
  }

  // Stateへ追加
  cards.unshift(newCard);
  const enteredDeck = PERSONAL_WEB_MODE ? false : addCardToDeck(newCard, true);
  saveState();
  
  // タイムライン描画更新
  renderTimeline();
  if (!PERSONAL_WEB_MODE) renderDeckScreen();
  renderCollection();
  
  // モーダルを閉じる
  postModal.classList.remove("show");
  
  showToast(PERSONAL_WEB_MODE
    ? "🎉 新しいグルメメモを追加しました！"
    : (enteredDeck
      ? "🎉 新しい料理カードが図鑑と手持ちに追加されました！"
      : "🎉 新しい料理カードが図鑑に追加されました！"));
});

// ==========================================
// 8. アプリ初期化
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
  loadState();
  renderTimeline();
  if (!PERSONAL_WEB_MODE) renderDeckScreen();
  renderCollection();
  if (!PERSONAL_WEB_MODE) renderFriendsScreen();
  await syncFromServerOnStart();
});
