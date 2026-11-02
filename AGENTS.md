# todo-app

API de tareas. Nota origen en Obsidian: `BobedaJp/Ideas/app todo.md`.

## Stack
NestJS · TypeScript estricto · Node 24 · pnpm · Vitest

## Comandos
- `pnpm dev` — servidor local en http://localhost:3000
- `pnpm test` — pruebas
- `pnpm lint` — lint
- `pnpm build` — compilar

## Arquitectura
- Estilo: hexagonal (core / inbound / outbound) — feature en `src/todo/`, transversal en `src/shared/`.
- Estado: objetivo

## Estado
- Hecho: `POST /todo/create`, `GET /todo/:id`, `GET /todo` (en memoria, hexagonal).
- Pendiente (según la nota): editar y eliminar.

## Reglas
- Convenciones de TypeScript: `../../harness/docs/convenciones-ts.md`.
- Cada caso de uso lleva prueba en Vitest.
- No termines con `pnpm test` o `pnpm lint` fallando.
- Si falta contexto, pregunta; no deduzcas.
