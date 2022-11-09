// @ts-nocheck
import React from "react";
export async function getRoutes() {
  return {
    routes: {
      "404.tsx": { path: "404.tsx", id: "404", parentId: "*", file: "404.tsx" },
      "build/data": {
        path: "build/data",
        id: "build/data/index",
        parentId: "*",
        file: "build/data/index.tsx",
      },
      "build/workflow": {
        path: "build/workflow",
        id: "build/workflow/index",
        parentId: "*",
        file: "build/workflow/index.tsx",
      },
      "Components/CStroke": {
        path: "Components/CStroke",
        id: "Components/CStroke/index",
        parentId: "*",
        file: "Components/CStroke/index.tsx",
      },
      "Components/Loading": {
        path: "Components/Loading",
        id: "Components/Loading/index",
        parentId: "*",
        file: "Components/Loading/index.tsx",
      },
      "css/map-preview": {
        path: "css/map-preview",
        id: "css/map-preview/index",
        parentId: "*",
        file: "css/map-preview/index.tsx",
      },
      "css/mask": {
        path: "css/mask",
        id: "css/mask/index",
        parentId: "*",
        file: "css/mask/index.tsx",
      },
      "docker/container": {
        path: "docker/container",
        id: "docker/container/index",
        parentId: "*",
        file: "docker/container/index.tsx",
      },
      "docker/image": {
        path: "docker/image",
        id: "docker/image/index",
        parentId: "*",
        file: "docker/image/index.tsx",
      },
      "form/strategy": {
        path: "form/strategy",
        id: "form/strategy/index",
        parentId: "*",
        file: "form/strategy/index.tsx",
      },
      "game/draw-something": {
        path: "game/draw-something",
        id: "game/draw-something/index",
        parentId: "*",
        file: "game/draw-something/index.tsx",
      },
      "game/tetris": {
        path: "game/tetris",
        id: "game/tetris/index",
        parentId: "*",
        file: "game/tetris/index.tsx",
      },
      home: {
        path: "home",
        id: "home/index",
        parentId: "*",
        file: "home/index.tsx",
      },
      login: {
        path: "login",
        id: "login/index",
        parentId: "*",
        file: "login/index.tsx",
      },
      main: {
        path: "main",
        id: "main/index",
        parentId: "*",
        file: "main/index.tsx",
      },
      "practice/generate": {
        path: "practice/generate",
        id: "practice/generate/index",
        parentId: "*",
        file: "practice/generate/index.tsx",
      },
      "practice/hooks": {
        path: "practice/hooks",
        id: "practice/hooks/index",
        parentId: "*",
        file: "practice/hooks/index.tsx",
      },
      "qqsg/experience": {
        path: "qqsg/experience",
        id: "qqsg/experience/index",
        parentId: "*",
        file: "qqsg/experience/index.tsx",
      },
      "qqsg/fore": {
        path: "qqsg/fore",
        id: "qqsg/fore/index",
        parentId: "*",
        file: "qqsg/fore/index.tsx",
      },
      "qqsg/home": {
        path: "qqsg/home",
        id: "qqsg/home/index",
        parentId: "*",
        file: "qqsg/home/index.tsx",
      },
      "qqsg/Resistance": {
        path: "qqsg/Resistance",
        id: "qqsg/Resistance/index",
        parentId: "*",
        file: "qqsg/Resistance/index.tsx",
      },
      "study/raider": {
        path: "study/raider",
        id: "study/raider/index",
        parentId: "*",
        file: "study/raider/index.tsx",
      },
      "tool/Shortcuts": {
        path: "tool/Shortcuts",
        id: "tool/Shortcuts/index",
        parentId: "*",
        file: "tool/Shortcuts/index.tsx",
      },
      xlsx: {
        path: "xlsx",
        id: "xlsx/index",
        parentId: "*",
        file: "xlsx/index.tsx",
      },
    },
    routerComponents: {
      "404.tsx": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__404__tsx" */ "../pages/404.tsx"
          )
      ),
      "build/data": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__build__data" */ "../pages/build/data/index.tsx"
          )
      ),
      "build/workflow": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__build__workflow" */ "../pages/build/workflow/index.tsx"
          )
      ),
      "Components/CStroke": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__Components__CStroke" */ "../pages/Components/CStroke/index.tsx"
          )
      ),
      "Components/Loading": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__Components__Loading" */ "../pages/Components/Loading/index.tsx"
          )
      ),
      "css/map-preview": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__css__map-preview" */ "../pages/css/map-preview/index.tsx"
          )
      ),
      "css/mask": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__css__mask" */ "../pages/css/mask/index.tsx"
          )
      ),
      "docker/container": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__docker__container" */ "../pages/docker/container/index.tsx"
          )
      ),
      "docker/image": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__docker__image" */ "../pages/docker/image/index.tsx"
          )
      ),
      "form/strategy": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__form__strategy" */ "../pages/form/strategy/index.tsx"
          )
      ),
      "game/draw-something": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__game__draw-something" */ "../pages/game/draw-something/index.tsx"
          )
      ),
      "game/tetris": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__game__tetris" */ "../pages/game/tetris/index.tsx"
          )
      ),
      home: React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__home" */ "../pages/home/index.tsx"
          )
      ),
      login: React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__login" */ "../pages/login/index.tsx"
          )
      ),
      main: React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__main" */ "../pages/main/index.tsx"
          )
      ),
      "practice/generate": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__practice__generate" */ "../pages/practice/generate/index.tsx"
          )
      ),
      "practice/hooks": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__practice__hooks" */ "../pages/practice/hooks/index.tsx"
          )
      ),
      "qqsg/experience": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__qqsg__experience" */ "../pages/qqsg/experience/index.tsx"
          )
      ),
      "qqsg/fore": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__qqsg__fore" */ "../pages/qqsg/fore/index.tsx"
          )
      ),
      "qqsg/home": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__qqsg__home" */ "../pages/qqsg/home/index.tsx"
          )
      ),
      "qqsg/Resistance": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__qqsg__Resistance" */ "../pages/qqsg/Resistance/index.tsx"
          )
      ),
      "study/raider": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__study__raider" */ "../pages/study/raider/index.tsx"
          )
      ),
      "tool/Shortcuts": React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__tool__Shortcuts" */ "../pages/tool/Shortcuts/index.tsx"
          )
      ),
      xlsx: React.lazy(
        () =>
          import(
            /* webpackChunkName: "src__pages__xlsx" */ "../pages/xlsx/index.tsx"
          )
      ),
    },
  };
}
