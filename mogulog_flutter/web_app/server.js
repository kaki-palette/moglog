const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 8765);
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const DATA_FILE = path.join(DATA_DIR, "mogulog-data.json");
const MAX_BODY_BYTES = 80 * 1024 * 1024;
const ACCESS_KEY = String(process.env.MOGULOG_ACCESS_KEY || "").trim();
const SESSION_COOKIE = "mogulog_session";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp"
};

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readDatabase() {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    return {
      version: 1,
      updatedAt: "",
      cards: [],
      exchangeSettings: null,
      friends: [],
      shareDeliveries: []
    };
  }

  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (error) {
    return {
      version: 1,
      updatedAt: "",
      cards: [],
      exchangeSettings: null,
      friends: [],
      shareDeliveries: [],
      readError: error.message
    };
  }
}

function writeDatabase(payload) {
  ensureDataDir();
  const safePayload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    cards: Array.isArray(payload.cards) ? payload.cards : [],
    exchangeSettings: payload.exchangeSettings || null,
    friends: Array.isArray(payload.friends) ? payload.friends : [],
    shareDeliveries: Array.isArray(payload.shareDeliveries) ? payload.shareDeliveries : []
  };

  const tmpFile = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(safePayload, null, 2), "utf8");
  fs.renameSync(tmpFile, DATA_FILE);
  return safePayload;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, withSecurityHeaders({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  }));
  res.end(JSON.stringify(payload));
}

function withSecurityHeaders(headers = {}) {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "same-origin",
    "Permissions-Policy": "camera=(self), geolocation=(self)",
    ...headers
  };
}

function hashAccessKey() {
  return crypto.createHash("sha256").update(ACCESS_KEY).digest("hex");
}

function parseCookies(req) {
  return String(req.headers.cookie || "")
    .split(";")
    .map(cookie => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const [name, ...valueParts] = cookie.split("=");
      cookies[name] = decodeURIComponent(valueParts.join("=") || "");
      return cookies;
    }, {});
}

function isAuthRequired() {
  return ACCESS_KEY.length > 0;
}

function isAuthenticated(req) {
  if (!isAuthRequired()) return true;
  const cookies = parseCookies(req);
  return cookies[SESSION_COOKIE] === hashAccessKey();
}

function sendLoginPage(res, message = "") {
  const messageHtml = message ? `<p class="error">${message}</p>` : "";
  res.writeHead(401, withSecurityHeaders({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  }));
  res.end(`<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>もぐログ - ロック解除</title>
  <style>
    body { min-height: 100vh; margin: 0; display: grid; place-items: center; background: #121214; color: #fff; font-family: system-ui, -apple-system, sans-serif; }
    main { width: min(420px, calc(100% - 32px)); padding: 28px; border: 1px solid rgba(255,255,255,.1); border-radius: 20px; background: rgba(255,255,255,.05); }
    h1 { margin: 0 0 10px; font-size: 24px; }
    p { color: #b8b8c4; line-height: 1.7; }
    .error { color: #ffb4a9; }
    input, button { width: 100%; box-sizing: border-box; min-height: 46px; border-radius: 12px; font: inherit; }
    input { border: 1px solid rgba(255,255,255,.16); background: rgba(0,0,0,.22); color: #fff; padding: 0 12px; }
    button { margin-top: 12px; border: 0; color: #fff; font-weight: 800; background: linear-gradient(135deg, #ff6f61, #ffb347); }
  </style>
</head>
<body>
  <main>
    <h1>もぐログ</h1>
    <p>個人用グルメメモを開くため、アクセスキーを入力してください。</p>
    ${messageHtml}
    <form method="post" action="/auth">
      <input type="password" name="key" autocomplete="current-password" placeholder="アクセスキー" required>
      <button type="submit">開く</button>
    </form>
  </main>
</body>
</html>`);
}

function handleAuth(req, res) {
  if (req.method !== "POST") {
    sendLoginPage(res);
    return;
  }

  const chunks = [];
  req.on("data", chunk => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk))));
  req.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf8");
    const params = new URLSearchParams(body);
    const key = String(params.get("key") || "");

    if (!ACCESS_KEY || key !== ACCESS_KEY) {
      sendLoginPage(res, "アクセスキーが違います。");
      return;
    }

    const cookie = `${SESSION_COOKIE}=${encodeURIComponent(hashAccessKey())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 30}`;
    res.writeHead(303, withSecurityHeaders({
      "Set-Cookie": cookie,
      "Location": "/",
      "Cache-Control": "no-store"
    }));
    res.end();
  });
}

function readRequestBody(req, res, callback) {
  const chunks = [];
  let received = 0;

  req.on("data", chunk => {
    received += chunk.length;
    if (received > MAX_BODY_BYTES) {
      sendJson(res, 413, { error: "データが大きすぎます。写真サイズを小さくして再試行してください。" });
      req.destroy();
      return;
    }
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  });

  req.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf8");
    let payload;
    try {
      payload = JSON.parse(body || "{}");
    } catch (error) {
      sendJson(res, 400, {
        error: "保存データの形式を読み取れませんでした。",
        detail: error.message
      });
      return;
    }

    callback(payload);
  });
}

function saveIncomingDatabase(res, payload) {
  try {
    sendJson(res, 200, writeDatabase(payload));
  } catch (error) {
    sendJson(res, 500, {
      error: "保存ファイルに書き込めませんでした。",
      detail: error.message
    });
  }
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(ROOT_DIR, relativePath);
  const rootWithSep = ROOT_DIR.endsWith(path.sep) ? ROOT_DIR : `${ROOT_DIR}${path.sep}`;
  const dataWithSep = DATA_DIR.endsWith(path.sep) ? DATA_DIR : `${DATA_DIR}${path.sep}`;

  if (filePath !== ROOT_DIR && !filePath.startsWith(rootWithSep)) {
    res.writeHead(403, withSecurityHeaders());
    res.end("Forbidden");
    return;
  }

  if (filePath === DATA_DIR || filePath.startsWith(dataWithSep) || filePath === path.join(ROOT_DIR, "server.js")) {
    res.writeHead(403, withSecurityHeaders());
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      res.writeHead(404, withSecurityHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, withSecurityHeaders({
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=60"
    }));
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/auth")) {
    handleAuth(req, res);
    return;
  }

  if (!isAuthenticated(req)) {
    if (req.url.startsWith("/api/")) {
      sendJson(res, 401, { error: "アクセスキーが必要です。" });
      return;
    }
    sendLoginPage(res);
    return;
  }

  if (req.url.startsWith("/api/mogulog")) {
    if (req.method === "GET") {
      sendJson(res, 200, readDatabase());
      return;
    }

    if (req.method === "POST") {
      readRequestBody(req, res, payload => {
        saveIncomingDatabase(res, payload);
      });
      return;
    }

    sendJson(res, 405, { error: "Method Not Allowed" });
    return;
  }

  serveStatic(req, res);
});

function getLocalUrls() {
  const urls = [`http://localhost:${PORT}`];
  const interfaces = os.networkInterfaces();
  Object.values(interfaces).flat().forEach(info => {
    if (info && info.family === "IPv4" && !info.internal) {
      urls.push(`http://${info.address}:${PORT}`);
    }
  });
  return urls;
}

server.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("========================================");
  console.log("  MoguLog personal web server");
  console.log("========================================");
  console.log("");
  console.log("Open on this PC:");
  console.log(`  http://localhost:${PORT}`);
  console.log("");
  console.log("Open from your smartphone on the same Wi-Fi:");
  getLocalUrls()
    .filter(url => !url.includes("localhost"))
    .forEach(url => console.log(`  ${url}`));
  console.log("");
  console.log(`Data file: ${DATA_FILE}`);
  console.log("");
  if (isAuthRequired()) {
    console.log("Access key protection: ON");
  } else {
    console.log("Access key protection: OFF");
    console.log("Set MOGULOG_ACCESS_KEY before exposing this server outside your home network.");
  }
  console.log("");
  console.log("Keep this window open while using MoguLog.");
  console.log("Press Ctrl+C to stop.");
  console.log("");
});
