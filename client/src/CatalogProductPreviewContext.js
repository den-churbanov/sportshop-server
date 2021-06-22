import {createContext} from "react"

function noop() {}

export const CatalogProductPreviewContext = createContext({
    setSelected: noop,
    setProductCount: noop
})