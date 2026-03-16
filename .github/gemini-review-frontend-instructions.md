# JavaScript Coding Standard

## 目的

本文件定義 AEM 專案的 React/JavaScript 編碼標準，確保程式碼品質、可讀性與維護性符合## 命名原則

### 基本規則
-   避免單字縮寫（除非是業界通用縮寫如 URL、API、AEM）
-   注意拼字正確性
-   命名應具描述性，能清楚表達用途

### 元件與檔案命名
-   **AEM 元件**: PascalCase + `Cub` 前綴（CubHeader.tsx、CubButton.tsx）
-   **Elements 元件**: PascalCase（Button.tsx、Input.tsx、Card.tsx）
-   **檔案名稱**: 
    -   元件檔案: PascalCase（CubHeader.tsx）
    -   Hook 檔案: camelCase + use 前綴（useAuth.tsx、useModal.tsx）
    -   工具函式: camelCase（utils.ts、helper.ts）
    -   型別定義: camelCase（type.tsx、types.ts）
-   **資料夾**: PascalCase（與主要元件同名）

### 變數與函式命名
-   **變數/常數**: camelCase
    -   例如：`const maxCount = 10;`
    -   布林值建議使用 is/has/should 前綴：`isActive`、`hasError`、`shouldUpdate`
-   **事件處理函式**: handle 開頭 + 動詞
    -   例如：`handleClick`、`handleSubmit`、`handleOpenModal`
-   **Props 事件回調**: on 開頭
    -   例如：`onClick`、`onMouseLeave`、`onChange`、`onTabClick`
-   **常數配置**: UPPER_SNAKE_CASE 或使用 `as const`
    -   例如：`export const THEMES = { CATHAYBK: 'cathaybk', CUBE: 'cube' } as const;`

### TypeScript 型別命名
-   **interface**: PascalCase + Props/Type 後綴
    -   AEM 元件：`CubHeaderProps`、`CubButtonProps`
    -   通用介面：`Notice`、`TabItem`
-   **type**: PascalCase
    -   例如：`ButtonVariant`、`ThemeType`、`ValidTheme`
-   **泛型參數**: 單一大寫字母或 PascalCase
    -   例如：`T`、`TProps`、`TData`

### 測試相關
-   **測試檔案選擇器**: `[data-testid="element-name"]`
-   **測試檔案**: 與源檔案同名 + `.test.tsx`
-   **Storybook 檔案**: 與元件同名 + `.stories.tsx`審查指引

請根據以下項目進行程式碼審查：

## AEM 專案元件架構

本專案採用三層元件架構，請確保元件放置在正確的層級：

### 1. Elements（基礎 UI 元件層）

-   **路徑**: `src/elements/`
-   **用途**: 純樣式的基礎 UI 元件，不含業務邏輯
-   **範例**: Button、Input、Card、Tabs、Accordion
-   **特性**:
    -   可重用於任何專案
    -   不依賴 AEM 或業務邏輯
    -   使用 Tailwind CSS + CVA (class-variance-authority) 管理樣式變體
    -   支援主題切換 (CathayBK/Cube)
    -   必須包含 `.stories.tsx` 展示所有變體

### 2. CubCommon（AEM 整合元件層）

-   **路徑**: `src/components/CubCommon/`
-   **用途**: 與 AEM 後台上稿相關的共用元件
-   **範例**: CubButton、CubModal、CubNotice、CubTabNavigation
-   **特性**:
    -   整合 AEM Model 資料
    -   處理上稿使用者的內容
    -   內部可使用 elements 元件
    -   必須包含 `*_README.md`（含元件名稱、編號、Figma 連結）
    -   必須包含 `.stories.tsx` 展示 AEM 對話框配置

### 3. AEM 業務元件層

-   **路徑**: `src/components/Cub*/`
-   **用途**: 特定業務場景的 AEM 元件
-   **範例**: CubHeader、CubFooter、CubKVBanner、CubCreditCardList
-   **特性**:
    -   實作具體業務需求
    -   整合 AEM authoring 體驗
    -   可組合使用 CubCommon 和 elements 元件
    -   包含完整的 AEM 對話框定義


## 檔案拆分

-   檔案是否正確區分資料夾
    -   In React
        -   sections、components、hooks、utils、schema、elements
-   元件分類是否正確：
    -   **`elements/`**: 基礎 UI 元件（純樣式元件，如 Button、Input、Card）
    -   **`components/CubCommon/`**: 與 AEM 上稿相關的共用元件（如 CubButton、CubModal）
    -   **`components/`**: AEM 專案業務元件（如 CubHeader、CubFooter、CubKVBanner）
-   元件選用原則是否正確：
    -   與 AEM 後台上稿相關 → 優先使用 `CubCommon/` 元件
    -   純前端互動、不涉及上稿 → 使用 `elements/` 元件
    -   避免在業務元件中重複實作已存在的基礎元件
-   檔案行數是否控制在合理範圍：
    -   AEM 元件頁面：建議 300-500 行內，超過應拆分為子元件或 Hook
    -   通用元件檔案（elements/CubCommon）：建議 100-200 行內，超過應拆分
    -   工具函式：建議 80-150 行內，單一函式不超過 50 行
    -   Hook 檔案：建議 80-150 行內
    -   型別定義檔案：建議 200 行內

## 命名原則

-   props 為 event: on 開頭，ex: onClick、onMouseLeave
-   傳入的 event function: handle 開頭 handleClick、handleConfirm
-   避免單字縮寫
-   拼字錯誤
-   元件: PascalCase (UserProfile.tsx)
-   檔案: camelCase (useAuth.tsx)
-   變數/函數: camelCase
    -   例如：  const maxCount = 10;
-   type: PascalCase
-   interface: PascalCase
-   測試檔案選擇器: `[data-testid="element-name"]`

## 型別安全

### TypeScript 基本要求
-   所有函式參數和返回值必須有明確型別註解
-   避免使用 `any`，特殊情況需註明原因
-   謹慎使用 `unknown`，使用時需搭配型別守衛
-   善用 TypeScript 的型別推論，但不過度依賴


### CVA (class-variance-authority) 型別整合
-   使用 `VariantProps` 從 CVA 配置提取型別
    ```ts
    import { cva, type VariantProps } from 'class-variance-authority';
    
    const buttonVariants = cva('base-classes', {
        variants: {
            variant: { main: '...', sub: '...' },
            size: { sm: '...', md: '...', lg: '...' },
        },
    });
    
    type ButtonVariantProps = VariantProps<typeof buttonVariants>;
    ```

### 型別匯出原則
-   公開使用的型別必須匯出
    ```ts
    export type { ButtonProps, ButtonVariantProps };
    export interface CubHeaderProps extends MappedComponentProperties { }
    ```
-   內部型別可使用區域定義
-   統一從 `index.tsx` 或 `type.tsx` 匯出型別

## 程式碼品質

-   是否有重複邏輯可抽取。
-   是否有不必要的 useEffect/useMemo/useCallback。
-   useEffect, useCallback, useMemo 的 Dependency array，是否有不必要的變數相依
-   在 useEffect 中若有使用任何監聽，是否有在 return function 中停止監聽
-   是否有潛在的錯誤或例外情境未處理？
-   檢驗程式碼的可讀性，當程式碼過長時是否有拆小的可能性?
-   function 是否盡量維持 pure & immutable
-   **AEM 專屬檢查**：
    -   是否正確使用 AEM Model 的資料結構
    -   是否避免在元件內硬編碼應由 AEM 作者控制的內容
    -   條件渲染是否正確處理 AEM 可選欄位（避免 undefined 錯誤）
    -   是否使用 `aemNoDecoration` 等 AEM 專屬屬性處理編輯模式

## 效能優化

-   是否避免不必要的重新渲染 (如使用 React.memo, useMemo 等)
-   大型列表是否實施虛擬化或分頁 (如 react-window 或 react-virtualized)
-   是否懶加載非立即需要的元件或資源
-   是否有適當的快取策略 (如 SWR, React Query 等)
-   大型圖片是否有適當的優化處理
-   是否有註意 bundle size，避免不必要的依賴


## 安全性

-   是否有處理 XSS、CSRF 等安全議題?
-   是否有安全性疑慮?

## 靜態資源與環境變數

-   靜態資源是否統一放在 public?
-   是否正確使用 process.env 取得環境變數，避免洩漏敏感資訊到 client?

## 無障礙（a11y）

-   是否有語意化標籤、aria 屬性、tabIndex、對比度等基本檢查。

## 測試

-   通用的 function 是否有單元測試?
-   **Elements 元件**是否有 Storybook？
    -   新增的 elements 元件必須包含 `.stories.tsx` 檔案
    -   既有 elements 元件的更新是否同步更新 Storybook
-   **CubCommon 元件**是否有 Storybook？
    -   新增的 CubCommon 元件必須包含 `.stories.tsx` 檔案
    -   既有 CubCommon 元件的更新是否同步更新 Storybook
-   AEM 業務元件是否有適當的測試策略
-   關鍵業務邏輯是否有測試覆蓋
-   是否有 E2E 測試覆蓋主要使用者流程
-   邊界情況和錯誤處理是否有測試
-   測試是否包含合理的斷言
-   測試描述是否清晰表達測試意圖
-   非同步操作的測試是否正確處理

## 文件

-   Utils function 是否有足夠清楚的說明?
-   **Elements 元件文件**：
    -   是否有清楚的 props 說明和使用範例
    -   Storybook 是否展示所有主要使用情境
-   **CubCommon 元件文件**：
    -   是否有說明與 AEM 上稿的整合方式
    -   是否有 `*_README.md` 檔案（包含元件名稱、中文名稱、編號、Figma 連結）
    -   Storybook 是否展示 AEM 對話框配置範例
-   AEM 業務元件是否有說明：
    -   元件用途和適用場景
    -   AEM 對話框設定說明
    -   與其他元件的依賴關係
-   功能頁中難以理解的商業邏輯是否有保留相關文件或註解，如 structure.excalidraw 或 README 說明
-   新增 tool 是否有說明文件告知用途，如果有設定特殊指令如： openapi, chromium-download 須將指令先加在 root README 中
