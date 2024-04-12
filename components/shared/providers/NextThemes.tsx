import { ThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
const NextThemes = ({ children, ...props }: ThemeProviderProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}

export default NextThemes
