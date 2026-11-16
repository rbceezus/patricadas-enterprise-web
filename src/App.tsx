import { Navigate, Route, Routes } from "react-router-dom"

import { dependenciasReais } from "@/lib/supabase"
import { AreaLogada } from "@/routes/AreaLogada"
import { CatalogoPage } from "@/routes/catalogo/CatalogoPage"
import { LoginPage } from "@/routes/login/LoginPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage deps={dependenciasReais} />} />
      <Route
        path="/catalogo"
        element={
          <AreaLogada titulo="Catálogo" largura="max-w-[1240px]">
            <CatalogoPage />
          </AreaLogada>
        }
      />
      <Route
        path="/operacoes"
        element={
          <AreaLogada titulo="Painel de Operações">
            <p className="text-[14px] opacity-70">O painel está fora do escopo desta entrega (spec 004).</p>
          </AreaLogada>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
