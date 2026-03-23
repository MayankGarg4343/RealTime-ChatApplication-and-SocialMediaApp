import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("Stremo-theme" || "coffee"),
    setTheme: (theme) => {
        localStorage.setItem("Stremo-theme",theme)
        set({theme})
    }
}))