import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

// Definimos lo que necesita la función para trabajar
interface ConfirmModalProps {
    message: string;
    header: string;
    icon?: string;
    iconColor?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    onAccept: () => void;
    onReject?: () => void;
}

// Exportamos solo la lógica
export const showConfirm = ({ 
    message, 
    header, 
    icon = 'pi pi-exclamation-triangle', 
    iconColor = 'text-yellow-500', 
    onAccept, 
    onReject, 
    acceptLabel = 'Sí', 
    rejectLabel = 'No' 
}: ConfirmModalProps) => {
    const footer = (
        <div className="flex justify-center gap-6 mt-4 pb-4">
            <Button 
                label={rejectLabel} 
                icon="pi pi-times" 
                onClick={() => {
                    if(onReject) onReject(); // no cierra sesion
                }}// Ejecuta la función de cancelar
                severity='success'
                className="px-8 py-3 font-bold" 
            />
            <Button 
                label={acceptLabel} 
                icon="pi pi-check" 
                onClick={() => onAccept()} // Ejecuta la función de aceptar)
                severity='danger'
                className="px-8 py-3 font-bold"
            />
        </div>
    );
    confirmDialog({
        header,
        footer,
        message: (
            <div className="flex items-center gap-6 py-4 px-2">
                {/* Ahora el ícono cambia según lo que vos mandes */}
                <i className={`${icon} text-5xl ${iconColor}`}></i>
                <span className="text-lg text-gray-700 leading-relaxed">
                    {message}
                </span>
            </div>
        ),
        icon: 'hidden', 
        position: 'center',
        accept:onAccept,
        reject: onReject
    });
};