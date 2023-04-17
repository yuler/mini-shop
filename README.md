# mini shop

> mini-shop Monorepo

## Apps

- [`apps/api`](./apps/api/) backend api power by [strapi](https://strapi.io/)
- [`apps/mini`](./apps/mini/) wechat miniprogram
- [`apps/webhook`](./apps/webhook/) GitHub webhook for restart `apps/api`

## Development

```bash
cat .nvmrc # 使用对应的 Node 版本
corepack enable
npm install -g @antfu/ni
ni
nr
```

## Actions

- `gitlab-sync` job for sync to https://gitlab.com/yuler/mini-shop-strapi

## Webhook

- push event request to [`apps/webhook`](./apps/webhook/)
