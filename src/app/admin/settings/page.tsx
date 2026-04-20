export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configurações</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Gerencie as preferências do painel e do site.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Geral</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configurações básicas do sistema.</p>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Site</label>
              <input type="text" defaultValue="NexusAI" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email de Notificação</label>
              <input type="email" defaultValue="admin@nexusai.com" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
            </div>
            <div className="pt-2">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-px bg-slate-200 dark:bg-slate-800 my-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Segurança</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Proteção e controle de acesso.</p>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-sm">Autenticação em Duas Etapas</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Adicione uma camada extra de segurança.</p>
              </div>
              <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
