# API実行用curlコマンド一覧

このドキュメントは、作成したHonoバックエンドAPIの全機能をテストするための`curl`コマンドをまとめたものです。

> **前提:**
>
> * ローカル開発サーバーが `http://localhost:8787` で起動していること。
> * コマンドはプロジェクトのルートディレクトリで実行すること。

---

## 1. 認証関連 (`/api/auth`)

#### アカウント作成
```zsh
curl -X POST http://localhost:8787/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"testuser", "password":"password123"}'
```

#### ログイン
```zsh
curl -X POST http://localhost:8787/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"testuser", "password":"password123"}' \
-c cookie.txt
```

#### ログアウト
```zsh
curl -X POST http://localhost:8787/api/auth/logout \
-b cookie.txt
```

#### 新規投稿 (要認証)
```zsh
curl -X POST http://localhost:8787/bbs/api/posts/create \
-H "Content-Type: application/json" \
-b cookie.txt \
-d '{"title":"Database", "description":"Hello Prisma & D1"}'
```

#### 投稿を編集 (要認証)
```zsh
curl -X PUT http://localhost:8787/bbs/api/posts/update/1 \
-H "Content-Type: application/json" \
-b cookie.txt \
-d '{"title":"Hono", "description":"Hello CloudFlare"}'
```

#### 投稿を削除 (要認証)
```zsh
curl -X DELETE http://localhost:8787/bbs/api/posts/delete/1 \
-b cookie.txt
```

## 2. 掲示板関連 (/bbs/api/posts)

##### 投稿を全件取得
```zsh
curl http://localhost:8787/bbs/api/posts
```

#### IDを指定して投稿を取得
```zsh
curl http://localhost:8787/bbs/api/posts/1
```

#### 投稿を検索
```zsh
curl "http://localhost:8787/bbs/api/posts/search?q=Hono"
```