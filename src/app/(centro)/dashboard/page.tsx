export default function DashboardPage() {
    return (
        <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Panel de Control</h2>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">¡Funciona!</h3>
            <p className="text-gray-600">
            Si estás leyendo esto, significa que el <strong>Layout</strong> cargó correctamente
            a la izquierda (Sidebar) y esta <strong>Página</strong> cargó a la derecha.
            </p>
        </div>
        </div>
    );
}