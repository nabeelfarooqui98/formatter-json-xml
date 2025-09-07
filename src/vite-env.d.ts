/// <reference types="vite/client" />

declare module 'xml-formatter' {
  export default function xmlFormat(input: string, options?: { indentation?: string }): string
}
